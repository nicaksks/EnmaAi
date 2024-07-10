import getAnimeId from './getAnimeId'
import Anime, { type Response } from "@src/services/Anime"

export default async (anime: string, page: number): Promise<Response> => {
    const id = await getAnimeId(anime)
    return await Anime.get(anime, id, page)
}