import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function donatarioRoutes(app: FastifyInstance) {
  const paramsSchema = z.object({
    id: z.coerce.number(),
  });

  const bodySchema = z.object({
    name: z.string(),
    dataCadastro: z.coerce.date(),
    cpf: z.string(),
  });

  app.get("/donatarios", async () => {
    const donatario = await prisma.donatario.findMany({
      select: {
        id: true,
        name: true,
        cpf: true,
        dataCadastro: true,
      },
    });

    return donatario;
  });

  app.get("/donatarios/:id", async (req, rep) => {
    const { id } = paramsSchema.parse(req.params);

    const donatario = await prisma.donatario.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return donatario;
  });

  app.post("/donatarios", async (req, rep) => {
    const { name, dataCadastro, cpf } = bodySchema.parse(req.body);

    const donatario = await prisma.donatario.create({
      data: {
        name,
        dataCadastro,
        cpf,
      },
    });

    return rep.code(201).send(donatario);
  });
  app.delete("/donatarios/:id", async (req, rep) => {
    const { id } = paramsSchema.parse(req.params);

    const donatario = await prisma.donatario.delete({
      where: {
        id,
      },
    });

    return donatario;
  });

  app.put("/donatarios/:id", async (req, rep) => {
    const { id } = paramsSchema.parse(req.params);
    const { name, dataCadastro, cpf } = bodySchema.parse(req.body);
  
    try {
      await prisma.donatario.findUnique({
        where: {
          id,
        },
      });
  
      const updatedDonatario = await prisma.donatario.update({
        where: {
          id,
        },
        data: {
          name,
          dataCadastro,
          cpf,
        },
      });
  
      return rep.send(updatedDonatario);
    } catch (error) {
     
  
      console.error(error);
      return rep.code(500).send({ message: 'Erro interno do servidor' });
    }
  });
}
