const Queue = require('queue-fifo');
const q = new Queue();
const { process } = require('./utils/process');
const tweetMock = require('./__mocks__/tweetMock');
const config = require('./configs');

// below commented out as did not have access to a twitter dev account 
// due to twitter approval process taking longer than 14+ days
// (discussed with Vikram prior to submission)

// const Twit = require('twit');
// const config = require('./configs');
// require('dotenv').config();
// const T = new Twit({
//     consumer_key: 'x',
//     consumer_secret: 'x',
//     access_token: 'x',
//     access_token_secret: 'x'
// });
// const stream = T.stream('/statuses/filter');
// stream.on('tweet', (tweet)=> {
//     queue.enqueue(tweet);
// });

//manuall add tweets
q.enqueue(tweetMock);
q.enqueue(tweetMock);
q.enqueue(tweetMock);
q.enqueue(tweetMock);
q.enqueue(tweetMock);
q.enqueue(tweetMock);
q.enqueue(tweetMock);
q.enqueue(tweetMock);

let stats = {
    startTime: new Date(),
    totalTweets: 0,
    avgTweetsPerHour: 0,
    avgTweetsPerMinute: 0,
    avgTweetsPerSecond: 0,
    topEmojis: {},
    emojiCount: 0,
    topHashtags: {},
    urlUsageCount: 0,
    photoUsageCount: 0,
    topDomains: {}
}

setInterval(() => {
    let arr = [];
    while(q.size() > 0) {
        arr = [...arr, q.dequeue()];
    }

    process(arr, stats).then((newStats) => {
        console.log('------------------------------------------------------');
        console.log(`Total number of tweets received: ${newStats.totalTweets}`);
        console.log(`Average tweets per hour: ${newStats.avgTweetsPerHour}`);
        console.log(`Average tweets per minute: ${newStats.avgTweetsPerHour}`);
        console.log(`Average tweets per second: ${newStats.avgTweetsPerSecond}`);
        console.log(`Top emojis in tweets: ${newStats.topEmojisDisplay}`);
        console.log(`Percent of tweets that contain emojis: ${newStats.percentContainingEmojis}`);
        console.log(`Top hashtags: ${newStats.topHashtagsDisplay}`);
        console.log(`Percent of tweets that contain a url: ${newStats.percentContainingUrl}`);
        console.log(`Percent of tweets that contain a photo url: ${newStats.percentContainingPhoto}`);
        console.log(`Top domains of urls in tweets: ${newStats.topDomainsDisplay}`);
    }).catch((err) => {
        console.log(`Error processing tweets`, err);
    });
}, config.pollFrequency);
