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


Blockly.Blocks["breathing_spd_angle"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Preset Behavior: Breathe")
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

    this.setPreviousStatement(true, 'Behavior');
    this.setNextStatement(true, 'Behavior');
    // this.setTooltip();
    // this.setHelpUrl();
  },
};

Blockly.Blocks["breathing_spd_angle_cycle"] = {
  init: function () {
    // .appendField(new Blockly.FieldDropdown(pinDropdownOptions), "PIN");
    this.appendDummyInput()
      .appendField("Preset Behavior: Breathe")
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

    this.setPreviousStatement(true, 'Behavior');
    this.setNextStatement(true, 'Behavior');
    // this.setTooltip();
    // this.setHelpUrl();
  },
};

Blockly.Blocks["breathing_interval_angle_cycle"] = {
  init: function () {
    this.appendDummyInput().appendField("Preset Behavior: Breathe");

    this.setInputsInline(false);

    this.appendDummyInput().appendField(" ");

    this.appendValueInput("INTERVAL")
      .appendField("Interval [slow (1) ~ fast (10)]: ")
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

    this.setPreviousStatement(true, 'Behavior'); // able to attech to a block before
    this.setNextStatement(true, 'Behavior'); // able to attech a block after
    // this.setTooltip();
    // this.setHelpUrl();
  },
};

Blockly.Blocks["shake"] = {
  init: function () {
    this.appendDummyInput().appendField("Preset Behavior: Shake");

    this.input;
    this.appendValueInput("CYCLES")
      .appendField("For")
      .setCheck(Blockly.Types.NUMBER.checkList)

      .setAlign(Blockly.ALIGN_RIGHT);

    this.appendDummyInput().appendField("times").setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true, 'Behavior'); // able to attech to a block before
    this.setNextStatement(true, 'Behavior'); // able to attech a block after
    // this.setTooltip();
    // this.setHelpUrl();
  },
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
      .appendField("Preset Behavior: Heartbeat");
    this.setInputsInline(false);

    this.appendValueInput("DURATION")
      .appendField("for")
      .setCheck(Blockly.Types.NUMBER.checkList);
    this.setInputsInline(true);
    this.appendDummyInput().appendField("times");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  },
};

// Blockly.Blocks['heartbeat_servo'] = {
//   init: function() {
//     this.appendDummyInput()
//         .appendField("mimic heartbeat with servo")
//         .appendField("BPM")
//         .appendField(new Blockly.FieldNumber(60, 1, 300), "BPM")
//         .appendField("duration (ms)")
//         .appendField(new Blockly.FieldNumber(30000, 1000, 60000), "DURATION");
//     this.setInputsInline(true);
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(230);
//     this.setTooltip("");
//     this.setHelpUrl("");
//   }
  
// };

