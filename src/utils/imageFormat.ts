export default (image: string, format: string = 'jpg'): string => {
    return image.split('.').length == 1 ? `${image}.${format}` : image;
}