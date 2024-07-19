import EnmaError from "@src/Errors/Enma";
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
    thumbnail?: string;
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
        const catalog = JSON.parse(data).props;
        if(catalog) return this.thumbnail(catalog.pageProps.data.data_releases);
        
        return []
    }

    private thumbnail(data: Catalog[]): Catalog[] {
        data.forEach((i: Catalog) => i.episode.thumbnail = `https://static.anroll.net/images/animes/screens/${i.episode.anime.slug_serie}/${i.episode.n_episodio}.jpg`)
        return data;
    }

}

export default new LastReleases