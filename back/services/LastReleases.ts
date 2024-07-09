import EnmaError from "@back/Errors/Enma";
import Enma from "./Client";

type Catalog = {
    id_lancamento: number;
    id_episodio: number;
    episode: Episode
}

type Episode =  {
    premiere_last_ep: number;
    n_episodio: string;
    generate_id: string;
    anime: Anime;
}

type Anime = {
    dub: number;
    titulo: string;
    slug_serie: string;
}

class LastReleases extends Enma {

    public async catalog(): Promise<Catalog[]> {
        try {
            const response = await this.client({ method: 'GET', endpoint: 'https://www.anroll.net/' });
            const data = await response.text()
            return this.parse(this.extractData(data))
        } catch(e) {
            throw new EnmaError()
        }
    }

    private extractData(data: string): string {
        return data
            .split('__NEXT_DATA__')[1]
            .split(`type="application/json">`)[1]
            .split('</script>')[0]
    }

    private parse(data: string): Catalog[] {
        return JSON.parse(data).props?.pageProps.data.data_releases ?? []
    }

}

export default new LastReleases