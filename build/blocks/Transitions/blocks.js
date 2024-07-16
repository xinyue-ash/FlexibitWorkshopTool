/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Ardublockly JavaScript for the Blockly resources and bindings.
 */



goog.require('Blockly.Blocks');
goog.require('Blockly.Types');
goog.require('Blockly');


Blockly.Blocks['delay_between_angle'] = {
  init: function() {
    this.appendValueInput('DELAY_TIME_MILI')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_TIME_DELAY);
    this.appendDummyInput()
      .appendField(" seconds between angles");
    
    this.setPreviousStatement(true, 'Custom');
    this.setNextStatement(true, 'Custom');
    this.setColour(120);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_TIP);
  }
}

Blockly.Blocks['delay_between_behavior'] = {
  init: function () {
    this.appendValueInput('DELAY_TIME_MILI')
      .setCheck(Blockly.Types.NUMBER.checkList)
      .appendField(Blockly.Msg.ARD_TIME_DELAY);
    this.appendDummyInput()
      .appendField(" seconds between behaviors");
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'Behavior');
    this.setNextStatement(true, 'Behavior');
    this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_TIP);
  }
}


// below not functioning
Blockly.Blocks['infinite_loop'] = {
  /**
   * Waits forever, end of program.
   */
  init: function() {
    this.appendDummyInput()
        .appendField("End Whole Program");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setTooltip(Blockly.Msg.ARD_TIME_INF_TIP);
  }
};

Blockly.Blocks['repeat_loop'] = {
  /**
   * Empty block to indicate loop cycling
   */
  init: function() {
    this.appendDummyInput()
      .appendField("Repeat previous behavior(s) infinitely");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
  }
};