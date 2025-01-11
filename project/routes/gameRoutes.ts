// routes/gameRoutes.ts
import { Router } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import {
  createGame,
  getGames,
  getGame,
  updateGame,
  deleteGame
} from "../controller/gameController.ts";

const router = new Router();

router
  .post("/games", createGame)
  .get("/games", getGames)
  .get("/games/:name", getGame)
  .put("/games/:name", updateGame)
  .delete("/games/:name", deleteGame);

export default router;
