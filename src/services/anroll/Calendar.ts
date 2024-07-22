import EnmaError from "@src/Errors/Enma";
import Enma from "./Client";

type Response = {
    props: Props
}

type Props = {
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
            const response = await this.client({ method: 'GET', endpoint: `https://www.anroll.net/calendario/day/${day}` });
            const data = await response.text();

            return this.parse(this.extractData(data));
        } catch (e: any) {
            throw new EnmaError()
        }
    }

    private parse(data: string): DataCalendar[] {
        const calendar: Response = JSON.parse(data);
        if(calendar) return calendar.props.pageProps.data_calendar;
        
        return []
    }

}

export default new Calendar