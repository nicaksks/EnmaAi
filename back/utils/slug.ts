export default (anime: string): string => {
    return anime.trimStart().trimEnd().replaceAll(' ', '-');
}