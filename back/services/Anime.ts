import EnmaError from "@back/Errors/Enma";
import Enma from "./Client";

export type Response = {
    code: number;
    meta: Meta;
    message: string;
    data: Data[]
}

type Meta = {
    timestamp: number;
    totalOfEpisodes: number;
    totalOfPages: number;
    pageNumber: number;
    order: string;
    hasNextPage: boolean;
}

type Data = {
    id_series_episodios: number;
    se_pgad: number;
    id_serie: number;
    premiere_last_ep: number;
    n_episodio: string;
    titulo_episodio: string;
    sinopse_episodio: string;
    link: string;
    v_stream?: any;
    aviso: string;
    generate_id: string;
    data_registro: string;
    anime: Info;
}

type Info = {
    titulo: string;
    slug_serie: string;
    generate_id: string
}

class Anime extends Enma {

    public async get(id: number, page: number = 1): Promise<Response> {
        const response = await this.client({ method: 'GET', endpoint: `https://apiv3-prd.anroll.net/animes/${id}/episodes?page=${page}&order=desc` });
        const data: Response = await response.json();

        if (!data.data.length) throw new EnmaError(404, 'anime.not.found');
        return this.data(data);
    }

    private data(data: Response): Response {
        return this.title(this.sinopse(data))
    }

    private title(data: Response): Response {
        data.data.forEach((i: Data) => i.titulo_episodio = i.titulo_episodio.replace('N/A', 'Sem título'));
        return data
    }

    private sinopse(data: Response): Response {
        data.data.forEach((i: Data) => i.sinopse_episodio = i.sinopse_episodio.replace('', 'Episódio sem sinopse'));
        return data;
    }

}

export default new Anime