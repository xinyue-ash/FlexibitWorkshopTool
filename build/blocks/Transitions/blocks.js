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
    this.setTooltip("Wait specific time between angles in seconds.");
  },
  onchange: function (event) {

    if (!this.workspace) {
      // Block has been deleted.
      return;
    }

    const angleDelayBlock = this.getInputTargetBlock("DELAY_TIME_MILI");

    if (angleDelayBlock && angleDelayBlock.type === "math_number") {
      const angleDelayTime = parseFloat(angleDelayBlock.getFieldValue("NUM"));
      if (angleDelayTime <= 0 || isNaN(angleDelayTime)) {
        this.setWarningText("Duration must be greater than 0.");
        this.setDisabled(true);
      } else {
        this.setWarningText(null);
        this.setDisabled(false);
      }
    }
  },
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
    this.setTooltip("Wait specific time between behaviors in seconds.");
  },
  onchange: function (event) {

    if (!this.workspace) {
      // Block has been deleted.
      return;
    }

    const behaviorDelayBlock = this.getInputTargetBlock("DELAY_TIME_MILI");

    if (behaviorDelayBlock && behaviorDelayBlock.type === "math_number") {
      const behaviorDelayTime = parseFloat(behaviorDelayBlock.getFieldValue("NUM"));
      if (behaviorDelayTime <= 0 || isNaN(behaviorDelayTime)) {
        this.setWarningText("Duration must be greater than 0.");
        this.setDisabled(true);
      } else {
        this.setWarningText(null);
        this.setDisabled(false);
      }
    }
  },
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