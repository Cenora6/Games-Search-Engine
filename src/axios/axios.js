import axios from 'axios';
import {CLIENT_ID} from '../auth/Auth'

const instance = axios.create({
    baseURL: 'https://game-searching-engine.herokuapp.com/https://api.igdb.com/v4',
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Client-ID': CLIENT_ID,
        'X-Requested-With': 'XMLHttpRequest'
    }
})

export default instance;