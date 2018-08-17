'use strict';

module.exports = function (GbQuestionnaire) {

    var moment = require('moment');

    /**
     * Create the remote method
     * @author OHK
     * @method getQuestionnaireByCountry
     * @type { get }
     * @param { eventsid } - This is an optional value not necesary
     * @returns { events }
     */

    GbQuestionnaire.getQuestionnaireByCountry = function (eventsid, cb) {
        
        var _ = require('lodash');
        var ds = GbQuestionnaire.dataSource;

        var sql = "SELECT countries.id, countries.alpha3Code, countries.name, "
            + "COUNT(gbquestionnaire.country_id) as conteo FROM countries, gbquestionnaire "
            + "WHERE gbquestionnaire.country_id = countries.id GROUP BY id;";

        ds.connector.query(sql, [], function (err, resp) {

            if (err) {
                cb(err);
            } else {
                var out = _.map(resp, function (v, k) {
                    return {
                        name: v.name,
                        code: v.alpha3Code,
                        value: v.conteo,
                        id: v.id
                    }
                });
                cb(null, out);
            }

        });
    }

    /**
     * Create the remote method
     * @author OHK
     * @method remoteMethod
     * @name [getQuestionnaireByCountry]
     * @type { get }
     * @param { eventsid } - This is an optional value not necesary
     * @returns { events }
     */

    GbQuestionnaire.remoteMethod('getQuestionnaireByCountry', {
        accepts: [{
            arg: 'eventsid',
            type: 'number',
            required: false
        }],
        returns: {
            type: 'object',
            root: true
        },
        http: {
            verb: 'get'
        }
    });

};
