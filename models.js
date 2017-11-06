const _ = require('lodash');

exports.Match = function(data) {
  var pointer = this;
  this.data = data;

  this.opponentString = () => {
    if (pointer.data.opponents) {
      var participants = _.map(pointer.data.opponents, 'participant');

      return _.map(participants, 'name').join(' and ');
    } else {
      return 'unknown teams'
    }
  }
}