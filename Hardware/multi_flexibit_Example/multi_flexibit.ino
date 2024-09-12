#include "Sweeper.h"

bool bWavingArms = false;
int c_iServoUpdateInterval = 200; // in ms

Sweeper servo1(c_iServoUpdateInterval, 2, 20,0,180);
Sweeper servo2(c_iServoUpdateInterval, 2, 20,0,180);
Sweeper servo3(c_iServoUpdateInterval, 2, 20,0,180);
Sweeper servo4(c_iServoUpdateInterval, 2, 20,0,180);
Sweeper servo5(c_iServoUpdateInterval, 2, 20,0,180);
Sweeper servo6(c_iServoUpdateInterval, 2, 20,0,180);

void setup() {
  // put your setup code here, to run once:
  servo1.Attach(3);
  servo2.Attach(5);
  servo3.Attach(6);
  servo4.Attach(9);
  servo5.Attach(10);
  servo6.Attach(11);
}

void loop() {
  // put your main code here, to run repeatedly:
  servo1.Update();
  servo2.Update();
  servo3.Update();
  servo4.Update();
  servo5.Update();
  servo6.Update();
}
