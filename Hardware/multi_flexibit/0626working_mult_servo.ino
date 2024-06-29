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
          // Serial.print("Remaining steps: ");
          // Serial.println(sequence.remainingSteps);
          // Serial.print("For sequence ");
          // Serial.println(currentSequenceIndex);

          if (sequence.remainingSteps == 0) { // Sequence completed
            // Serial.print("Sequence ");
            // Serial.print(currentSequenceIndex);
            // Serial.println(" completed.");
            repeatCount++;
            if (repeatCount < sequence.maxRepeats) {
              // Serial.print("Repeating sequence ");
              // Serial.println(currentSequenceIndex);
              ResetSequence(currentSequenceIndex); // repeat the sequence
            } else if (currentSequenceIndex < sequenceCount - 1) {
              currentSequenceIndex++; // move to the next sequence
              repeatCount = 0; // reset repeat count for the new sequence
              // Serial.print("Moving to next sequence: ");
              // Serial.println(currentSequenceIndex);
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

  void setAngleSpeed(int angle, int speed) {
    if (sequenceCount == 0) return; // No sequence started
    int sequenceIndex = sequenceCount - 1; // Current sequence index
    if (sequenceIndex >= MAX_SEQUENCES || sequences[sequenceIndex].rear >= QUEUE_SIZE - 1) return;

    Sequence& sequence = sequences[sequenceIndex];
    sequence.rear = (sequence.rear + 1) % QUEUE_SIZE; // Increment rear pointer
    queue[sequence.rear] = {angle, speed};
    sequence.totalSteps++;
    sequence.remainingSteps = sequence.totalSteps; // Initialize remaining steps for the new sequence

    // Serial.print("Added angle: ");
    // Serial.print(angle);
    // Serial.print(" speed: ");
    // Serial.print(speed);
    // Serial.print(" to sequence ");
    // Serial.println(sequenceIndex);
  }

  void SetRepeats(int repeats) {
    if (sequenceCount == 0) return; // No sequence started
    int sequenceIndex = sequenceCount - 1; // Current sequence index
    if (sequenceIndex >= MAX_SEQUENCES) return;
    sequences[sequenceIndex].maxRepeats = repeats;

    // Serial.print("Set repeats: ");
    // Serial.print(repeats);
    // Serial.print(" for sequence ");
    // Serial.println(sequenceIndex);
  }

  void ResetSequence(int sequenceIndex) {
    Sequence& sequence = sequences[sequenceIndex];
    sequence.front = (sequence.rear - sequence.totalSteps + QUEUE_SIZE + 1) % QUEUE_SIZE;
    sequence.remainingSteps = sequence.totalSteps;

    // Serial.print("Resetting sequence ");
    // Serial.print(sequenceIndex);
    // Serial.println(" for repeat or initialization.");
  }
};

ServoController servo2;
ServoController servo3;

void setup() {
  Serial.begin(9600);
  Serial.println("millisServoV2");

  // Attach servos to their pins
  // servo2.Attach(9);
  servo3.Attach(9);

  // Shake sequence for servo3
  servo3.StartNewSequence();
  servo3.setAngleSpeed(0, 5);   // Move to 0 degrees with speed 30
  servo3.setAngleSpeed(50, 5); // Move to 50 degrees with speed 30
  servo3.SetRepeats(5);         // Perform the sequence 10 times

  // Breathe sequence for servo3
  servo3.StartNewSequence();
  servo3.setAngleSpeed(0, 30);   // Move to 0 degrees with speed 30
  servo3.setAngleSpeed(50, 10);  // Move to 50 degrees with speed 10
  servo3.setAngleSpeed(180, 30); // Move to 180 degrees with speed 30
  servo3.setAngleSpeed(50, 10);  // Move to 50 degrees with speed 10
  servo3.SetRepeats(3);          // Perform the sequence 1 time

  servo3.StartNewSequence();
  servo3.setAngleSpeed(90, 10);   // Move to 0 degrees with speed 30
  servo3.setAngleSpeed(100, 10);  // Move to 50 degrees with speed 10
  servo3.setAngleSpeed(90, 10); // Move to 180 degrees with speed 30
  servo3.setAngleSpeed(100, 10);  // Move to 50 degrees with speed 10
  servo3.SetRepeats(3);          // Perform the sequence 1 time
}

void loop() {
  // servo2.Update();
  servo3.Update();
}
