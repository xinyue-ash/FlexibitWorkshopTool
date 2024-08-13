/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Code generator for the transition blocks.
 */
"use strict";

goog.provide("Blockly.Arduino.Transition");
goog.require("Blockly.Arduino");


Blockly.Arduino["delay_between_angle"] = function (block) {
  var delayTime =
    Blockly.Arduino.valueToCode(block,
      "DELAY_TIME_MILI", Blockly.Arduino.ORDER_ATOMIC) * 1000 || "1";
  var code = 'servo___SERVO_PIN__.addDelayDuration(' + delayTime + '); \n';
  return code;
};

Blockly.Arduino["delay_between_behavior"] = function (block) {
  var delayTime =
    Blockly.Arduino.valueToCode(
      block,
      "DELAY_TIME_MILI",
      Blockly.Arduino.ORDER_ATOMIC
    ) * 1000 || "1";
  var code =
    'servo___SERVO_PIN__.StartNewSequence();\n' +
    'servo___SERVO_PIN__.addDelayDuration(' +  + delayTime + '); \n' +
    'servo___SERVO_PIN__.SetRepeats(1); \n';
  ;
  return code;
};

// below not functioning
Blockly.Arduino["infinite_loop"] = function (block) {
  return "while(true);\n";
};

Blockly.Arduino["repeat_loop"] = function (block) {
  return "\n";
};
