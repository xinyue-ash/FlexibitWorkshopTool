/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Ardublockly JavaScript for the Blockly resources and bindings.
 * for blocks that controls flexibit that conneted to board pin 9
 */

goog.require("Blockly.Constants.servo");
goog.require("Blockly.Blocks");
goog.require("Blockly.Types");
goog.require("Blockly");

Blockly.Blocks["set_servo_angle_speed"] = {
  init: function () {
    this.appendValueInput("ANGLE")
      .setCheck(Blockly.Types.NUMBER.checkList)
      .appendField("Move to angle (0-180):");
    this.appendValueInput("SPEED")
      .setCheck(Blockly.Types.NUMBER.checkList)
      .appendField("with speed (slow 1 - fast 10):");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(600);
    this.setTooltip(
      "Create a behavior by specifying the target angle and speed of the servo."
    );
    this.setHelpUrl("");
  },
  onchange: function (event) {
    if (!this.workspace) {
      // Block has been deleted.
      return;
    }

    const angleBlock = this.getInputTargetBlock("ANGLE");
    const speedBlock = this.getInputTargetBlock("SPEED");

    if (angleBlock && angleBlock.type === "math_number") {
      const angleValue = parseFloat(angleBlock.getFieldValue("NUM"));
      if (angleValue < 0 || angleValue > 180 || isNaN(angleValue)) {
        this.setWarningText("Angle must be between 0 and 180 degrees.");
        this.setDisabled(true);
      } else {
        this.setWarningText(null);
        this.setDisabled(false);
      }
    }

    if (speedBlock && speedBlock.type === "math_number") {
      const speedValue = parseFloat(speedBlock.getFieldValue("NUM"));
      if (speedValue < 1 || speedValue > 10 || isNaN(speedValue)) {
        this.setWarningText("Speed must be 1 and 10.");
        this.setDisabled(true);
      } else {
        this.setWarningText(null);
        this.setDisabled(false);
      }
    }
  }
};

<<<<<<< Updated upstream:blocks/Customize-9/blocks.js
=======
Blockly.Blocks["start_sequence_repeat"] = {
  init: function () {
    this.appendValueInput("REPEATS")
      .setCheck(Blockly.Types.NUMBER.checkList)
      .appendField("Start new sequence, repeat for");

    this.appendStatementInput("DO").setCheck(null).appendField("do");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Create a sequence of behaviors that will repeat a specific number of times.");
    this.setHelpUrl("");
  },
  onchange: function (event) {
    if (!this.workspace) {
      // Block has been deleted.
      return;
    }

    const sequenceBlock = this.getInputTargetBlock("REPEATS");

    if (sequenceBlock && sequenceBlock.type === "math_number") {
      const numRepeats = parseFloat(sequenceBlock.getFieldValue("NUM"));
      if (numRepeats <= 0 || isNaN(numRepeats)) {
        this.setWarningText("Number must be greater than 0.");
        this.setDisabled(true);
      } else {
        this.setWarningText(null);
        this.setDisabled(false);
      }
    }
  }
};
>>>>>>> Stashed changes:build/blocks/Customization/blocks.js

Blockly.Blocks["multi_servo_control"] = {
  init: function () {
    this.appendDummyInput().appendField("Multi Servo Control");

    this.appendStatementInput("FB1").setCheck(null).appendField("Flexibit 1");

    this.appendStatementInput("FB2").setCheck(null).appendField("Flexibit 2");

    this.appendStatementInput("FB3").setCheck(null).appendField("Flexibit 3");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip(
      "Control multiple servos with separate blocks for each servo."
    );
    this.setHelpUrl("");
  },
};
<<<<<<< Updated upstream:blocks/Customize-9/blocks.js

=======
>>>>>>> Stashed changes:build/blocks/Customization/blocks.js
