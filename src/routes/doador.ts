import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function doadorRoutes(app: FastifyInstance) {
  const paramsSchema = z.object({
    id: z.coerce.number(),
  });

  const bodySchema = z.object({
    dataCadastro: z.coerce.date(),
    name: z.coerce.string(),
    cpf: z.coerce.string(),
  });

  app.get("/doador", async () => {
    const doadores = await prisma.doador.findMany();

    return doadores;
  });

  app.get("/doador/:id", async (req, rep) => {
    const { id } = paramsSchema.parse(req.params);

    const doador = await prisma.doador.findUniqueOrThrow({
      where: {
        id: +id,
      },
    });

    return doador;
  });

  app.post("/doador", async (req, rep) => {
    const { cpf, dataCadastro, name } = bodySchema.parse(req.body);

    const doador = await prisma.doador.create({
      data: { cpf, dataCadastro, name },
    });

    return rep.code(201).send(doador);
  });

  app.delete("/doador/:id", async (req, rep) => {
    const { id } = paramsSchema.parse(req.params);

    const doador = await prisma.doador.delete({
      where: {
        id,
      },
    });

    return doador;
  });
}
