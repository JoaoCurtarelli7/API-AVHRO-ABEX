import fastify from "fastify";
import { doadorRoutes } from "./routes/doador";
import { doacaoEntreguesRoutes } from "./routes/doacaoEntregue";
import { doacaoRecebidasRoutes } from "./routes/doacaoRecebidas";
import { familiaRoutes } from "./routes/familia";
import { donatarioRoutes } from "./routes/donatario";
import fastifyCors from "@fastify/cors";

const app = fastify({
  logger: true
});

app.register(fastifyCors, {
  origin: true
})

app.register(doadorRoutes)
app.register(doacaoEntreguesRoutes)
app.register(doacaoRecebidasRoutes)
app.register(familiaRoutes)
app.register(donatarioRoutes)

export default app