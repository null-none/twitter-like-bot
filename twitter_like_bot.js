var twitter = require('twitter');
var events = require('events');

var connect = new twitter(authentication)
var eventEmitter = new events.EventEmitter();

var keywords = {track:'keyword'};
var stream = connect.stream('statuses/filter', keywords);

function likeTweet = function(tweetId) {

}

eventEmitter.listen('like', likeTweet);

stream.on('data', function(data) {
  eventEmitter.emit('like', data.id_str);
})
stream.on('error', function(err) {
  console.log(err);
})
