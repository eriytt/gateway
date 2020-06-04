/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

const API = require('../api');
// const Gateway = require('../actions/Gateway');
// const ActionCard = require('../actions/ActionCard');
const page = require('page');

'use strict';

// eslint-disable-next-line no-unused-vars
const ActionsScreen = {
  init: function() {
    this.createActionButton = document.getElementById('create-action-button');
    this.createActionHint = document.getElementById('create-action-hint');
    this.actionsList = document.getElementById('actions');
    //this.gateway = new Gateway();
    this.nextId = 0;

    this.createActionButton.addEventListener('click', () => {
      page('/actions/new');
    });
  },

  /**
   * @return {Promise<Array<ActionDescription>>}
   */
  // readActions: function readActions() {
  //   return API.getActions().then((fetchedActions) => {
  //     this.actionsList.querySelectorAll('.action').forEach((elt) => {
  //       elt.parentNode.removeChild(elt);
  //     });

  //     for (const actionDesc of fetchedActions) {
  //       this.addActionCard(actionDesc);
  //     }

  //     if (fetchedActions.length === 0) {
  //       this.createActionHint.classList.remove('hidden');
  //     } else {
  //       this.createActionHint.classList.add('hidden');
  //     }
  //   });
  // },
  /**
   * Add a action, filling it with the data from a ActionDescription
   * @param {ActionDescription} desc
   */
  // addActionCard: function(desc) {
  //   const actionElt = document.createElement('div');
  //   actionElt.classList.add('action');
  //   try {
  //     new ActionCard(this.gateway, actionElt, this.nextId, desc);
  //   } catch (e) {
  //     console.error('Invalid action', desc, e);
  //     this.nextId += 1;
  //     return;
  //   }
  //   this.nextId += 1;
  //   this.actionsList.appendChild(actionElt);
  // },

  show: function() {
    // Promise.all([
    //   this.gateway.readThings(),
    //   this.gateway.readNotifiers(),
    // ]).then(() => {
    //   return this.readActions();
    // });
  },
};

module.exports = ActionsScreen;
