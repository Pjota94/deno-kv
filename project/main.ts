// main.ts
import { Application } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import router from "./routes/gameRoutes.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server is runninggg on http://localhost:8000");
await app.listen({ port: 8000 });
