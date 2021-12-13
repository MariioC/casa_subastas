import axios from 'axios';

export const BASE_URI = 'http://localhost:5000/'

const URI = BASE_URI + 'api/';

export const URI_IMGS = URI + 'img/';

export let api = axios.create({
    baseURL: URI,
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
})

export const resetAxios =() => {
    api = axios.create({
        baseURL: URI,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
}