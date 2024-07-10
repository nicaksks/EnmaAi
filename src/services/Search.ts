import EnmaError from "@src/Errors/Enma";
import Enma from "./Client";

type Response = {
    code: number;
    meta: Meta;
    message: string;
    data: Data[]
}

type Meta = {
    timestamp: number;
}

export type Data = {
    type: string;
    id: number;
    title: string;
    slug: string;
    year: number;
    censorship: number;
    synopsis: string;
    total_eps: number;
    gen_id: string;
    image?: string;
    friendly_path: string;
    generic_path: string;
}

class Search extends Enma {

    public async get(name: string): Promise<Data[]> {
        const response = await this.client({ method: 'GET', endpoint: `https://api-search.anroll.net/data?q=${name}` });
        const { data }: Response = await response.json();

        if (!data.length) throw new EnmaError(404, 'anime.not.found');

        return this.imageUrl(data);
    }

    private imageUrl(data: Data[]): Data[] {
        data.forEach((i: Data) => i.image = this.imageType(i.type, i.slug));
        return data;
    }

    private imageType(type: string, slug: string, format: string = 'jpg'): string {
        const types: Record<string, string> = {
            'anime': 'animes',
            'movie': 'filmes'
        };

        return types[type] ? `https://static.anroll.net/images/${types[type]}/capas/${slug}.${format}` : 'https://i.imgur.com/sK5DKhL.png'
    }

}

export default new Search