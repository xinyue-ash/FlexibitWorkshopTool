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
    this.setTooltip("Breathe for a specified number of seconds.");
    // this.setHelpUrl();
  },

  onchange: function (event) {
    if (!this.workspace) {
      // Block has been deleted.
      return;
    }

    const breathingDurationBlock = this.getInputTargetBlock("DURATION");

    if (breathingDurationBlock && breathingDurationBlock.type === "math_number") {
      const duration = parseFloat(breathingDurationBlock.getFieldValue("NUM"));
      if (duration <= 0 || isNaN(duration)) {
        this.setWarningText("Number must be greater than 0.");
        this.setDisabled(true);
      } else {
        this.setWarningText(null);
        this.setDisabled(false);
      }
    }
  }
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
    this.setTooltip("Breathe a specified number of times.");
    // this.setHelpUrl();
  },

  onchange: function (event) {
    if (!this.workspace) {
      // Block has been deleted.
      return;
    }

    const breathingCyclesBlock = this.getInputTargetBlock("CYCLES");

    if (breathingCyclesBlock && breathingCyclesBlock.type === "math_number") {
      const numRepeats = parseFloat(breathingCyclesBlock.getFieldValue("NUM"));
      if (numRepeats < 1 || isNaN(numRepeats)) {
        this.setWarningText("Number must be greater than 0.");
        this.setDisabled(true);
      } else {
        this.setWarningText(null);
        this.setDisabled(false);
      }
    }
  }
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
    this.setTooltip("Create a breathing motion with a specified interval, degree, and number of cycles.");
    // this.setHelpUrl();
  },

  onchange: function (event) {
    if (!this.workspace) {
      // Block has been deleted.
      return;
    }

    const customBreathingInterval = this.getInputTargetBlock("INTERVAL");
    const customBreathingDepth = this.getInputTargetBlock("DEGREE");
    const customBreathingCycle = this.getInputTargetBlock("CYCLES");

    if (customBreathingInterval && customBreathingInterval.type === "math_number") {
      const numIntervals = parseFloat(customBreathingInterval.getFieldValue("NUM"));
      if (numIntervals < 1 || numIntervals > 10 || isNaN(numIntervals)) {
        this.setWarningText("Number must be between 1 and 10.");
        this.setDisabled(true);
      } else {
        this.setWarningText(null);
        this.setDisabled(false);
      }
    }

    if (customBreathingDepth && customBreathingDepth.type === "math_number") {
      const depth = parseFloat(customBreathingDepth.getFieldValue("NUM"));
      if (depth < 0 || depth > 180 || isNaN(depth)) {
        this.setWarningText("Depth must be between 0 and 180 degrees.");
        this.setDisabled(true);
      } else {
        this.setWarningText(null);
        this.setDisabled(false);
      }
    }

    if (customBreathingCycle && customBreathingCycle.type === "math_number") {
      const numCycles = parseFloat(customBreathingCycle.getFieldValue("NUM"));
      if (numCycles < 1 || isNaN(numCycles)) {
        this.setWarningText("Number must be greater than 0.");
        this.setDisabled(true);
      } else {
        this.setWarningText(null);
        this.setDisabled(false);
      }
    }
  }
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
    this.setTooltip("Shake for a specified number of times.");
    // this.setHelpUrl();
  },

  onchange: function (event) {
    if (!this.workspace) {
      // Block has been deleted.
      return;
    }

    const shakeBlock = this.getInputTargetBlock("CYCLES");

    if (shakeBlock && shakeBlock.type === "math_number") {
      const numCycles = parseFloat(shakeBlock.getFieldValue("NUM"));
      if (numCycles < 1 || isNaN(numCycles)) {
        this.setWarningText("Number must be greater than 0.");
        this.setDisabled(true);
      } else {
        this.setWarningText(null);
        this.setDisabled(false);
      }
    }
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
    this.setTooltip("Heartbeat for a specified number of times.");
  },

  onchange: function (event) {
    if (!this.workspace) {
      // Block has been deleted.
      return;
    }

    const heartbeatBlock = this.getInputTargetBlock("DURATION");

    if (heartbeatBlock && heartbeatBlock.type === "math_number") {
      const duration = parseFloat(heartbeatBlock.getFieldValue("NUM"));
      if (duration < 1 || isNaN(duration)) {
        this.setWarningText("Duration must be greater than 0.");
        this.setDisabled(true);
      } else {
        this.setWarningText(null);
        this.setDisabled(false);
      }
    }
  }
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

