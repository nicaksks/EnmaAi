import Download from "@back/services/Download"
import episode from "@back/utils/episode"
import slug from "@back/utils/slug"

export default async (anime: string, ep: number): Promise<void> => {
    await Download.now(slug(anime), episode(ep)) 
}