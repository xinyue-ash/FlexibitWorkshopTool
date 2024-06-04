/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Ardublockly JavaScript for the Blockly resources and bindings.
 * for blocks that controls flexibit that conneted to board pin 9
 */

goog.provide("Blockly.Constants.servo");

goog.require("Blockly.Blocks");
goog.require("Blockly.Types");
goog.require("Blockly");

var servoMediaFolder = "./blocklyduino/blocks/servo/";

// var pinDropdownOptions = [
//   ["PIN 1", "1"], ["PIN 2", "2"], ["PIN 3", "3"], ["PIN 4", "4"], ["PIN 5", "5"],
//   ["PIN 6", "6"], ["PIN 7", "7"], ["PIN 8", "8"], ["PIN 9", "9"], ["PIN 10", "10"],
//   ["PIN 11", "11"], ["PIN 12", "12"], ["PIN 13", "13"],
//   ["PIN A0", "A0"], ["PIN A1", "A1"], ["PIN A2", "A2"],
//   ["PIN A3", "A3"], ["PIN A4", "A4"], ["PIN A5", "A5"]
// ];

Blockly.Blocks["breathing_spd_angle"] = {
  init: function () {
    this.appendDummyInput().appendField("Flexibit-9");
    // .appendField(new Blockly.FieldDropdown(pinDropdownOptions), "PIN");
    this.appendDummyInput()
      .appendField("Breathes")
      .appendField(
        new Blockly.FieldDropdown([
          ["slow", "SLOW"],
          ["fast", "FAST"],
        ]),
        "SPEED"
      );
    this.setInputsInline(false);
    this.appendDummyInput()
      .appendField("and")
      .appendField(
        new Blockly.FieldDropdown([
          ["deep", "DEEP"],
          ["shallow", "SHALLOW"],
        ]),
        "AMP"
      );
    this.setInputsInline(false);

    this.appendValueInput("DURATION")
      .appendField("For")
      .setCheck(Blockly.Types.NUMBER.checkList);
    this.setInputsInline(true);
    this.appendDummyInput().appendField("seconds");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    // this.setTooltip();
    // this.setHelpUrl();
  },
};

Blockly.Blocks["breathing_spd_angle_cycle"] = {
  init: function () {
    this.appendDummyInput().appendField("Flexibit-9");
    // .appendField(new Blockly.FieldDropdown(pinDropdownOptions), "PIN");
    this.appendDummyInput()
      .appendField("Breathes")
      .appendField(
        new Blockly.FieldDropdown([
          ["slow", "SLOW"],
          ["fast", "FAST"],
        ]),
        "SPEED"
      );
    this.setInputsInline(false);
    this.appendDummyInput()
      .appendField("and")
      .appendField(
        new Blockly.FieldDropdown([
          ["deep", "DEEP"],
          ["shallow", "SHALLOW"],
        ]),
        "AMP"
      );
    this.setInputsInline(false);

    this.appendValueInput("CYCLES")
      .appendField("For")
      .setCheck(Blockly.Types.NUMBER.checkList);
    this.setInputsInline(true);
    this.appendDummyInput().appendField("times");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    // this.setTooltip();
    // this.setHelpUrl();
  },
};

Blockly.Blocks["breathing_interval_angle_cycle"] = {
  init: function () {
    this.appendDummyInput().appendField("Flexibit-9 Breathing");

    this.setInputsInline(false);

    this.appendDummyInput().appendField(" ");

    this.appendValueInput("INTERVAL")
      .appendField("Interval [fast (5) ~ slow (120)]: ")
      .setCheck(Blockly.Types.NUMBER.checkList);

    this.appendValueInput("DEGREE")
      .appendField("shallow (1) ~ deep (180)")
      .setCheck(Blockly.Types.NUMBER.checkList);
    // this.setInputsInline(true);

    this.appendValueInput("CYCLES")
      .appendField("For")
      .setCheck(Blockly.Types.NUMBER.checkList)

      .setAlign(Blockly.ALIGN_RIGHT);

    this.appendDummyInput().appendField("times").setAlign(Blockly.ALIGN_RIGHT);

    this.setPreviousStatement(true, null); // able to attech to a block before
    this.setNextStatement(true, null); // able to attech a block after
    // this.setTooltip();
    // this.setHelpUrl();
  },
};

Blockly.Blocks["shake"] = {
  init: function () {
    this.appendDummyInput().appendField("Flexibit-9 Shake");

    this.input;
    this.appendValueInput("CYCLES")
      .appendField("For")
      .setCheck(Blockly.Types.NUMBER.checkList)

      .setAlign(Blockly.ALIGN_RIGHT);

    this.appendDummyInput().appendField("times").setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true, null); // able to attech to a block before
    this.setNextStatement(true, null); // able to attech a block after
    // this.setTooltip();
    // this.setHelpUrl();
  },
};

// Blockly.Blocks["asymmetric"] = {
//   init: function () {
//     this.appendDummyInput().appendField("Flexibit-9 asymmetric movement");

//     this.setInputsInline(false);

//     this.appendDummyInput().appendField(" ");

//     this.appendValueInput("INTERVAL")
//       .appendField("Interval [fast (5) ~ slow (120)]: ")
//       .setCheck(Blockly.Types.NUMBER.checkList)
//       .setAlign(Blockly.ALIGN_RIGHT);

//     this.appendValueInput("DEGREELR")
//       .appendField("left to right angle : from 0 to ")
//       .setCheck(Blockly.Types.NUMBER.checkList)
//       .setAlign(Blockly.ALIGN_RIGHT);
//     this.appendDummyInput()
//       .appendField("degrees (max 180)")
//       .setAlign(Blockly.ALIGN_RIGHT);

//     this.appendValueInput("DEGREERL")
//       .appendField("then move right to left for")
//       .setCheck(Blockly.Types.NUMBER.checkList)
//       .setAlign(Blockly.ALIGN_RIGHT);
//     this.appendDummyInput()
//       .appendField("degrees (max: your input for left to right)")
//       .setAlign(Blockly.ALIGN_RIGHT);
//     // this.setInputsInline(true);

//     this.appendValueInput("CYCLES")
//       .appendField("For")
//       .setCheck(Blockly.Types.NUMBER.checkList)

//       .setAlign(Blockly.ALIGN_RIGHT);

//     this.appendDummyInput().appendField("times").setAlign(Blockly.ALIGN_RIGHT);

//     this.setPreviousStatement(true, null); // able to attech to a block before
//     this.setNextStatement(true, null); // able to attech a block after
//     // this.setTooltip();
//     // this.setHelpUrl();
//   },
// };

Blockly.Blocks['asymmetric'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Asymmetric Servo Movement");

    this.appendValueInput("INTERVAL")
      .appendField("Speed (fast 1 - slow 10): ")
      .setCheck(Blockly.Types.NUMBER.checkList)
      .setAlign(Blockly.ALIGN_RIGHT);
    this.setTooltip("Choose a speed level from 1 (fast) to 10 (slow).");

    this.appendValueInput("START_LR")
      .appendField("Start angle left to right (0-180):")
      .setCheck(Blockly.Types.NUMBER.checkList)
      .setAlign(Blockly.ALIGN_RIGHT);
    this.setTooltip("Set the start angle for left to right movement.");

    this.appendValueInput("END_LR")
      .appendField("End angle left to right (0-180):")
      .setCheck(Blockly.Types.NUMBER.checkList)
      .setAlign(Blockly.ALIGN_RIGHT)
    this.setTooltip("Set the end angle for left to right movement.");

    this.appendValueInput("START_RL")
      .appendField("Start angle right to left (0-180):")
      .setCheck(Blockly.Types.NUMBER.checkList)
      .setAlign(Blockly.ALIGN_RIGHT)
    this.setTooltip("Set the start angle for right to left movement.");

    this.appendValueInput("END_RL")
      .appendField("End angle right to left (0-180):")
      .setCheck(Blockly.Types.NUMBER.checkList)
      .setAlign(Blockly.ALIGN_RIGHT);
    this.setTooltip("Set the end angle for right to left movement.");

    this.appendValueInput("CYCLES")
      .appendField("Number of cycles:")
      .setCheck(Blockly.Types.NUMBER.checkList)
      .setAlign(Blockly.ALIGN_RIGHT);
    this
      .setTooltip("Number of times to repeat the movement.");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Configures the servo for asymmetric movement.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks["heartbeat"] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        ["Slow", "Slow"],
        ["Fast", "Fast"],
      ]),
      "heartrate"
    )
    .appendField("heartbeat");
    

    this.setInputsInline(false);

    this.appendValueInput("DURATION")
      .appendField("for")
      .setCheck(Blockly.Types.NUMBER.checkList);
    this.setInputsInline(true);
    this.appendDummyInput().appendField("seconds");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  },
};

Blockly.Blocks['heartbeat_servo'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("mimic heartbeat with servo")
        .appendField("pin#")
        .appendField(new Blockly.FieldNumber(9, 0, 13), "PIN")
        .appendField("BPM")
        .appendField(new Blockly.FieldNumber(60, 1, 300), "BPM")
        .appendField("duration (ms)")
        .appendField(new Blockly.FieldNumber(30000, 1000, 60000), "DURATION");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
  
};

