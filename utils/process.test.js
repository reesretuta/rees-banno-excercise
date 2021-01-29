const tweetMock = require('../__mocks__/tweetMock');
const { process } = require('./process');

describe('process', () => {
    let arr = [tweetMock, tweetMock];
    let stats;
    beforeEach(() => {
        stats = {
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
    });

    it('should process: Total number of tweets received', () => {
        process(arr, stats).then((newStats) => {
            expect(newStats.totalTweets).toEqual(2);
        });
    });

    it('should process: Top emojis in tweets', () => {
        process(arr, stats).then((newStats) => {
            expect(newStats.topEmojis['hearts']).toEqual(2);
        });
    });

    it('should process: Percent of tweets that contains emojis', () => {
        process(arr, stats).then((newStats) => {
            expect(newStats.percentContainingEmojis).toEqual('100%');
        });
    });

    it('should process: Top hashtags', () => {
        process(arr, stats).then((newStats) => {
            expect(newStats.topHashtags['PGP']).toEqual(2);
        });
    });

    it('should process: Percent of tweets that contain a url', () => {
        process(arr, stats).then((newStats) => {
            expect(newStats.percentContainingUrl).toEqual('100%');
        });        
    });

    it('should process: Percent of tweets that contain a photo url', () => {
        process(arr, stats).then((newStats) => {
            expect(newStats.percentContainingPhoto).toEqual('100%');
        });        
    });

    it('should process: Top domains of urls in tweets', () => {
        process(arr, stats).then((newStats) => {
            expect(newStats.topDomains['http://test1.com']).toEqual(2);
            expect(newStats.topDomains['https://test2.com']).toEqual(2);
            expect(Object.keys(newStats.topDomains).length).toEqual(2);
        });        
    });
});