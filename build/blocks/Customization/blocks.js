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
    
    this.setPreviousStatement(true, 'Custom');
    this.setNextStatement(true, 'Custom');
    this.setColour(120);
    this.setTooltip("Move the servo to the angle at the specified speed.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['set_servo_angle_time'] = {
  init: function () {
    this.appendValueInput("ANGLE")
      .setCheck(Blockly.Types.NUMBER.checkList)
      .appendField("Move to angle (0-180):");
    
    
    this.appendValueInput("TIME")
      .setCheck(Blockly.Types.NUMBER.checkList)
      .appendField("With time in seconds: ");

    this.setPreviousStatement(true, 'Custom');
    this.setNextStatement(true, 'Custom');
    this.setColour(120);
    this.setTooltip("Move the servo to the specified angle within specified seconds.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['start_sequence_repeat'] = {
  init: function () {
    this.appendDummyInput().appendField("Custom Behavior: ");

    
    this.appendStatementInput("DO")
      .setCheck('Custom')
      .appendField("DO");
    
    this.appendValueInput("REPEATS")
      .setCheck(Blockly.Types.NUMBER.checkList)
      .appendField("repeat for");
    this.setPreviousStatement(true, 'Behavior');
    this.setNextStatement(true, 'Behavior');
    this.setTooltip("Insert speed/angle configuration to customize a behavior");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['multi_servo_control'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Multi Flexibit Control");

    this.appendStatementInput("FB1")
      .setCheck('Behavior')
      .appendField("Flexibit 1");

    this.appendStatementInput("FB2")
      .setCheck('Behavior')
      .appendField("Flexibit 2");

    this.appendStatementInput("FB3")
      .setCheck('Behavior')
      .appendField("Flexibit 3");


    this.setColour(230);
    this.setTooltip("Control multiple servos with separate blocks for each servo.");
    this.setHelpUrl("");
  }
};


