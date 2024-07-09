export default (episode: number): string => {
    if (episode < 10) return `00${episode}`;
    if (episode >= 10 && episode < 100) return `0${episode}`;
    return episode.toString()
}