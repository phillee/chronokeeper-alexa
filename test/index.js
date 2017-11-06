var assert = require('assert');

const toornament = require('../toornament')
const MatchFinder = require('../match_finder')

describe('toornament', () => {
  describe('#tournaments', () => {
    it('should return tournaments', (done) => {
      toornament.tournaments({ qs:
        {
          name: 'MSI',
          discipline: 'leagueoflegends',
          featured: 1
        }
      }, (err, tournaments) => {
        console.log('tournaments *****')
        console.log(tournaments);

        toornament.matches(tournaments[0].id, (err, matches) => {
          console.log('matches *****')
          console.log(JSON.stringify(matches))
          return done();
        })

      })
    });
  });
});

describe.only('MatchFinder', () => {
  it('should find matches', function(done) {
    this.timeout(10000);

    MatchFinder.findByName('msi', (err, desc) => {
      console.log(desc)

      return done();
    })
  })
})