// credit to:  https://www.digikey.ca/en/maker/projects/multi-tasking-the-arduino-part-1/b23d9e65c4d342389d20cbd542c46a28#:~:text=The%20Sweeper%20class%20below%20encapsulates%20the%20sweep%20action%2C%20but%20uses%20the%20millis()%20function%20for%20timing%2C%20much%20like%20the%20Flasher%20class%20does%20for%20the%20LEDs. Modified to fit current Flexibit controll
#ifndef HELPHIKER_SWEEPER
#define HELPHIKER_SWEEPER

#include <Arduino.h>
#include <Servo.h> 

class Sweeper
{
  Servo servo;              // the servo
  int pos;              // current servo position
  int targetPos;
  int increment;        // small step servo moves each time (related to speed)
  int  updateInterval;      // interval between each movement (step)
  unsigned long lastUpdate; // last update of position
  int currentAngle;

public:
  Sweeper(int interval)
  {
    pos = 0;
    targetPos = 0;
    increment = 1;
    updateInterval = interval;
    lastUpdate = 0;
  }

  void Attach(int pin)
  {
    servo.attach(pin);
  }
  
  void Detach()
  {
    servo.detach();
  }
  
  // update by "incremnet" dregree (as one step)
  void Update()
  {
    if((millis() - lastUpdate) > updateInterval)  
    // check if updateInterval amount of tis has passed since last movement
    {
      lastUpdate = millis(); // update time to current because servo begin to move
      pos += increment; // move servo by increament degrees (increament could < 0)

      // prevent overshoot
      if ((increment > 0 && pos > targetPos) || (increment < 0 && pos < targetPos))
      {
        pos = targetPos; // Set pos to targetPos if we would overshoot
      }
      servo.write(pos);
      Serial.println(pos);
      
    }
  }

  void SetTarget(int newTargetPos, int speed)
  {
    targetPos = newTargetPos;
    increment = (targetPos > pos) ? speed : -speed;
  }
};

#endif