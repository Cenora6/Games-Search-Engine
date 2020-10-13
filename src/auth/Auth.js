import axios from "axios";
import {setAuthToken} from './setAuthToken';

const CLIENT_ID = "73bfbbt7lhsdb5cilz3nkagmn6cm3g";
const CLIENT_SECRET = "uuw8hrnz6fcxfd00o9oofjrwo97taq";
const proxy = 'https://game-searching-engine.herokuapp.com/';

export default function getAppToken () {
    axios({
        url: `${proxy}https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`,
        method: 'POST',
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    }).then(response => {
        setAuthToken(`Bearer ${response.data.access_token}`);
    }).catch( error => {
        console.log(error)
    })
}


export {CLIENT_ID, CLIENT_SECRET, proxy};