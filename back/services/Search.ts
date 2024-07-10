import EnmaError from "@back/Errors/Enma";
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

        return this.image(data);
    }

    private image(data: Data[]): Data[] {
        data.forEach((i: Data) => i.image = `https://static.anroll.net/images/animes/capas/${i.slug}.jpg`);
        return data;
    }

}

export default new Search