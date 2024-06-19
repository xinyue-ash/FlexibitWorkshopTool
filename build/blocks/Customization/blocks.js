/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Ardublockly JavaScript for the Blockly resources and bindings.
 * for blocks that controls flexibit that conneted to board pin 9
 */

goog.require("Blockly.Constants.servo");
goog.require("Blockly.Blocks");
goog.require("Blockly.Types");
goog.require("Blockly");


Blockly.Blocks['set_servo_angle_speed'] = {
  init: function () {
    this.appendValueInput("ANGLE")
      .setCheck(Blockly.Types.NUMBER.checkList)
      .appendField("Move to angle (0-180):");
    this.appendValueInput("SPEED")
      .setCheck(Blockly.Types.NUMBER.checkList)
      .appendField("with speed (slow 1 - fast 10):");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(600);
    this.setTooltip("Move the servo to the specified angle at the specified speed.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['multi_servo_control'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Multi Servo Control");

    this.appendStatementInput("FB1")
      .setCheck(null)
      .appendField("Flexibit 1");

    this.appendStatementInput("FB2")
      .setCheck(null)
      .appendField("Flexibit 2");

    this.appendStatementInput("FB3")
      .setCheck(null)
      .appendField("Flexibit 3");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Control multiple servos with separate blocks for each servo.");
    this.setHelpUrl("");
  }
};


