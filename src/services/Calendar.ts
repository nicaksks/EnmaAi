import EnmaError from "@src/Errors/Enma";
import Enma from "./Client";

type Response = {
    pageProps: PageProps;
    __N_SSG: boolean;
}

type PageProps = {
    data_calendar: DataCalendar[];
    numberDay: number;
}

type DataCalendar = {
    day: number;
    slug_serie: string;
    release_time: string;
    comments?: any;
    anime: Anime

}

type Anime = {
    id_serie: number;
    titulo: string;
    censura: number | boolean;
    sinopse: string;
    generate_id: string;
    last_episode: LastEpisode;
}

type LastEpisode = {
    id_serie: number;
    n_episodio: string;
    date: string;
}


class Calendar extends Enma {

    public async get(day: number): Promise<DataCalendar[]> {
        try {
            const response = await this.client({ method: 'GET', endpoint: `https://www.anroll.net/_next/data/NwvruoSpnKp23iiCW3n4q/calendario/day/${day}.json` });
            const data: Response = await response.json();
            return data.pageProps.data_calendar;
        } catch (e: any) {
            throw new EnmaError()
        }
    }

}

export default new Calendar