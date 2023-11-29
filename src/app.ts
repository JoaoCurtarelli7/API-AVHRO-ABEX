import fastifyCors from "@fastify/cors";
import fastify from "fastify";
import { donataryRoutes } from "./routes/donatary";
import { donationDeliveredRoutes } from "./routes/donationDelivered";
import { donationReceivedRoutes } from "./routes/donationReceived";
import { donorRoutes } from "./routes/donor";
import { familyRoutes } from "./routes/family";

const app = fastify({
  logger: true
});

app.register(fastifyCors, {
  origin: true
})

app.register(donorRoutes)
app.register(donationDeliveredRoutes)
app.register(donationReceivedRoutes)
app.register(familyRoutes)
app.register(donataryRoutes)

export default app