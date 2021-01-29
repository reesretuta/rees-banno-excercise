const util = require('./util');
const tweetMock = require('../__mocks__/tweetMock');

describe('util', () => {
    it('should determine if there is a photo', () => {
        expect(util.hasPhoto(tweetMock)).toBeTrue;
    });

    it('should determine if there is a URL', () => {
        expect(util.hasUrl(tweetMock)).toBeTrue;
    });

    it('should fetch URLs', () => {
        expect(util.getUrls(tweetMock).length).toEqual(2);
    });

    it('should get hashes', () => {
        expect(util.getHashes(tweetMock).length).toEqual(1);
    });

    it('should rank top five', () => {
        let map = {
            'hash1': 1,
            'hash2': 2,
            'hash3': 3,
            'hash4': 4,
            'hash5': 5,
            'hash6': 6,
            'hash7': 7,
        }
        expect(util.getTopRank(map)).toEqual('hash1, hash2, hash3, hash4, hash5');
    });

    it('should calculate percentage', () => {
        expect(util.getPercentage(50, 100)).toEqual('50%');
    });


});