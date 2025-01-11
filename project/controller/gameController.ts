// controllers/gameController.ts
import { Context } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import kv from "../kv.ts";

interface Params {
    name: string;
  }

export const createGame = async (context: Context) => {
  const { value } = context.request.body({ type: "json" });
  const { name, genre, releaseYear } = await value;

  const existingGame = await kv.get(["game", name]);
  if (existingGame.value) {
    context.response.status = 400;
    context.response.body = { message: "This Game Already Exists!" };
    return;
  }

  await kv.set(["game", name], { name, genre, releaseYear });
  context.response.status = 201;
  context.response.body = { message: "Game Created", game: { name, genre, releaseYear } };
};

export const getGames = async (context: Context) => {
  const games = [];
  for await (const entry of kv.list({ prefix: ["game"] })) {
    games.push(entry.value);
  }
  context.response.body = games;
};

export const getGame = async (context: Context & { params: Params}) => {
  const { name } = context.params;
  const game = await kv.get(["game", name]);
  if (!game.value) {
    context.response.status = 404;
    context.response.body = { message: "Game Not Found" };
    return;
  }
  context.response.body = game.value;
};

export const updateGame = async (context: Context & { params: Params}) => {
  const { name } = context.params;
  const { value } = context.request.body({ type: "json" });
  const { genre, releaseYear } = await value;

  const game = await kv.get(["game", name]);
  if (!game.value) {
    context.response.status = 404;
    context.response.body = { message: "Game Not Found" };
    return;
  }

  await kv.set(["game", name], { name, genre, releaseYear });
  context.response.body = { message: "Game Updated", game: { name, genre, releaseYear } };
};

export const deleteGame = async (context: Context & { params: Params}) => {
  const { name } = context.params;
  await kv.delete(["game", name]);
  context.response.body = { message: "Game Deleted" };
};
