import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function doacaoRecebidasRoutes(app: FastifyInstance) {
  const paramsSchema = z.object({
    id: z.coerce.number(),
  });

  const bodySchema = z.object({
    item: z.coerce.string(),
    date: z.coerce.date(),
    doador: z.coerce.string(),
    doadorId: z.coerce.number(),
  });

  app.get("/doacoes-recebidas", async () => {
    const doacaoRecebida = await prisma.doacaoRecebida.findMany();

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
    const { date, doador, doadorId, item } = bodySchema.parse(req.body);

    const doacaoRecebida = await prisma.doacaoRecebida.create({
      data: { 
        date, 
        doador: { 
          connect: { 
            id: doadorId, 
            name: doador
          } 
        }, 
        item 
      },
    });

    return rep.code(201).send(doacaoRecebida);
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
