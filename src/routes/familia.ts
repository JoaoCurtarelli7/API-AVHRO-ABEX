import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function familiaRoutes(app: FastifyInstance) {
  const paramsSchema = z.object({
    id: z.coerce.number(),
  });

  const bodySchema = z.object({
    name: z.string(),
    dataCadastro: z.coerce.date(),
    bairro: z.string(),
    numeroIntegrantes: z.number(),
  });

  app.get("/familias", async () => {
    const familia = await prisma.familia.findMany();

    return familia;
  });

  app.get("/familias/:id", async (req, rep) => {
    const { id } = paramsSchema.parse(req.params);

    const familia = await prisma.familia.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return familia;
  });

  app.post("/familias", async (req, rep) => {
    const dataBody = bodySchema.parse(req.body);

    const familia = await prisma.familia.create({
      data: dataBody,
    });

    return rep.code(201).send(familia);
  });
  
  app.delete("/familias/:id", async (req, rep) => {
    const { id } = paramsSchema.parse(req.params);

    const familia = await prisma.familia.delete({
      where: {
        id,
      },
    });

    return familia;
  });
}
