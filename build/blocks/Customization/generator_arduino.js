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

var setUpServoControlClass = `
#include <Servo.h>
#define MAX_SEQUENCES 10
#define QUEUE_SIZE 100

struct Target {
  int angle;
  int speed; // updateInterval
};

struct Sequence {
  int front; // start of the sequence in the queue
  int rear; // end of the sequence in the queue
  int remainingSteps; // steps left to execute
  int maxRepeats;
  int totalSteps; // total steps in the sequence
};

class ServoController {
  Servo servo;
  int pos;
  unsigned long lastUpdate;
  Target queue[QUEUE_SIZE];
  Sequence sequences[MAX_SEQUENCES];
  int currentSequenceIndex; // index of the current sequence being executed
  int sequenceCount;
  int repeatCount; // current repetition count for the current sequence

public:
  ServoController() : pos(0), lastUpdate(0), currentSequenceIndex(0), sequenceCount(0), repeatCount(0) {
    for (int i = 0; i < MAX_SEQUENCES; i++) {
      sequences[i] = {0, 0, 0, 0, 0};
    }
  }
  void Attach(int pin) {
    servo.attach(pin);
    pos = 0;
    servo.write(pos);
  }
  void Update() {
    if (currentSequenceIndex < sequenceCount && sequences[currentSequenceIndex].remainingSteps > 0) {
      Sequence& sequence = sequences[currentSequenceIndex];
      Target& currentTarget = queue[sequence.front];

      if ((millis() - lastUpdate) >= currentTarget.speed) {
        lastUpdate = millis();
        if (currentTarget.angle != pos) {
          if (currentTarget.angle > pos) {
            pos++;
          } else {
            pos--;
          }
          servo.write(pos);
        } else {
          // Move to the next angle/speed in the sequence
          sequence.front = (sequence.front + 1) % QUEUE_SIZE; // Wrap around the front pointer
          sequence.remainingSteps--;
          if (sequence.remainingSteps == 0) { // Sequence completed
            repeatCount++;
            if (repeatCount < sequence.maxRepeats) {
              ResetSequence(currentSequenceIndex); // repeat the sequence
            } else if (currentSequenceIndex < sequenceCount - 1) {
              currentSequenceIndex++; // move to the next sequence
              repeatCount = 0; // reset repeat count for the new sequence
              ResetSequence(currentSequenceIndex); // initialize the next sequence
            } else {
              Serial.println("All sequences completed.");
              /// not sure of detach is needed
            }
          }
        }
      }
    }
  }
  void StartNewSequence() {
    if (sequenceCount < MAX_SEQUENCES) {
      Serial.print("Starting new sequence: ");
      Serial.println(sequenceCount);
      if (sequenceCount == 0) {
        sequences[sequenceCount].front = 0;
      } else {
        sequences[sequenceCount].front = sequences[sequenceCount - 1].rear + 1;
      }
      sequences[sequenceCount].rear = sequences[sequenceCount].front - 1; // Initialize rear to be one before front
      sequences[sequenceCount].remainingSteps = 0;
      sequences[sequenceCount].totalSteps = 0;
      sequenceCount++;
    }
  }

  void setAngleSpeed(int angle, int userSpeed) {
    if (sequenceCount == 0) return; // No sequence started
    int sequenceIndex = sequenceCount - 1; // Current sequence index
    if (sequenceIndex >= MAX_SEQUENCES || sequences[sequenceIndex].rear >= QUEUE_SIZE - 1) return;

    int speed = map(userSpeed, 1, 10, 50, 5); // map user speed 1-10 to 500ms to 5ms
    Sequence& sequence = sequences[sequenceIndex];
    sequence.rear = (sequence.rear + 1) % QUEUE_SIZE; // Increment rear pointer
    queue[sequence.rear] = {angle, speed};
    sequence.totalSteps++;
    sequence.remainingSteps = sequence.totalSteps; // Initialize remaining steps for the new sequence

  }

  void SetRepeats(int repeats) {
    if (sequenceCount == 0) return; // No sequence started
    int sequenceIndex = sequenceCount - 1; // Current sequence index
    if (sequenceIndex >= MAX_SEQUENCES) return;
    sequences[sequenceIndex].maxRepeats = repeats;
  }

  void ResetSequence(int sequenceIndex) {
    Sequence& sequence = sequences[sequenceIndex];
    sequence.front = (sequence.rear - sequence.totalSteps + QUEUE_SIZE + 1) % QUEUE_SIZE;
    sequence.remainingSteps = sequence.totalSteps;
  }
};
`;

// angle + speed block
Blockly.Arduino["set_servo_angle_speed"] = function (block) {

  var angle = Blockly.Arduino.valueToCode(block, 'ANGLE', Blockly.Arduino.ORDER_ATOMIC);
  var speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC);

  var code = 'servo___SERVO_PIN__.setAngleSpeed(' + angle + ', ' + speed + '); \n';
  return code;
};


Blockly.Arduino['start_sequence_repeat'] = function (block) {
  var number_repeats = Blockly.Arduino.valueToCode(block, 'REPEATS',Blockly.Arduino.ORDER_ATOMIC);
  var statements_do = Blockly.Arduino.statementToCode(block, 'DO');
  var code = 'servo___SERVO_PIN__.StartNewSequence();\n';
  code += statements_do;

  code += '   servo___SERVO_PIN__.SetRepeats(' + number_repeats + ');\n';
  return code;
};



// wrapper for multiple servo controll
Blockly.Arduino['multi_servo_control'] = function (block) {
  var statements_flexibit1 = Blockly.Arduino.statementToCode(block, 'FB1');
  var statements_flexibit2 = Blockly.Arduino.statementToCode(block, 'FB2');
  var statements_flexibit3 = Blockly.Arduino.statementToCode(block, 'FB3');

  Blockly.Arduino.definitions_['setUpServoControlClass'] = setUpServoControlClass;

  Blockly.Arduino.definitions_['servo_9'] = 'ServoController servo_9;';
  Blockly.Arduino.definitions_['servo_10'] = 'ServoController servo_10;';
  Blockly.Arduino.definitions_['servo_11'] = 'ServoController servo_11;';

  Blockly.Arduino.setups_['setup_servo_9'] = 'servo_9.Attach(9);';
  Blockly.Arduino.setups_['setup_servo_10'] = 'servo_10.Attach(10);';
  Blockly.Arduino.setups_['setup_servo_11'] = 'servo_11.Attach(11);';

  Blockly.Arduino.setups_['sevo_9_behabior'] = statements_flexibit1.replace(/__SERVO_PIN__/g, '9');
  Blockly.Arduino.setups_['sevo_10_behabior'] = statements_flexibit2.replace(/__SERVO_PIN__/g, '10');
  Blockly.Arduino.setups_['sevo_11_behabior'] = statements_flexibit3.replace(/__SERVO_PIN__/g, '11');
  // need to change into only the block that is attached can be genreated by update
  var code = `
    servo_9.Update();
    servo_10.Update();
    servo_11.Update();
  `;
  return code;
};












