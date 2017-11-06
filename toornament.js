const request = require('request')
const _ = require('lodash')

const API_KEY = '_MJKseIisfiPC9BjTDYBDwsHehHJas6u01orBUcN3Gk'
const BASE_URL = 'https://api.toornament.com/v1'

function makeRequest(path, params, done) {
  var options = {
    uri: BASE_URL + path,
    headers: {
      'X-Api-Key': API_KEY
    }
  };

  _.extend(options, params);

  console.log(options);

  request(options, (err, resp, body) => {
    done(err, JSON.parse(body));
  });
}

exports.tournaments = (params, done) => {
  if (!done) {
    done = params;
    params = {};
  };

  makeRequest('/tournaments', params, done);
}

exports.matches = (tournamentId, params, done) => {
  if (!done) {
    done = params;
    params = {};
  };

  makeRequest('/tournaments/' + tournamentId + '/matches', params, done);
}