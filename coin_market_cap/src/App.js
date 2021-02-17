import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import TweetData from './TweetData'
var Twit = require('twit')

let top_handle = []
let twitterArr = [0]
let values_24h = new Map()
let values_id = new Map()



const App = () => {
  const [coin1, setCoin1] = useState(8);
  {
//Twitter API Key
const apikey = 'aAywfFHFJkYbm4V92dilq3nFG'
const apiSecretKey = 'oFoqeeEd5XYx0muuv3U7NYWQuScTgmJuPSbqd6wTnm1CMrE4cp'
const accessToken = '1349135560946937856-pV7Ihel8Th9QNuqkpjesrKp3bPExps'
const accessTokenSecret = '458p28Yl5E2eAiNfN5GEsZH2QJAOUKpXQlW2GFmsxQrvT'
const bear = 'AAAAAAAAAAAAAAAAAAAAAHhkMwEAAAAAPtQNZ3Gr15CUySrr77GVkQdmONk%3DFn5vb8omzAJCKSDkjGANExGfWttNovCX4U3cYOJZMVAf5m9GwA'


var T = new Twit({
  consumer_key: apikey,
  consumer_secret: apiSecretKey,
  access_token: accessToken,
  access_token_secret: accessTokenSecret
})

const needle = require('needle');

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const token = bear;

const endpointURL = "https://cors-anywhere.herokuapp.com/https://api.twitter.com/2/users/by?usernames=energywebx"

async function getRequest() {

    // These are the parameters for the API request
    // specify User names to fetch, and any additional fields that are required
    // by default, only the User ID, name and user name are returned
    const params = {
        usernames: "energywebx,energywebx"
    }

    // this is the HTTP header that adds bearer token authentication
    const res = await needle('get', endpointURL, params, {
        headers: {
            "User-Agent": "v2UserLookupJS",
            "Accept-Encoding": "gzip, deflate, br",
            "Authorization": `Bearer ${token}`
        }
    })

    if (res.body) {
      console.log(res.body)
        return res.body;
    } else {
        throw new Error('Unsuccessful request')
    }
}

(async () => {

    try {
        // Make request
        const response = await getRequest();
        console.log(response);

    } catch (e) {
        console.log(e);
    }
})();

  }



//CoinMarketCap API Key
{
var apikey = {
  key:'a7c75412-b7c5-4397-85a0-7c0a30e362c6'
}

request('GET',`https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${apikey.key}`)
.then((r1) => {
  var x1 = JSON.parse(r1.target.responseText);
  for (var i = x1.data.length - 1; i >= 0; i--) {
    values_24h.set(x1.data[i].name,x1.data[i].quote.USD.percent_change_24h)
    values_id.set(x1.data[i].name,x1.data[i].id)
  }
  //sort coins by positive percent_change over 24hrs
  var mapAsc = new Map([...values_24h.entries()].sort((a, b) => b[1] - a[1]));
  var arr_top5 = [Array.from(mapAsc)[0],Array.from(mapAsc)[1],Array.from(mapAsc)[2],Array.from(mapAsc)[3],Array.from(mapAsc)[4]]
  top_handle = [values_id.get(arr_top5[0][0]),values_id.get(arr_top5[1][0]),values_id.get(arr_top5[2][0]),
  values_id.get(arr_top5[3][0]),values_id.get(arr_top5[4][0])]
  twitterInfo()
}).catch()

//function occurs after first
function twitterInfo() {
request('GET',`https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=${top_handle[0]},${top_handle[1]},${top_handle[2]},${top_handle[3]},${top_handle[4]}&CMC_PRO_API_KEY=${apikey.key}`)
.then((r0) => {
  var x0 = JSON.parse(r0.target.responseText);
  if (twitterArr.length == 0){
  for (var i = top_handle.length - 1; i >= 0; i--) {
    twitterArr.push(x0.data[top_handle[i]].twitter_username)
  }
  //place twitter users back in order (positive growth)
  twitterArr.reverse()
  console.log(twitterArr)
  
}
}).catch()
}
}


//function from this video: https://www.youtube.com/watch?v=7Gdok1BPECw&ab_channel=DeKayArts
function request(method, url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url)
    xhr.onload = resolve;
    xhr.onerror = reject;
    xhr.send();
  });
}



  return (
    
    <div className="App">
      <p>{coin1}</p>
      {<TweetData 
        coin1={twitterArr[0]}
        coin2={twitterArr[1]}
        coin3={twitterArr[2]}
        coin4={twitterArr[3]}
        coin5={twitterArr[4]}/>}
    </div>
  );
};


export default App;
