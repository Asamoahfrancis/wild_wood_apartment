import https from 'https';

export const ServerSide = () => {

    async function fetchData() {
        const httpRequest = https.request('https://jsonplaceholder.typicode.com/posts/1', (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                try {
                    const body = JSON.parse(data);
                    console.log(body);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            });
        });

        httpRequest.on('error', (error) => {
            console.error('Request error:', error);
        });

        httpRequest.end();
    }

    fetchData();
};
