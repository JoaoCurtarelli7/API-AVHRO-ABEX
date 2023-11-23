import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function doacaoEntreguesRoutes(app: FastifyInstance) {
  const paramsSchema = z.object({
    id: z.coerce.number(),
  });

  const bodySchema = z.object({
    item: z.string(),
    date: z.coerce.date(),
    donatarioId: z.number(),
  });

  app.get("/doacoes-entregues", async () => {
    const doacaoEntregue = await prisma.doacaoEntregue.findMany({
      select: {
        id: true,
        item: true,
        date: true,
        donatario: {
          select: {
            cpf: true,
            name: true,
            id: true,
          },
        },
      },
    });

    return doacaoEntregue;
  });

  app.get("/doacoes-entregues/:id", async (req, rep) => {
    const { id } = paramsSchema.parse(req.params);

    const doacaoEntregue = await prisma.doacaoEntregue.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return doacaoEntregue;
  });

  app.post("/doacoes-entregues", async (req, rep) => {
    const { date, donatarioId, item } = bodySchema.parse(req.body);

    const doacaoEntregue = await prisma.doacaoEntregue.create({
      data: {
        date,
        item,
        donatarioId,
      },
    });

    return rep.code(201).send(doacaoEntregue);
  });

  app.delete("/doacoes-entregues/:id", async (req, rep) => {
    const { id } = paramsSchema.parse(req.params);

    const doacaoEntregue = await prisma.doacaoEntregue.delete({
      where: {
        id,
      },
    });

    return doacaoEntregue;
  });

  app.put("/doacoes-entregues/:id", async (req, rep) => {
    const { id } = paramsSchema.parse(req.params);
    const { date, donatarioId, item } = bodySchema.parse(req.body);

    try {
      await prisma.doacaoEntregue.findUnique({
        where: {
          id,
        },
      });

      const updatedDoacaoEntregue = await prisma.doacaoEntregue.update({
        where: {
          id,
        },
        data: {
          date,
          item,
          donatarioId,
        },
      });

      return rep.send(updatedDoacaoEntregue);
    } catch (error) {
      console.error(error);
      return rep.code(500).send({ message: "Erro interno do servidor" });
    }
  });
}
