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


Blockly.Arduino["breathing_spd_angle"] = function (block) {
  var speed = block.getFieldValue('SPEED');
  var amplitude = block.getFieldValue('AMP');
  var duration = Blockly.Arduino.valueToCode(block, "DURATION", Blockly.Arduino.ORDER_ATOMIC) || "90";

  var delayTime = speed == "SLOW" ? 2 : 7; // 60 ms for slow, 30 ms for fast
  var angle = amplitude == "DEEP" ? 170 : 90;
  var cycles = Math.floor((duration * 1000) / (2 * angle * delayTime)); // calculate number of cycles

  // Use the servoPin placeholder directly
  var code =
    'servo___SERVO_PIN__.StartNewSequence();\n' + 
    'servo___SERVO_PIN__.setAngleSpeed(0,10); \n' +
    'servo___SERVO_PIN__.setAngleSpeed(' + angle + ', ' + delayTime + '); \n' +
    'servo___SERVO_PIN__.setAngleSpeed(' + 0 + ', ' + delayTime + '); \n' +
    'servo___SERVO_PIN__.setReapeat(' + cycles + '); \n'; 
  ;
  return code;
  
};

Blockly.Arduino["breathing_spd_angle_cycle"] = function (block) {
  var speed = block.getFieldValue("SPEED");
  var apm = block.getFieldValue("AMP");
  var cycles =
    Blockly.Arduino.valueToCode(
      block,
      "CYCLES",
      Blockly.Arduino.ORDER_ATOMIC
    ) || "5";

  var delayTime = speed === "SLOW" ? 2 : 7; 
  var angle = apm == "DEEP" ? 170 : 90;

  var code =
    'servo___SERVO_PIN__.StartNewSequence();\n' +
    'servo___SERVO_PIN__.setAngleSpeed(0,10); \n' +
    'servo___SERVO_PIN__.setAngleSpeed(' + angle + ', ' + delayTime + '); \n' +
    'servo___SERVO_PIN__.setAngleSpeed(' + 0 + ', ' + delayTime + '); \n' +
    'servo___SERVO_PIN__.setReapeat(' + cycles + '); \n';
  ;
  return code;
};

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
    'servo___SERVO_PIN__.setAngleSpeed(0,1); \n' +
    'servo___SERVO_PIN__.setAngleSpeed(' + angle + ', ' + delayTime + '); \n' +
    'servo___SERVO_PIN__.setAngleSpeed(' + 0 + ', ' + delayTime + '); \n' +
    'servo___SERVO_PIN__.setReapeat(' + cycles + '); \n';
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
    'servo___SERVO_PIN__.setReapeat(' + cycles + '); \n';
  return code;
};

Blockly.Arduino["heartbeat"] = function (block) {
  var heartrate = block.getFieldValue("heartrate");

  var duration =
    Blockly.Arduino.valueToCode(
      block,
      "DURATION",
      Blockly.Arduino.ORDER_ATOMIC
    ) || "90";

  // fast was 500 
  var delayTime = heartrate === "Slow" ? 1 : 6;

  // var code =
  //   "for (int d = 0; d < " +
  //   duration +
  //   "; d++) {\n" +
  //   "    servo_" +
  //   dropdown_pin +
  //   ".write(180);\n" +
  //   "    time_now = millis()\n\n    while(millis() < time_now + " +
  //   delayTime +
  //   ") {\n" +
  //   "    }\n" +
  //   "servo_" + dropdown_pin + ".write(0);\n" +
  //   " time_now = millis()\n\n    while(millis() < time_now + " + delayTime / 2 +
  //   ") {\n" +
  //   "    }\n" +
  //   "}\n";
  // return code;
  var code =
    'servo___SERVO_PIN__.StartNewSequence();\n' +
    'servo___SERVO_PIN__.setAngleSpeed(180,' + delayTime + '); \n' +
    'servo___SERVO_PIN__.setAngleSpeed(0,' + delayTime/2 + '); \n' +
    'servo___SERVO_PIN__.setReapeat(' + duration + '); \n';
  return code;
};
