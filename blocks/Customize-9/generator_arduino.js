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

var currentAngle = 90;


// angle + speed block
Blockly.Arduino["set_servo_angle_speed"] = function (block) {

  var angle = Blockly.Arduino.valueToCode(block, 'ANGLE', Blockly.Arduino.ORDER_ATOMIC);
  var speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC);

  Blockly.Arduino.includes_["includes_servo"] = "#include <Servo.h>";
  Blockly.Arduino.definitions_["var_servo" + dropdown_pin] = "Servo servo_" + dropdown_pin + ";";
  Blockly.Arduino.addFunction('ServoHelper_setServoAngleSpeed', `
      class ServoHelper {
      public:
        static int currentAngle;
        static void setServoAngleSpeed(int targetAngle, int speed) {
          int increment = (targetAngle > currentAngle) ? 1 : -1;
          int delayTime = 3000/speed; 
          for (int pos = currentAngle; pos != angle; pos += increment) {
              servo_` + dropdown_pin + `.write(pos);
              delay(delayTime);
          }
          currentAngle = targetAngle; // Update the current angle to the target angle
        }
      };
      int ServoHelper::currentAngle = 90;`);
  
  var code = 'ServoHelper::setServoAngleSpeed(' + angle + ', ' + speed + ');\n';
  return code;
};

  
  








