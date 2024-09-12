## How to add Categories and Blocks in this project: 
  A nice example from the original repo _\build\blocks\groove_ or existing categories _\build\blocks\Customization_ etc

1. **Folder Setup for Categories**
  To add a new category, follow these steps:
    1) Create a Category Folder	Navigate to \build\blocks\ and create a folder named after your desired category. This category name will appear in the menu (e.g., “Customization” or “Preset Behaviors”).

    2) Inside the newly created category folder, include the following files:
       * _blocks.js_ – Defines the blocks.
       * _generator_arduino.js_ – Generates Arduino code for the blocks.
       * _blocks_config.json_ – Stores block configurations.
         
2. **To define a block:**
      Go to \build\blocks<category>\blocks.js
    * Reference the Google Blockly tutorials on block definition for guidance.
      * [https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks](https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks) 
    * For help creating blocks visually, use the Blockly Block Factory.
      * [https://technologiescollege.github.io/Blockly-at-rduino/tools/factory/block_factory.html?lang=](https://technologiescollege.github.io/Blockly-at-rduino/tools/factory/block_factory.html?lang=) 
    * Changing color:
      * [https://developers.google.com/blockly/guides/create-custom-blocks/block-colour?_gl=1*jezlx1*_up*MQ..*_ga*MTE3NjI3MTcxNC4xNzI2](https://developers.google.com/blockly/guides/create-custom-blocks/block-colour?_gl=1*jezlx1*_up*MQ..*_ga*MTE3NjI3MTcxNC4xNzI2MDM0MTQz*_ga_R5G2Y6GLVC*MTcyNjAzNDE0Mi4xLjEuMTcyNjAzNDE0Mi4wLjAuMA) 
    * Changing texts on the block
      * need to change parameters in `.appendField()`
    * Example:
  
    ```
        Blockly.Blocks["block_123"] = {
          init: function() {
            // Block definitions go here
          }
        };
    ```
    
3. **Define Code generator:**
  To generate Arduino code for your block:
  Go to \build\blocks<category>\generator_arduino.js.
  Example: code generation in for block in example 2d 
   ```
          Blockly.Arduino[“block_123”]= function (block){
           // add your code converter logic here 
          }
   ```
   
4. **Updating the Toolbox:**

    To add your blocks to the toolbox, update the following files with the necessary XML configurations:
      * _\build\blocks<category>\blocks_config.json_
      * _\build\blocks\blocks_data.json_
      * _\Ardublockly\ardublockly_toolbox.js (as an XML string)._
        
      > :bulb: **Tip:** If a block definition already exists in another category, you only need to reference it in the toolbox.
      
5. **Applying Changes**

    For your changes to take effect, perform a hard refresh:
    * Open the browser console with `F12`.
    * Right-click the refresh button.
    * Select "Empty Cache and Hard Reload."

## Arduino APIs 

Sample Arduino Sketch is in **\Hardware\MultiControWithDelay.ino**

### Data Structure ###
  *  A `Target` struct stores the configuration a the atomic behavior. There are two kinds of configuration
      * Angle, duration when useSpeed = false
      * Angle, speed when useSpeed = true
        
  * A `Sequence` is a sequence of one or more atomic behavior that defined by corresponding  Target struct
    
  * `ServoController` Class
    *  Manages behavior and states for each servo. Initialized with arrays of `Target`, `Sequence`, and `Servo` instances and other state variables
         * **Main Methods:**
            * `Attach()`
            * `Update()`
            * `StartNewSequence()`
            * `SetRepeats()`
            * `ResetSequence()`
            * `setAngleDuration()`
            * `setAngleSpeed()`
            * `addDelayDuration()`
        * **Private Helper:**
            * `addTargetToSequence()`
              
        > :bulb: **Tip:** One ServoController is initialized for _EACH servo._
        
### Wrapper Block (Purple Block) ###

![alt_text](image/purple_block.jpg)

  * This block initializes Target, Sequence, ServoControllers, and Arduino’s setup() and loop() methods. It also instantiates three ServoControllers:

    * Flexibit 1: servo_9 (pin 9)
    * Flexibit 2: servo_10 (pin 10)
    * Flexibit 3: servo_11 (pin 11)

  * The conversion logic for this block is in: _\build\blocks\Customization\generator_arduino.js (under Blockly.Arduino['multi_servo_control'])_
  * Note: The block replaces __SERVO_PIN__ with the actual pin number when a behavior block is placed in a Flexibit slot.

### **Atomic Behaviors**

These helper functions can be encapsulate in servo behavior blocks in _generator_arduino.js_ :

1. `.setAngleDuration(int angle, int duration)
`Move the servo to a specified angle over a duration (ms).
2. `.setAngleSpeed(int angle, int speed)
`Move the servo to a specified angle at a speed (1 = slow, 10 = fast).
3. `.StartNewSequence()
`Start a behavior sequence (must be called before `setAngleDuration` or `setAngleSpeed`).
4. `.SetRepeats(int repeatTime)
`Set how many times the sequence will repeat (called after `setAngleDuration` or `setAngleSpeed`).
5. `.addDelayDuration(int duration)
`Stop the servo for a specified duration (ms).

![alt_text](image/behavior_code_exp.jpg)

**Note:** The servo reference inside the block must use the pattern `servo__SERVO_PIN__` to allow the purple wrapper block to replace `__SERVO_PIN__` with the correct pin number.

    
## Credit
This project has been modified from https://github.com/carlosperate/ardublockly.

Blockly original source is Copyright of Google Inc. [https://developers.google.com/blockly/][1]. A list of changes to the Blockly fork can be found in the [Blockly subdirectory README][17] file.


## License
Copyright (c) 2016 carlosperate https://github.com/carlosperate/

Unless stated otherwise, the source code of this projects is
licensed under the Apache License, Version 2.0 (the "License");
you may not use any of the licensed files within this project
except in compliance with the License.

The full document can be found in the [LICENSE][9] file.

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

