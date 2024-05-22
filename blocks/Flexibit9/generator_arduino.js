/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Code generator for the test 2 blocks.
 */
'use strict';

goog.provide('Blockly.Arduino.Flexibit9');
goog.require('Blockly.Arduino.servo');

goog.require('Blockly.Arduino');



var dropdown_pin = 9;

Blockly.Arduino['breathing_spd_angle'] = function (block) {
  // var dropdown_pin = block.getFieldValue('PIN');
  var speed = block.getFieldValue('SPEED');
  var apm = block.getFieldValue('AMP');
  // var duration = block.getFieldValue('DURATION');

  var duration = Blockly.Arduino.valueToCode(
    block, 'DURATION', Blockly.Arduino.ORDER_ATOMIC) || '90'


  var delayTime = (speed === 'SLOW') ? 20 : 5; // 20 milliseconds for slow, 5 milliseconds for fast, this is the millisecond per degree step
  var angle = (apm == 'DEEP') ? 170 : 90;
  var cycles = Math.floor((duration * 1000) / (2 * angle * delayTime)); // delay time is the 
  console.log(cycles);


  Blockly.Arduino.includes_['includes_servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['var_servo' + dropdown_pin] = 'Servo servo_' + dropdown_pin + ';';
  Blockly.Arduino.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ');';

  var code = 'for (int c = 0; c < ' + cycles + '; c++) {\n' +
    '  for (int pos = 0; pos <= ' + angle + '; pos++) { // goes from 0 degrees to ' + angle + ' degrees\n' +
    '    servo_' + dropdown_pin + '.write(pos);\n' +
    '    delay(' + delayTime + '); // Slow or fast depending on the selection\n' +
    '  }\n' +
    '  for (int pos = ' + angle + '; pos >= 0; pos--) { // goes from ' + angle + ' degrees back to 0 degrees\n' +
    '    servo_' + dropdown_pin + '.write(pos);\n' +
    '    delay(' + delayTime + '); // Slow or fast depending on the selection\n' +
    '  }\n' +
    '}\n';
  return code;

};

Blockly.Arduino['breathing_spd_angle_cycle'] = function (block) {
  // var dropdown_pin = block.getFieldValue('PIN');
  var speed = block.getFieldValue('SPEED');
  var apm = block.getFieldValue('AMP');
  // var duration = block.getFieldValue('DURATION');

  var cycles = Blockly.Arduino.valueToCode(
    block, 'CYCLES', Blockly.Arduino.ORDER_ATOMIC) || '5'


  var delayTime = (speed === 'SLOW') ? 20 : 5; // 20 milliseconds for slow, 5 milliseconds for fast, this is the millisecond per degree step
  var angle = (apm == 'DEEP') ? 170 : 90;
  // var cycles = Math.floor((duration * 1000) / (2 * angle * delayTime)); // delay time is the 
 
  console.log(cycles);


  Blockly.Arduino.includes_['includes_servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['var_servo' + dropdown_pin] = 'Servo servo_' + dropdown_pin + ';';
  Blockly.Arduino.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ');';

  var code = 'for (int c = 0; c < ' + cycles + '; c++) {\n' +
    '  for (int pos = 0; pos <= ' + angle + '; pos++) { // goes from 0 degrees to ' + angle + ' degrees\n' +
    '    servo_' + dropdown_pin + '.write(pos);\n' +
    '    delay(' + delayTime + '); // Slow or fast depending on the selection\n' +
    '  }\n' +
    '  for (int pos = ' + angle + '; pos >= 0; pos--) { // goes from ' + angle + ' degrees back to 0 degrees\n' +
    '    servo_' + dropdown_pin + '.write(pos);\n' +
    '    delay(' + delayTime + '); // Slow or fast depending on the selection\n' +
    '  }\n' +
    '}\n';
  return code;

};


Blockly.Arduino['breathing_interval_angle_cycle'] = function (block) {
  // var dropdown_pin = block.getFieldValue('PIN');
  var delayTime = Blockly.Arduino.valueToCode(
    block, 'INTERVAL', Blockly.Arduino.ORDER_ATOMIC) || '5';
  var angle = Blockly.Arduino.valueToCode(
    block, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC) || '90';
  var cycles = Blockly.Arduino.valueToCode(
    block, 'CYCLES', Blockly.Arduino.ORDER_ATOMIC) || '5'

  // set up servo
  Blockly.Arduino.includes_['includes_servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['var_servo' + dropdown_pin] = 'Servo servo_' + dropdown_pin + ';';
  Blockly.Arduino.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ');';

  //in loop()
  var code = 'for (int c = 0; c < ' + cycles + '; c++) {\n' +
    '  for (int pos = 0; pos <= ' + angle + '; pos++) { // goes from 0 degrees to ' + angle + ' degrees\n' +
    '    servo_' + dropdown_pin + '.write(pos);\n' +
    '    delay(' + delayTime + '); // Slow or fast depending on the selection\n' +
    '  }\n' +
    '  for (int pos = ' + angle + '; pos >= 0; pos--) { // goes from ' + angle + ' degrees back to 0 degrees\n' +
    '    servo_' + dropdown_pin + '.write(pos);\n' +
    '    delay(' + delayTime + '); // Slow or fast depending on the selection\n' +
    '  }\n' +
    '}\n';
  return code;

};


Blockly.Arduino['shake'] = function (block) {
  // var dropdown_pin = block.getFieldValue('PIN');
  // var delayTime = Blockly.Arduino.valueToCode(
  //   block, 'INTERVAL', Blockly.Arduino.ORDER_ATOMIC) || '5';
  // var angle = Blockly.Arduino.valueToCode(
  //   block, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC) || '90';
  var cycles = Blockly.Arduino.valueToCode(
    block, 'CYCLES', Blockly.Arduino.ORDER_ATOMIC) || '5'

  // set up servo
  Blockly.Arduino.includes_['includes_servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['var_servo' + dropdown_pin] = 'Servo servo_' + dropdown_pin + ';';
  Blockly.Arduino.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ');\n' + 'servo_' + dropdown_pin + '.write(90);' + 'delay(2000);';
  


  //in loop()
  var code = 'for (int c = 0; c < ' + cycles + '; c++) {\n' +
    '  for (int pos = 0; pos <=  30 ; pos++) { ' + 
    '    servo_' + dropdown_pin + '.write(pos);\n' +
    '    delay(3);\n' +
    '  }\n' +
    '  for (int pos = 30;pos >= 0; pos--) { \n' +
    '    servo_' + dropdown_pin + '.write(pos);\n' +
    '    delay(3);\n' +
    '  }\n' +
    
    '}\n' +
    'servo_' + dropdown_pin +'.detach();\n' 
  return code;

};

