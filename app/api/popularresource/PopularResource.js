var api = {
    getPopular(page=1){
        let url=`https://api.unsplash.com/photos?page=${page}`;
        let headers = {
            method: 'GET',
            headers: {
                Authorization: 'Client-ID 54f0e1fa426e72ebba349aaf676667faf8aef7f9d7d060503836d5e2f5ba7d15',
                order_by: 'popular'
            },
        };
        return fetch(url, headers)
            .then((res) => res.json());
    }
};
module.exports = api;