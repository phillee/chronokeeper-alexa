/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a sample skill built with Amazon Alexa Skills nodejs
 * skill development kit.
 * This sample supports multiple languages (en-US, en-GB, de-GB).
 * The Intent Schema, Custom Slot and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-howto
 **/

'use strict';

const Alexa = require('alexa-sdk');
const MatchFinder = require('./match_finder')

const APP_ID = 'amzn1.ask.skill.1c7ce5f8-0322-4e69-b7d4-05b1ab53fccf'; // TODO replace with your app ID (OPTIONAL).

const handlers = {
    // 'NewSession': function () {
    //     // this.attributes.speechOutput = this.t('WELCOME_MESSAGE', this.t('SKILL_NAME'));
    //     // // If the user either does not reply to the welcome message or says something that is not
    //     // // understood, they will be prompted again with this text.
    //     // this.attributes.repromptSpeech = this.t('WELCOME_REPROMT');
    //     this.emit(':ask', 'hello');
    // },
    'FindMatchesIntent': function() {
        const slots = this.event.request.intent.slots;

        MatchFinder.findByName(slots.TournamentName.value, (err, desc) => {
            this.emit(':tell', desc);
        })
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    // alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};