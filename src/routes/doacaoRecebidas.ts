import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function doacaoRecebidasRoutes(app: FastifyInstance) {
  const paramsSchema = z.object({
    id: z.coerce.number(),
  });

  const bodySchema = z.object({
    item: z.string(),
    date: z.coerce.date(),
    doadorId: z.number(),
  });

 
  app.get("/doacoes-recebidas", async () => {
    const doacaoRecebida = await prisma.doacaoRecebida.findMany({
      select: {
        id: true,
        item: true,
        date: true,
        doador: {
          select: {
            name: true,
            id: true,         
            cpf: true,
          },
        },
      },
    });

    return doacaoRecebida;
  });

  app.get("/doacoes-recebidas/:id", async (req, rep) => {
    const { id } = paramsSchema.parse(req.params);

    const doacaoRecebida = await prisma.doacaoRecebida.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return doacaoRecebida;
  });

  app.post("/doacoes-recebidas", async (req, rep) => {
    const { date, doadorId, item } = bodySchema.parse(req.body);

    const doacaoRecebida = await prisma.doacaoRecebida.create({
      data: {
        date,
        doadorId,
        item,
      },
    });

    return rep.code(201).send(doacaoRecebida);
  });


  app.put("/doacoes-recebidas/:id", async (req, rep) => {
    const { id } = paramsSchema.parse(req.params);
    const { date, doadorId, item  } = bodySchema.parse(req.body);
  
    try {
      await prisma.doacaoRecebida.findUnique({
        where: {
          id,
        },
      });
  
      const updatedDonatario = await prisma.doacaoRecebida.update({
        where: {
          id,
        },
        data: {
          date,
          doadorId,
          item,
        },
      });
  
      return rep.send(updatedDonatario);
    } catch (error) {
     
  
      console.error(error);
      return rep.code(500).send({ message: 'Erro interno do servidor' });
    }
  });

  app.delete("/doacoes-recebidas/:id", async (req, rep) => {
    const { id } = paramsSchema.parse(req.params);

    const doacaoRecebida = await prisma.doacaoRecebida.delete({
      where: {
        id,
      },
    });

    return doacaoRecebida;
  });
}
