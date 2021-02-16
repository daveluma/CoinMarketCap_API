import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'

let top_handle = []
let values_24h = new Map()
let values_id = new Map()

const App = () => {

var apikey = {
  key:''
}

request('GET',`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${apikey.key}`)
.then((r1) => {
  var x1 = JSON.parse(r1.target.responseText);
  for (var i = x1.data.length - 1; i >= 0; i--) {
    values_24h.set(x1.data[i].name,x1.data[i].quote.USD.percent_change_24h)
    values_id.set(x1.data[i].name,x1.data[i].id)
  }
  var mapAsc = new Map([...values_24h.entries()].sort((a, b) => b[1] - a[1]));
  var arr_top5 = [Array.from(mapAsc)[0],Array.from(mapAsc)[1],Array.from(mapAsc)[2],Array.from(mapAsc)[3],Array.from(mapAsc)[4]]
  top_handle = [values_id.get(arr_top5[0][0]),values_id.get(arr_top5[1][0]),values_id.get(arr_top5[2][0]),
  values_id.get(arr_top5[3][0]),values_id.get(arr_top5[4][0])]
  console.log(arr_top5)
  console.log("tophandle")
  console.log(top_handle)
  twitterInfo()
})



function twitterInfo() {
request('GET',`https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=${top_handle[4]},${top_handle[3]},${top_handle[2]},${top_handle[1]},${top_handle[0]}&CMC_PRO_API_KEY=${apikey.key}`)
.then((r0) => {
  var x0 = JSON.parse(r0.target.responseText);
  console.log("check")
  
  console.log(x0)
}).catch()
}


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
      <header className="App-header">
        <p>Cool</p>
      </header>
    </div>
  );
};


export default App;
