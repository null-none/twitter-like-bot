var twitter = require('twitter');
var config = require('./authentication.js');
var events = require('events');


var connect = new twitter(config)
var eventEmitter = new events.EventEmitter();

var keywords = {track:'keyword1','keyword2'};
var stream = connect.stream('statuses/filter', keywords);

var likeTweet = function(tweetId) {
  connect.post('favorites/create', tweetId, function(err, response) {
    if (err) {
      console.log(err);
    } else {
      console.log('Liked! - tweet id: '+tweetId);
    }
  })
}

eventEmitter.on('like', likeTweet);

stream.on('data', function(data) {
  eventEmitter.emit('like', {data:data.id_str});
})
stream.on('error', function(err) {
  console.log(err);
})
