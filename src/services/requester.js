const request = async (method, url, data) => { 
    try {
        const user = localStorage.getItem('auth'); 
        const auth = JSON.parse(user || '{}');

        let headers = {}
       //Too token or accessToken
        if (auth.accessToken) {
            headers['X-Authorization'] = auth.accessToken;
        }

        let fetchData;

        if (method === 'GET') { 
            fetchData = fetch(url, { headers });
        } else {
            fetchData = fetch(url, {
                method,   //POST// PUT//DELETE
                headers: {
                    ...headers,
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data),
            });
        }
        const response = await fetchData;

        if (!response.ok) { 
            const error = await response.json();
            const er = { error } //{error: error}
            return er; //not to thunder the page
            //throw new Error (error.message);
        }
       
        const result = await response.json();
        return result;
      
    } catch (error) {
        alert(error.message);
        throw error;
    }
};

export const get = request.bind({}, 'GET');
export const post = request.bind({}, 'POST');
export const patch = request.bind({}, 'PATCH');
export const put = request.bind({}, 'PUT');
export const del = request.bind({}, 'DELETE');
