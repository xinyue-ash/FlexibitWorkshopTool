/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Code generator for the test 2 blocks.
 */
'use strict';

goog.provide('Blockly.Arduino.presets');
goog.require('Blockly.Arduino.servo');

goog.require('Blockly.Arduino');




Blockly.Arduino['breathing_spd'] = function (block) {
  var dropdown_pin = block.getFieldValue('PIN');


  var speed = block.getFieldValue('SPEED');
  var apm = block.getFieldValue('AMP');
  var delayTime = (speed === 'SLOW') ? 20 : 5; // 20 milliseconds for slow, 5 milliseconds for fast
  var angle = (apm == 'DEEP') ? 170 : 90;
  Blockly.Arduino.includes_['includes_servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['var_servo' + dropdown_pin] = 'Servo servo_' + dropdown_pin + ';';
  Blockly.Arduino.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ');';

  var code = 'for (int pos = 0; pos <= ' + angle + '; pos++) { // goes from 0 degrees to ' + angle + 'degrees\n' +
    ' servo_' + dropdown_pin + '.write(pos);\n' +
    '  delay(' + delayTime + '); // Slow or fast depending on the selection\n' +
    '}\n' +
    'for (int pos = ' + angle + '; pos >= 0; pos--) { // goes from' + angle + 'degrees back to 0 degrees\n' +
    ' servo_' + dropdown_pin + '.write(pos);\n' +
    '  delay(' + delayTime + '); // Slow or fast depending on the selection\n' +
    '}\n';
  return code;

};

