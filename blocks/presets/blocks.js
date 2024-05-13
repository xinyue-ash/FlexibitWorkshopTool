/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Ardublockly JavaScript for the Blockly resources and bindings.
 */
// 'use strict';

// goog.provide('Blockly.Blocks.presets');

// goog.require('Blockly.Blocks');


// Blockly.Blocks.presets.HUE = 60;



// Blockly.Blocks['breathing_spd'] = {
//   /**
//    * Block for writing an angle value into a servo pin.
//    * @this Blockly.Block
//    */
//   init: function () {
//     this.setHelpUrl('http://arduino.cc/en/Reference/ServoWrite');
//     this.setColour(Blockly.Blocks.presets.HUE);
//     this.appendDummyInput()
//       .appendField("hello")

//   }
// }

goog.provide('Blockly.Constants.servo');

goog.require('Blockly.Blocks');
goog.require('Blockly');

var servoMediaFolder = "./blocklyduino/blocks/servo/";

var pinDropdownOptions = [
  ["PIN 1", "1"], ["PIN 2", "2"], ["PIN 3", "3"], ["PIN 4", "4"], ["PIN 5", "5"],
  ["PIN 6", "6"], ["PIN 7", "7"], ["PIN 8", "8"], ["PIN 9", "9"], ["PIN 10", "10"],
  ["PIN 11", "11"], ["PIN 12", "12"], ["PIN 13", "13"],
  ["PIN A0", "A0"], ["PIN A1", "A1"], ["PIN A2", "A2"],
  ["PIN A3", "A3"], ["PIN A4", "A4"], ["PIN A5", "A5"]
];


// Blockly.Blocks['servo_move'] = {
//   init: function () {
//     this.appendDummyInput()
//       .appendField(Blockly.Msg.SERVO_MOVE_INPUT)
//       // .appendField(new Blockly.FieldImage(servoMediaFolder + "servo.jpg", 64, 64))
//       .appendField(Blockly.Msg.SERVO_PIN)
//       .appendField(new Blockly.FieldDropdown(pinDropdownOptions), "PIN");
//     this.appendValueInput("DEGREE")
//       .setCheck(intCompatibility)
//       .setAlign(Blockly.ALIGN_RIGHT)
//       .appendField(Blockly.Msg.SERVO_MOVE_DEGREE);
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setTooltip(Blockly.Msg.SERVO_MOVE_TOOLTIP);
//     this.setHelpUrl(Blockly.Msg.SERVO_MOVE_HELPURL);
//     this.setStyle('servo_blocks');
//   }
// };

// Blockly.Blocks['servo_read_degrees'] = {
//   init: function () {
//     this.appendDummyInput()
//       .appendField(Blockly.Msg.SERVO_READ_DEGREES_INPUT)
//       .appendField(new Blockly.FieldImage(servoMediaFolder + "servo.jpg", 64, 64))
//       .appendField(Blockly.Msg.SERVO_PIN)
//       .appendField(new Blockly.FieldDropdown(pinDropdownOptions), "PIN");
//     this.setOutput(true, "int");
//     this.setTooltip(Blockly.Msg.SERVO_READ_DEGREES_TOOLTIP);
//     this.setHelpUrl(Blockly.Msg.SERVO_READ_DEGREES_HELPURL);
//     this.setStyle('servo_blocks');
//   }
// };


Blockly.Blocks['breathing_spd'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.SERVO_PIN)
      .appendField(new Blockly.FieldDropdown(pinDropdownOptions), "PIN");
    this.appendDummyInput()
      .appendField("Breathing")
      .appendField("Speed")
      .appendField(new Blockly.FieldDropdown([
        ["slow", "SLOW"],
        ["fast", "FAST"]
      ]), "SPEED");
    this.appendDummyInput()
      .appendField("Breathing")
      .appendField("Amplitude")
      .appendField(new Blockly.FieldDropdown([
        ["deep", "DEEP"],
        ["shallow", "SHALLOW"]
      ]), "AMP");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip();
    this.setHelpUrl();
    
  }
};