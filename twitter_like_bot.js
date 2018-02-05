const Twitter = require('twitter');
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {};
const myEmitter = new MyEmitter();

var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

var keywords = {track:'keyword, keyword'};
var stream = client.stream('statuses/filter', keywords);

myEmitter.on('event', (tweetId) => {
  client.post('favorites/create', {id:tweetId}, (error, response) => {
    if(error) throw error;
    console.log(response.text);
    console.log('Tweet ID: '+response.id_str+' Liked!')
  });
});

stream.on('data', (event) => {
  myEmitter.emit('event', event.id_str);
});

stream.on('error', (error) => {
  throw error;
});
