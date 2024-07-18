import EnmaError from "@src/Errors/Enma";
import Enma from "./Client";
import Download from "./Download";
import { DOMAIN } from "@src/utils/constants";

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
    thumbnail?: string | null;
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
        const response = await this.client({ method: 'GET', endpoint: `https://apiv3-prd.anroll.net/animes/${id}/episodes?page=${page}&order=asc` });
        const data: Response = await response.json();

        if (!data.data.length) throw new EnmaError(404, 'anime.not.found');

        this.download(data.data);

        return this.data(data);
    }

    private data(data: Response): Response {
        return this.newValues(data)
    }

    private newValues(data: Response): Response {
        data.data.forEach((i: Data) => {
            i.titulo_episodio = i.titulo_episodio.replace('N/A', 'Sem título')
            i.sinopse_episodio =  !i.sinopse_episodio.length  ? 'Episódio sem sinopse' : i.sinopse_episodio
            i.link = `${DOMAIN}/episode/${i.anime.slug_serie}/${i.n_episodio}`
            i.thumbnail = `https://static.anroll.net/images/animes/screens/${i.anime.slug_serie}/${i.n_episodio}.jpg`
        });
        return data
    }

    private download(data: Data[]): void {
        data.forEach(async (i: Data) => await Download.now(i.anime.slug_serie, i.n_episodio, `https://cdn-zenitsu-gamabunta.b-cdn.net/cf/hls/animes/${i.anime.slug_serie}/${i.n_episodio}.mp4/media-1/stream.m3u8`))
    }
}

export default new Anime