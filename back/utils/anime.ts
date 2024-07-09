import animeByName from "./animeByName"
import Anime, { type Response } from "@back/services/Anime"

export default async (anime: string, page: number): Promise<Response> => {
    const id = await animeByName(anime)
    return await Anime.get(id, page)
}