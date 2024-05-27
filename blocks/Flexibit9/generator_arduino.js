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

Blockly.Arduino['breathing_spd'] = function (block) {
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

Blockly.Arduino['time_delay'] = function(block) {
  var delayTime = Blockly.Arduino.valueToCode(
      block, 'DELAY_TIME_MILI', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'delay(' + delayTime + ');\n';
  return code;
};

Blockly.Arduino['infinite_loop'] = function(block) {
  return 'while(true);\n';
};