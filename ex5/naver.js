
import axios from 'axios';

const searchId = "";
const searchSecret = ""; 

const searchUrl = "https://openapi.naver.com/v1/search/webkr.json";

async function getSearch() {
    return await axios.get(searchUrl, {
        params: {
            query: "자바스크립트",
            display: 10,
            start: 1
        },
        headers: {
            'X-Naver-Client-Id': searchId,
            'X-Naver-Client-Secret': searchSecret, 
        }
    })
}

getSearch().then(response => {
    console.log(response.data);
})