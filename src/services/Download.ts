import EnmaError from '../Errors/Enma';
import Enma from './Client';
import fs from 'node:fs';

class Download extends Enma {

    private BASE_URL: string = 'https://cdn-zenitsu-gamabunta.b-cdn.net/cf/hls/animes'
    private PATH: string = './assets';

    public async now(name: string, episode: string, endpoint: string): Promise<void> {
        try {
            if (fs.existsSync(`${this.PATH}/${name}/${episode}.m3u8`)) return;

            const response = await this.client({ method: 'GET', endpoint });
            const content = await response.text();

            if (response.status != 200) return;
            this.dir(`${this.PATH}/${name}`, episode, content)
        } catch (e: any) {
            throw new EnmaError(404, 'episode.not.found')
        }
    }

    public async specificEpisode(name: string, episode: string): Promise<void> {
        try {
            if (fs.existsSync(`${this.PATH}/${name}/${episode}.m3u8`)) return;

            const response = await this.client({ method: 'GET', endpoint: `${this.BASE_URL}/${name}/${episode}.mp4/media-1/stream.m3u8` });
            const content = await response.text();

            if (response.status != 200) throw new EnmaError(response.status, response.statusText)
            this.dir(`${this.PATH}/${name}`, episode, content)

        } catch (e: any) {
            throw new EnmaError(404, 'episode.not.found')
        }
    }

    private dir(name: string, episode: string, content: string) {
        if (fs.existsSync(name)) return this.download(name, episode, content);
        fs.mkdir(name, () => this.download(name, episode, content))
    }

    private download(path: string, episode: string, content: string) {
        fs.writeFileSync(`${path}/${episode}.m3u8`, content);
    }

}

export default new Download