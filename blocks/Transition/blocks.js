/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Ardublockly JavaScript for the Blockly resources and bindings.
 */


goog.provide('Blockly.Constants.servo');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');
goog.require('Blockly');


Blockly.Blocks['time_delay'] = {
  init: function() {
    this.appendValueInput('DELAY_TIME_MILI')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_TIME_DELAY);
    this.appendDummyInput()
        .appendField(" seconds");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_TIP);
  }
}

Blockly.Blocks['infinite_loop'] = {
  /**
   * Waits forever, end of program.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_TIME_INF);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setTooltip(Blockly.Msg.ARD_TIME_INF_TIP);
  }
};

// Blockly.Blocks['resting_state'] = {
//   init: function() {
//     this.appendDummyInput()
//         .appendField("Rest for");
//     this.appendDummyInput()
//         .appendField(new Blockly.FieldNumber(30, 0, 120), "DURATION");
//     this.appendDummyInput()
//         .appendField("seconds");
//     this.setInputsInline(true);
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(210);
//  this.setTooltip("No behavior, flexibit is idle");
//  this.setHelpUrl("");
//   }
// };