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

var setUpSweeper = `
#include <Servo.h>
// Define Sweeper class if not included elsewhere
class Sweeper {
public:
  Sweeper(int interval) : updateInterval(interval), lastUpdate(0), targetAngle(0), currentAngle(0), increment(1) {}

  void Attach(int pin) {
    servo.attach(pin);
  }

  void SetTarget(int angle, int speed) {
    targetAngle = angle;
    increment = (targetAngle > currentAngle) ? 1 : -1;
  }

  void Update() {
    if (millis() - lastUpdate >= updateInterval) {
      if (currentAngle != targetAngle) {
        currentAngle += increment;
        servo.write(currentAngle);
      }
      lastUpdate = millis();
    }
  }

private:
  Servo servo;
  int updateInterval;
  unsigned long lastUpdate;
  int targetAngle;
  int currentAngle;
  int increment;
};
`;

// angle + speed block
Blockly.Arduino["set_servo_angle_speed"] = function (block) {

  var angle = Blockly.Arduino.valueToCode(block, 'ANGLE', Blockly.Arduino.ORDER_ATOMIC);
  var speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC);

  var code = 'sweeper___SERVO_PIN__' + '.SetTarget(' + angle + ', ' + speed + ');\n';
  code += 'sweeper___SERVO_PIN__' + '.Update();\n';
  return code;
};



// TODO: to be continued  pin 3, 5, 6 
Blockly.Arduino['multi_servo_control'] = function (block) {
  var statements_flexibit1 = Blockly.Arduino.statementToCode(block, 'FB1');
  var statements_flexibit2 = Blockly.Arduino.statementToCode(block, 'FB2');
  var statements_flexibit3 = Blockly.Arduino.statementToCode(block, 'FB3');

  Blockly.Arduino.definitions_['setUpSweeperClass'] = setUpSweeper;

  Blockly.Arduino.definitions_['sweeper_9'] = 'Sweeper sweeper_9(20);';
  Blockly.Arduino.definitions_['sweeper_10'] = 'Sweeper sweeper_10(20);';
  Blockly.Arduino.definitions_['sweeper_11'] = 'Sweeper sweeper_11(20);';

  Blockly.Arduino.setups_['setup_sweeper_9'] = 'sweeper_9.Attach(9);';
  Blockly.Arduino.setups_['setup_sweeper_10'] = 'sweeper_10.Attach(10);';
  Blockly.Arduino.setups_['setup_sweeper_11'] = 'sweeper_11.Attach(11);';



  var code = `
    { // Start Flexibit 1 scope
      const int servoPin = 9;
      ${statements_flexibit1.replace(/__SERVO_PIN__/g, '9')}
    } // End Flexibit 1 scope

    { // Start Flexibit 2 scope
      const int servoPin = 10;
      ${statements_flexibit2.replace(/__SERVO_PIN__/g, '10')}
    } // End Flexibit 2 scope

    { // Start Flexibit 3 scope
      const int servoPin = 11;
      ${statements_flexibit3.replace(/__SERVO_PIN__/g, '11')}
    } // End Flexibit 3 scope
  `;
  return code;

};












