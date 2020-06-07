/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

const API = require('../api');
// const Gateway = require('../actions/Gateway');
// const ActionCard = require('../actions/ActionCard');
const page = require('page');

const Utils = require('../utils');

'use strict';

class ManualActionCard {
  /**
   * A summary of a Rule in card format
   * @constructor
   * @param {Gateway} gateway - global Gateway with which to communicate
   * @param {Element} elt - element into which to put the card
   * @param {String} id - unique identifier of the rule card
   * @param {RuleDescription} desc - rule description to represent
   */
  constructor(elt, id, desc) {
    this.elt = elt;
    this.id = id;
    this.desc = desc;
    const checked = 'checked';
    this.elt.innerHTML = `
      <div class="maction-edit-overlay">
        <div class="maction-delete-button"></div>
        <input class="maction-edit-button" type="button" value="Edit Maction"/>
        <div class="maction-delete-dialog">
          <p data-l10n-id="maction-delete-prompt"></p>
          <input class="maction-delete-cancel-button" type="button"
                 data-l10n-id="maction-delete-cancel-button" />
          <input class="maction-delete-confirm-button" type="button"
                 data-l10n-id="maction-delete-confirm-button" />
        </div>
      </div>
      <div class="maction-preview">
        <div class="maction-part-block trigger">
          <img class="maction-part-icon" src="/images/thing-icons/thing.svg"/>
        </div>
        <div class="maction-part-block effect">
          <img class="maction-part-icon" src="/images/thing-icons/thing.svg"/>
        </div>
      </div>
      <div class="maction-info">
        <h3>${Utils.escapeHtml(this.desc.action)}</h3>
        <p>${Utils.escapeHtml(this.desc.action)}</p>
      </div>
      <form class="maction-switch switch">
        <input type="checkbox" id="maction-switch-${Utils.escapeHtml(id)}"
               class="switch-checkbox" ${checked}/>
        <label class="switch-slider" for="maction-switch-${Utils.escapeHtml(id)}">
        </label>
      </form>
    `;

    this.onEditButtonClick = this.onEditButtonClick.bind(this);
    this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
    this.onDeleteCancelClick = this.onDeleteCancelClick.bind(this);
    this.onDeleteConfirmClick = this.onDeleteConfirmClick.bind(this);
    this.onEnabledCheckboxChange = this.onEnabledCheckboxChange.bind(this);

    this.editButton = this.elt.querySelector('.maction-edit-button');
    this.editButton.addEventListener('click', this.onEditButtonClick);

    this.deleteButton = this.elt.querySelector('.maction-delete-button');
    this.deleteButton.addEventListener('click', this.onDeleteButtonClick);
    this.deleteCancel = this.elt.querySelector('.maction-delete-cancel-button');
    this.deleteCancel.addEventListener('click', this.onDeleteCancelClick);
    this.deleteConfirm = this.elt.querySelector('.maction-delete-confirm-button');
    this.deleteConfirm.addEventListener('click', this.onDeleteConfirmClick);

    this.enabledCheckbox = this.elt.querySelector('.switch-checkbox');
    this.enabledCheckbox.addEventListener('change',
                                          this.onEnabledCheckboxChange);

    this.editOverlay = this.elt.querySelector('.maction-edit-overlay');
  }

  onEditButtonClick() {
    page(`/mactions/${encodeURIComponent(this.rule.id)}`);
  }

  onDeleteButtonClick() {
    this.editOverlay.classList.add('delete');
  }

  onDeleteCancelClick() {
    this.editOverlay.classList.remove('delete');
  }

  onDeleteConfirmClick() {
    this.rule.delete();
    this.elt.parentNode.removeChild(this.elt);
  }

  onEnabledCheckboxChange() {
    if (this.enabledCheckbox.checked) {
      this.rule.enabled = true;
    } else {
      this.rule.enabled = false;
    }
    this.rule.update();
  }
}

// eslint-disable-next-line no-unused-vars
const ActionsScreen = {
  init: function() {
    this.createActionButton = document.getElementById('create-maction-button');
    this.createActionHint = document.getElementById('create-maction-hint');
    this.actionsList = document.getElementById('mactions');
    // this.gateway = new Gateway();
    this.nextId = 0;

    this.createActionButton.addEventListener('click', () => {
      page('/mactions/new');
    });
  },

  /**
   * @return {Promise<Array<ActionDescription>>}
   */
  readManualActions: function readManualActions() {
    return API.getManualActions().then((fetchedActions) => {
      // console.log(fetchedActions);
      this.actionsList.querySelectorAll('.maction').forEach((elt) => {
        elt.parentNode.removeChild(elt);
      });

      for (const actionDesc of fetchedActions) {
        this.addActionCard(actionDesc);
      }

      if (fetchedActions.length === 0) {
        this.createActionHint.classList.remove('hidden');
      } else {
        this.createActionHint.classList.add('hidden');
      }
    });
  },

  /**
   * Add a action, filling it with the data from a ActionDescription
   * @param {ActionDescription} desc
   */
  addActionCard: function(desc) {
    const actionElt = document.createElement('div');
    actionElt.classList.add('maction');
    try {
      new ManualActionCard(actionElt, this.nextId, desc);
    } catch (e) {
      console.error('Invalid action', desc, e);
      this.nextId += 1;
      return;
    }
    this.nextId += 1;
    this.actionsList.appendChild(actionElt);
  },

  show: function() {
    // Promise.all([
    //   this.gateway.readThings(),
    //   this.gateway.readNotifiers(),
    // ]).then(() => {
    return this.readManualActions();
    // });
  },
};

module.exports = ActionsScreen;
