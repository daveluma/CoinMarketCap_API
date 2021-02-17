import React, {useEffect, useState} from "react";
var Twit = require('twit')
var config = require('./config')
var dee = []
console.log(config)
console.log("HERBOII")
  var T = new Twit(config);
  var tt = ''
  T.get("https://api.twitter.com/2/users/by?usernames=energywebx", function(err, data, response) {
    console.log(data)
    tt = data.id
  })

  T.get("https://api.twitter.com/1.1/users/show.json?user_id=12345", function(err, data, response) {
    
    console.log(data.statuses_count)
    console.log(data.followers_count)
  })
  
  const TweetData = ({coin2, coin3, coin4}) => {
      return(
          <div class={coin2}>
              <h1>{coin3}</h1>
              <p>{coin4}</p>
          </div>
      );
  }
  
  export default TweetData;