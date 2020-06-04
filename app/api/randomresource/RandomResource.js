var api ={
    getRandom(){
        let orientation = "portrait";
        let url=`https://api.unsplash.com/photos/random?orientation=${orientation}`;//param orientation = portrait
        let headers={
            method:'GET',
            headers:{
            Authorization: 'Client-ID 9537c083326dcc052deccb63fdd7ba197a7f249b96f3eed6a6fd7d24a83b9b6b',
            },
        };
        return fetch(url, headers)
            .then((res)=>res.json())
            .catch((error) => {
                console.log(error)
            });
    }
};
module.exports = api;