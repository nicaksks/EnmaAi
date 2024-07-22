export type Parameters = {
    method: 'GET';
    endpoint: string;
}

export default abstract class Enma {
    protected async client(parameters: Parameters): Promise<Response> {
        return await fetch(parameters.endpoint, {
            method: parameters.method,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
                'Referer': 'https://www.anroll.net/'
            },
        })
    }

    protected extractData(data: string): string {
        return data
            .split('__NEXT_DATA__')[1]
            .split(`type="application/json">`)[1]
            .split('</script>')[0]
    }
}