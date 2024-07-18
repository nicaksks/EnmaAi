import Movie from '@src/services/Movie';
import getAnimeId from './getAnimeId'
import Anime, { type Response } from "@src/services/Anime"
import type { Data } from '@src/services/Search';

export default async (anime: string, page: number): Promise<Response> => {
    const data = await getAnimeId(anime);
    return data.response?.type === "anime" ? await Anime.get(data.response?.id!, page) : await Movie.get(data.data!);
}