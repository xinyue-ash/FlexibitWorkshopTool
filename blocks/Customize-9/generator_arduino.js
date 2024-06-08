/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Code generator for blocks that controls flexibit that conneted to board pin 9.
 */
"use strict";

goog.provide("Blockly.Arduino.Customize9");
goog.require("Blockly.Arduino.servo");

goog.require("Blockly.Arduino");

var dropdown_pin = 9; // for now 

var currentAngle = 0;


// angle + speed block
Blockly.Arduino["set_servo_angle_speed"] = function (block) {

  var angle = Blockly.Arduino.valueToCode(block, 'ANGLE', Blockly.Arduino.ORDER_ATOMIC);
  var speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC);

  Blockly.Arduino.includes_["includes_servo"] = "#include <Servo.h>";
  Blockly.Arduino.definitions_["var_servo" + dropdown_pin] =
    "Servo servo_" + dropdown_pin + ";";
  Blockly.Arduino.setups_["setup_servo_" + dropdown_pin] =
    "servo_" + dropdown_pin + ".attach(" + dropdown_pin + ");";

  Blockly.Arduino.addFunction('setServoPosition', ` void setServoPosition(int angle, int speed) {
  int increment = (angle > ` + currentAngle + `) ? 1 : -1;
  int delayTime = 1000 / speed; 

  for (int pos = ` + currentAngle + `; pos != angle; pos += increment) {
    servo_` + dropdown_pin + `.write(pos);
    delay(delayTime);
  }
  ` + currentAngle + ` = angle; // Update the current angle to the target angle}`);

  var code = 'setServoPosition(' + angle + ', ' + speed + ');\n';
  return code;
};







