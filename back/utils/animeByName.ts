import Search, { type Data } from '@back/services/Search';

export default async (query: string): Promise<number> => {
    const title = query.toLowerCase();

    const anime = await Search.get(query);
    const id = anime.find((i: Data) => i.title.toLowerCase() === title || i.slug === title)?.id;

    return id || 0;
}