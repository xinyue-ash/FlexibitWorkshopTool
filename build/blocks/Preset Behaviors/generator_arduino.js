/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Code generator for blocks that controls flexibit that conneted to board pin 9.
 */
"use strict";

goog.provide("Blockly.Arduino.Flexibit9");
goog.require("Blockly.Arduino.servo");
goog.require("Blockly.Arduino");

// // take the time of EACH breath, angle and number of cycle
Blockly.Arduino["breathing_preiod_angle_cycle"] = function (block) {
  var userPreiod =
    Blockly.Arduino.valueToCode(
      block,
      "PERIOD",
      Blockly.Arduino.ORDER_ATOMIC
    ) || "4";

  var period = userPreiod * 1000 / 2;

  var angle =
    Blockly.Arduino.valueToCode(
      block,
      "DEGREE",
      Blockly.Arduino.ORDER_ATOMIC
    ) || "90";
  var cycles =
    Blockly.Arduino.valueToCode(
      block,
      "CYCLES",
      Blockly.Arduino.ORDER_ATOMIC
    ) || "5";

  var code =
    'servo___SERVO_PIN__.StartNewSequence();\n' +
    'servo___SERVO_PIN__.setAnglePeriod(' + angle + ', ' + period + '); \n' +
    'servo___SERVO_PIN__.setAnglePeriod(' + 0 + ', ' + period + '); \n' +
    'servo___SERVO_PIN__.SetRepeats(' + cycles + '); \n';
  ;
  return code;
};

//take the time of EACH breath, angle and number of cycle
Blockly.Arduino["breathing_preiod_angle_cycle"] = function (block) {
  var userPreiod =
    Blockly.Arduino.valueToCode(
      block,
      "PERIOD",
      Blockly.Arduino.ORDER_ATOMIC
    ) || "4";

  var period = userPreiod * 1000 / 2;

  var angle =
    Blockly.Arduino.valueToCode(
      block,
      "DEGREE",
      Blockly.Arduino.ORDER_ATOMIC
    ) || "90";
  var cycles =
    Blockly.Arduino.valueToCode(
      block,
      "CYCLES",
      Blockly.Arduino.ORDER_ATOMIC
    ) || "5";

  var code =
    'servo___SERVO_PIN__.StartNewSequence();\n' +
    'servo___SERVO_PIN__.setAnglePeriod(' + angle + ', ' + period + '); \n' +
    'servo___SERVO_PIN__.setAnglePeriod(' + 0 + ', ' + period + '); \n' +
    'servo___SERVO_PIN__.SetRepeats(' + cycles + '); \n';
  ;
  return code;
};

// preset speed
Blockly.Arduino["breathing_spd_angle_cycle"] = function (block) {
  var speed = block.getFieldValue("SPEED");
  var apm = block.getFieldValue("AMP");
  var cycles =
    Blockly.Arduino.valueToCode(
      block,
      "CYCLES",
      Blockly.Arduino.ORDER_ATOMIC
    ) || "5";

  var delayTime = speed === "SLOW" ? 5 : 9;
  var angle = apm == "DEEP" ? 170 : 90;

  var code =
    'servo___SERVO_PIN__.StartNewSequence();\n' +
    'servo___SERVO_PIN__.setAngleSpeed(0,10); \n' +
    'servo___SERVO_PIN__.setAngleSpeed(' + angle + ', ' + delayTime + '); \n' +
    'servo___SERVO_PIN__.setAngleSpeed(' + 0 + ', ' + delayTime + '); \n' +
    'servo___SERVO_PIN__.SetRepeats(' + cycles + '); \n';
  ;
  return code;
};

// takes breathing number of cycle, angle, and userinput speed (1-10)
Blockly.Arduino["breathing_interval_angle_cycle"] = function (block) {
  // var dropdown_pin = block.getFieldValue('PIN');
  var delayTime =
    Blockly.Arduino.valueToCode(
      block,
      "INTERVAL",
      Blockly.Arduino.ORDER_ATOMIC
    ) || "5";
  var angle =
    Blockly.Arduino.valueToCode(
      block,
      "DEGREE",
      Blockly.Arduino.ORDER_ATOMIC
    ) || "90";
  var cycles =
    Blockly.Arduino.valueToCode(
      block,
      "CYCLES",
      Blockly.Arduino.ORDER_ATOMIC
    ) || "5";

  var code =
    'servo___SERVO_PIN__.StartNewSequence();\n' +
    'servo___SERVO_PIN__.setAngleSpeed(0,10); \n' +
    'servo___SERVO_PIN__.setAngleSpeed(' + angle + ', ' + delayTime + '); \n' +
    'servo___SERVO_PIN__.setAngleSpeed(' + 0 + ', ' + delayTime + '); \n' +
    'servo___SERVO_PIN__.SetRepeats(' + cycles + '); \n';
  ;
  return code;
};

Blockly.Arduino["shake"] = function (block) {

  var cycles =
    Blockly.Arduino.valueToCode(
      block,
      "CYCLES",
      Blockly.Arduino.ORDER_ATOMIC
    ) || "5";

  var code =
    'servo___SERVO_PIN__.StartNewSequence();\n' +
    'servo___SERVO_PIN__.setAngleSpeed(80,10); \n' +
    'servo___SERVO_PIN__.setAngleSpeed(100,10); \n' +
    'servo___SERVO_PIN__.SetRepeats(' + cycles + '); \n';
  return code;
};

Blockly.Arduino["heartbeat"] = function (block) {
  var heartrate = block.getFieldValue("heartrate");

  var repeat =
    Blockly.Arduino.valueToCode(
      block,
      "DURATION",
      Blockly.Arduino.ORDER_ATOMIC
    ) || "10";

  // fast was 500 
  var delayTime = heartrate === "Slow" ? 6 : 10;
  var code =
    'servo___SERVO_PIN__.StartNewSequence();\n' +
    'servo___SERVO_PIN__.setAngleSpeed(40,' + delayTime + '); \n' +
    'servo___SERVO_PIN__.setAngleSpeed(20,' + delayTime / 3 + '); \n' +
    'servo___SERVO_PIN__.SetRepeats(' + repeat + '); \n';
  return code;
};
