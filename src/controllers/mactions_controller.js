/**
 * Logs Controller.
 *
 * Manages HTTP requests to /logs.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

const PromiseRouter = require('express-promise-router');

const MActionsController = PromiseRouter();

/**
 * Register a new manual action
 */
MActionsController.post('/', async (request, response) => {
  const descr = request.body.descr;
  const maxAge = request.body.maxAge;
  if (!descr || typeof maxAge !== 'number') {
    response.status(400).send('Invalid descr or maxAge property');
    return;
  }

  response.status(200).send({
    action: 'hello',
  });
});

/**
 * Get all the values of the currently register manual actions
 */
MActionsController.get('/', async (request, response) => {
  response.status(200).json([{action: 'hello'}]);
});


MActionsController.get('/:mactionId',
                       async (request, response) => {
                         // const mactionId = request.params.mactionId;
                         response.status(200).json({action: 'hello'});
                       });

MActionsController.delete('/:mactionId',
                          async (request, response) => {
                            // const mactionId = request.params.mactionId;
                            response.status(200).send();
                          });

module.exports = MActionsController;
