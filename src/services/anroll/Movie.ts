import { DOMAIN } from "@src/utils/constants";
import Enma from "./Client";
import Download from "./Download";
import type { Data } from "./Search";
import type { Response } from "./Anime";

class Movie extends Enma {
    public async get(data: Data): Promise<Response> {

        const episode = await Download.now(data.slug, "001", `movies/${data.slug}/movie.mp4/media-1/stream.m3u8`);

        return {
            code: 200,
            meta: {
                timestamp: 0,
                totalOfEpisodes: 1,
                totalOfPages: 1,
                pageNumber: 1,
                order: "asc",
                hasNextPage: false
            },
            message: 'success',
            data: [{
                id_series_episodios: 0,
                se_pgad: 0,
                id_serie: data.id,
                premiere_last_ep: 0,
                n_episodio: "001",
                titulo_episodio: data.title,
                sinopse_episodio: data.synopsis,
                link: episode ? `${DOMAIN}/episode/${data.slug}/001` : '',
                aviso: "",
                generate_id: "",
                data_registro: "",
                thumbnail: data.image,
                anime: {
                    titulo: data.title,
                    slug_serie: data.slug,
                    generate_id: data.gen_id
                }
            }]
        };
    }
}

export default new Movie