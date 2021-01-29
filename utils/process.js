const EmojiData = require('emoji-data');
const util = require('./util');

const process = (arr, stats) => {
    return new Promise((resolve, reject) => {
        if(!arr || !stats) {
            reject();
        }

        if(arr.length === 0) {
            resolve(stats);
        }

        let urls;
        let hashes;
        let emojis;

        stats.totalTweets += arr.length;
        arr.forEach(tweet => {
            if(util.hasUrl(tweet)) {
                urls = util.getUrls(tweet);
                if(urls.length > 0) {
                    stats.urlUsageCount++;
                    urls.forEach(url => {
                        stats.topDomains[url] = (stats.topDomains[url] || 0) + 1;
                    });
                }

                if(util.hasPhoto(tweet)) {
                    stats.photoUsageCount++;
                }
            }

            hashes = util.getHashes(tweet);
            if(hashes.length > 0) {
                hashes.forEach(hash => {
                    stats.topHashtags[hash] = (stats.topHashtags[hash] || 0) + 1;
                });
            }
            
            emojis = EmojiData.scan(tweet.text);
            if(emojis.length > 0 ) {
                stats.emojiCount++;
                emojis.forEach(ec => {
                    stats.topEmojis[ec.short_name] = (stats.topEmojis[ec.short_name] || 0) + 1;
                });
            }
        });

        stats.avgTweetsPerSecond = util.getAvgTweetsPerSecond(stats.startTime, new Date(), stats.totalTweets);
        stats.avgTweetsPerMinute = Math.min(stats.avgTweetsPerSecond * 60, stats.totalTweets);
        stats.avgTweetsPerHour = Math.min(stats.avgTweetsPerMinute * 120, stats.totalTweets);
        stats.topEmojisDisplay = util.getTopRank(stats.topEmojis);
        stats.percentContainingEmojis = util.getPercentage(stats.emojiCount, stats.totalTweets);
        stats.topHashtagsDisplay = util.getTopRank(stats.topHashtags);
        stats.percentContainingUrl = util.getPercentage(stats.urlUsageCount, stats.totalTweets);
        stats.percentContainingPhoto = util.getPercentage(stats.photoUsageCount, stats.totalTweets);
        stats.topDomainsDisplay = util.getTopRank(stats.topDomains);

        arr = [];
        resolve(stats);
        //nothing asynchronize above but if this project was expanded, demonstrating the use of promises
        //resolve and reject would called in a callback
    });
}

module.exports = {
    process
};