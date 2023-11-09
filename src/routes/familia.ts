import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function familiaRoutes(app: FastifyInstance) {
  const paramsSchema = z.object({
    id: z.coerce.number(),
  });

  const bodySchema = z.object({
    name: z.coerce.string(),
    dataCadastro: z.coerce.date(),
    bairro: z.coerce.string(),
    NumeroIntegrantes: z.coerce.number(),
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
    const { name, dataCadastro, bairro, NumeroIntegrantes } = bodySchema.parse(
      req.body
    );

    const familia = await prisma.familia.create({
      data: {
        name,
        dataCadastro,
        bairro,
        NumeroIntegrantes,
      },
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
