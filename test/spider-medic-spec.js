/**
 * Created by Ethan Hann on 3/20/2015.
 */

describe("Spider Medic", function () {
    it('should run spider-medic without error',function() {
        var spiderMedic = require('../lib/spider-medic');
        spiderMedic('http://example.com');
    });
});
