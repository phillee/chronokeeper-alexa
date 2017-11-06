const toornament = require('./toornament');
const moment = require('moment-timezone');
const _ = require('lodash');
const models = require('./models');

// find matches currently happening or happening within 7 days
exports.findByName = (name, done) => {
  var dayFormat = 'YYYY-MM-DD';

  var now = moment().utc();
  var currentDay = now.format(dayFormat);
  var yesterday = moment(now).subtract(1, 'day').format(dayFormat);

  var threshold = now.format(dayFormat);

  var params = _.extend(this.getDateParams(), {
    name: name,
    // discipline: 'leagueoflegends',
    featured: 1
  });

  toornament.tournaments({ qs: params }, (err, tournaments) => {
    if (!tournaments.length) {
      return done(null, 'no upcoming events matching ' + name)
    }

    var tournament = tournaments[0];
    var tournamentDate = tournament.date_start;
    var tournamentDateString = null;

    if (tournamentDate) {
      tournamentDateString = humanizeDateInZone(tournamentDate);
    }

    toornament.matches(tournament.id, { sort: 'schedule' }, (err, matches) => {
      var matchDescription = 'unknown match';
      var matchDateString = null;

      for (var match of matches) {
        if (match.date) {
          var matchDate = moment(match.date);

          if (matchDate.isAfter(now)) {
            var matchObj = new models.Match(match);

            matchDescription = matchObj.opponentString();
            matchDateString = humanizeDateInZone(matchDate);
            break;
          }
        } else {
          var matchObj = new models.Match(match);
          matchDescription = matchObj.opponentString();
          break;
        }
      }

      var fullDescription = tournament.name + '. Next match';

      if (matchDateString || tournamentDateString) {
        fullDescription += ' takes place on ' + (matchDateString || tournamentDateString)
        fullDescription += ' between ' + matchDescription;
      } else {
        fullDescription += ' is between ' + matchDescription;
      }

      return done(null, fullDescription);
    })
  })
}

function humanizeDateInZone(dateStr) {
  console.log(dateStr)
  return moment(dateStr).format('dddd, MMMM Do');
}

// find matches currently happening or happening within 7 days
exports.getDateParams = () => {
  var dayFormat = 'YYYY-MM-DD';

  var today = moment().utc();
  var currentDay = today.format(dayFormat);
  var thresholdDay = moment(today).add(7, 'day').format(dayFormat);

  return {
    after_end: currentDay,
    before_start: thresholdDay
  }
}