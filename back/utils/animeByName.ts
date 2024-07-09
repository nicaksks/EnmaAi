import Search, { type Data } from '@back/services/Search';

export default async(query: string): Promise<number> => {
    const animeName = await Search.get(query);
    const animeId = animeName.find((i: Data) => i.title.toLowerCase() === query.toLowerCase());
    return animeId?.id!;
}