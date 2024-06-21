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

Blockly.Arduino["time_delay"] = function (block) {
  var delayTime =
    Blockly.Arduino.valueToCode(
      block,
      "DELAY_TIME_MILI",
      Blockly.Arduino.ORDER_ATOMIC
    ) * 1000 || "0";

  var time_now = 0;

  var code =
    "time_now = millis()\n\nwhile(millis() < time_now + " +
    delayTime +
    ") {\n" +
    "}\n";
  return code;
};

Blockly.Arduino["infinite_loop"] = function (block) {
  return "while(true);\n";
};

Blockly.Arduino["repeat_loop"] = function (block) {
  return "\n";
};
