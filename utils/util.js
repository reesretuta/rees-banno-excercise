module.exports = {
    hasPhoto: (tweet) => {
        return tweet.text.indexOf('pic.twitter.com') >= 0 || tweet.text.indexOf('instagram.com' >= 0);
    },
    hasUrl: (tweet) => {
        return tweet.entities.urls.length > 0;
    },
    getUrls: (tweet) => {
        //alternative regex approach: str.match(/\bhttps?:\/\/\S+/gi);
        return tweet.entities.urls;
    },
    getHashes: (tweet) => {
        return tweet.entities.hashtags.map(hash => hash.text);
    },
    getAvgTweetsPerSecond: (startTime, endTime, totalTweets) => {
        return (totalTweets / ((endTime - startTime) / 1000)).toFixed(2);
    },
    getTopRank: (map) => {
        let sortable = [];
        for (let key in map) {
            sortable = [...sortable, {
                hash: key,
                count: map[key]
            }];
        }
        return sortable.sort((a,b) => b.count - a.count).map(h => h.hash).slice(0,5).join(', ');
    },
    getPercentage: (part, total) => {
        return (part/total*100).toFixed(0) + '%';
    }
};