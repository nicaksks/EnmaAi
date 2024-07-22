import Movie from '@src/services/anroll/Movie';
import getAnimeId from './getAnimeId'
import Anime, { type Response } from "@src/services/anroll/Anime"

export default async (anime: string, page: number): Promise<Response> => {
    const data = await getAnimeId(anime);
    return data.response?.type === "anime" ? await Anime.get(data.response?.id!, page) : await Movie.get(data.data!);
}