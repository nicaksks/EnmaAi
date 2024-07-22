import Search, { type Data } from '@src/services/anroll/Search';
import slug from './slug';
import EnmaError from '@src/Errors/Enma';

export type Response = {
    type: string;
    slug: string;
    id: number;
}

export type A = {
    response?: Response
    data?: Data
}

export default async (query: string): Promise<A> => {

    const title = query.toLowerCase();
    const getAnime = await Search.get(query);
    const anime = getAnime.find((i: Data) => i.title.toLowerCase() === title || i.slug === slug(title));

    if (!anime) throw new EnmaError(404, 'anime.not.found');

    if (anime.type === "anime") {
        return {
            response: {
                type: anime.type.toLowerCase(),
                slug: anime.slug,
                id: anime.id
            }
        }
    }

    return {
        data: anime
    }
}