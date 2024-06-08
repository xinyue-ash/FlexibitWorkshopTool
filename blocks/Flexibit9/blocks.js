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

