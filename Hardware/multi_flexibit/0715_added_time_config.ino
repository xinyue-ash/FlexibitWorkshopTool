#include <Servo.h>
#define MAX_SEQUENCES 10
#define QUEUE_SIZE 50

// target angle with speed or
struct Target
{
    int angle;
    int duration;  // Duration to reach the target angle
    int speed;     // millisec per degree step
    bool useSpeed; // Flag to indicate whether to use speed or duration
};

// sequence of target angle & speed/time
struct Sequence
{
    int front;          // start of the sequence in the queue
    int rear;           // end of the sequence in the queue
    int remainingSteps; // steps left to execute
    int maxRepeats;
    int totalSteps; // total steps in the sequence
};

class ServoController
{
    Servo servo;
    Target queue[QUEUE_SIZE];
    Sequence sequences[MAX_SEQUENCES];
    int currentSequenceIndex; // index of the current sequence being executed
    int sequenceCount;
    int repeatCount; // current repetition count for the current sequence
    unsigned long lastUpdate;
    unsigned long durationStartTime;
    int pos;

public:
    ServoController() : currentSequenceIndex(0), sequenceCount(0), repeatCount(0), lastUpdate(0), durationStartTime(0), pos(0)
    {
        for (int i = 0; i < MAX_SEQUENCES; i++)
        {
            sequences[i] = {0, 0, 0, 0, 0};
        }
    }

    void Attach(int pin)
    {
        servo.attach(pin);
        servo.write(0); // Initialize servo position
    }

    void Update()
    {
        if (currentSequenceIndex < sequenceCount && sequences[currentSequenceIndex].remainingSteps > 0)
        {
            Sequence &sequence = sequences[currentSequenceIndex];
            Target &currentTarget = queue[sequence.front];

            unsigned long currentMillis = millis();

            // if setting the speed, then checking time with speed (AKA mills/degree)
            if (currentTarget.useSpeed)
            {
                if (currentMillis - lastUpdate >= currentTarget.speed)
                {
                    // if time exceeded -> update to next degree
                    lastUpdate = currentMillis;
                    if (currentTarget.angle > pos)
                    {
                        pos++;
                    }
                    else if (currentTarget.angle < pos)
                    {
                        pos--;
                    }
                    servo.write(pos);

                    if (pos == currentTarget.angle)
                    {
                        sequence.front = (sequence.front + 1) % QUEUE_SIZE;
                        sequence.remainingSteps--;
                    }
                }
            }
            else
            {
                // Calculate the target position based on duration
                unsigned long elapsedTime = currentMillis - durationStartTime;

                if (elapsedTime >= currentTarget.duration)
                {
                    // if time exceeded -> go to next target struct
                    durationStartTime = currentMillis;
                    pos = currentTarget.angle;
                    servo.write(pos);
                    sequence.front = (sequence.front + 1) % QUEUE_SIZE;
                    sequence.remainingSteps--;
                }
                else
                {
                    // using fraction to record the program of angle
                    float curAngleFraction = (float)elapsedTime / currentTarget.duration;
                    int targetPos = pos + (currentTarget.angle - pos) * curAngleFraction;
                    servo.write(targetPos);
                }
            }

            // Comment out for now, for debuging
            // Serial.print("currentMillis: ");
            // Serial.print(currentMillis);
            // Serial.print(", pos: ");
            // Serial.print(pos);
            // Serial.print(", target angle: ");
            // Serial.print(currentTarget.angle);
            // Serial.print(", remainingSteps: ");
            // Serial.println(sequence.remainingSteps);

            if (sequence.remainingSteps == 0)
            {
                // Sequence completed
                repeatCount++;
                if (repeatCount < sequence.maxRepeats)
                {
                    ResetSequence(currentSequenceIndex); // repeat the sequence
                }
                else if (currentSequenceIndex < sequenceCount - 1)
                {
                    // increment to next sequence
                    currentSequenceIndex++;
                    repeatCount = 0;
                    ResetSequence(currentSequenceIndex);
                }
                else
                {
                    servo.detach();
                    Serial.print(millis()); // check if actual time used is lying
                }
            }
        }
    }

    // initial a new queue for sequence
    void StartNewSequence()
    {
        if (sequenceCount < MAX_SEQUENCES)
        {
            if (sequenceCount == 0)
            {
                sequences[sequenceCount].front = 0;
            }
            else
            {
                sequences[sequenceCount].front = sequences[sequenceCount - 1].rear + 1;
            }
            sequences[sequenceCount].rear = sequences[sequenceCount].front - 1; // Initialize rear to be one before front
            sequences[sequenceCount].remainingSteps = 0;
            sequences[sequenceCount].totalSteps = 0;
            sequenceCount++;
        }
    }

    // helper to set num of time a sequence repeat
    void SetRepeats(int repeats)
    {
        if (sequenceCount == 0)
            return;                            // if No sequence started
        int sequenceIndex = sequenceCount - 1; // Current sequence index
        if (sequenceIndex >= MAX_SEQUENCES)
            return;
        sequences[sequenceIndex].maxRepeats = repeats;
    }

    // repeat a SEQUENCE
    void ResetSequence(int sequenceIndex)
    {
        Sequence &sequence = sequences[sequenceIndex];
        sequence.front = (sequence.rear - sequence.totalSteps + QUEUE_SIZE + 1) % QUEUE_SIZE;
        sequence.remainingSteps = sequence.totalSteps;
        durationStartTime = millis(); // Reset duration start time for the new sequence
    }

    // set angle, and time move to that angle
    void setAngleDuration(int targetAngle, int duration)
    {
        addTargetToSequence(targetAngle, duration, 0, false);
    }

    // set angle and speed move to that angle
    void setAngleSpeed(int targetAngle, int userSpeed)
    {
        int mappedSpeed = map(userSpeed, 1, 10, 50, 5);
        addTargetToSequence(targetAngle, 0, mappedSpeed, true);
    }

    // cannot use pos
    // because pos is only updated when Update() is called in loop(),
    // however this function is called in setUp()
    // for a new sequence : rear is = front -1
    void addDelayDuration(int duration)
    {
        int sequenceIndex = sequenceCount - 1; // Current sequence index
        Sequence curSequence = sequences[sequenceIndex];
        // angle of last target or pos  (0) if rear is negative
        int lastPos = (curSequence.rear >= 0) ? queue[curSequence.rear].angle : pos;

        Serial.print(" lastPos: ");
        Serial.println(lastPos);
        addTargetToSequence(lastPos, duration, 0, false);
    }

    // helper function to add Target (angle , speed or duration )to the sequence
private:
    void addTargetToSequence(int targetAngle, int duration, int speed, bool useSpeed)
    {
        if (sequenceCount == 0)
            return;                            // No sequence started
        int sequenceIndex = sequenceCount - 1; // Current sequence index

        Sequence &sequence = sequences[sequenceIndex];

        sequence.rear = (sequence.rear + 1) % QUEUE_SIZE;                // Increment rear pointer
        queue[sequence.rear] = {targetAngle, duration, speed, useSpeed}; // Set angle, duration, and speed
        sequence.totalSteps++;
        sequence.remainingSteps = sequence.totalSteps; // Initialize remaining steps for the new sequence

        // Debug prints
        // Serial.print("Added Target Angle: ");
        // Serial.print(targetAngle);
        // if (useSpeed) {
        //   Serial.print(" Speed: ");
        //   Serial.println(speed);
        // } else {
        //   Serial.print(" Duration: ");
        //   Serial.println(duration);
        // }
    }
};

ServoController servo_9;
ServoController servo_10;
ServoController servo_11;

void setup()
{
    Serial.begin(9600);
    servo_9.Attach(9);
    servo_10.Attach(10);
    servo_11.Attach(11);

    servo_10.StartNewSequence();
    servo_10.setAngleDuration(60, 1000); // delay between target
    servo_10.addDelayDuration(2000);
    servo_10.setAngleDuration(120, 1000);
    // servo_10.addDelayDuration(2000);
    servo_10.SetRepeats(5);

    servo_9.StartNewSequence();
    servo_9.setAngleDuration(60, 1000); // delay between target
    servo_9.addDelayDuration(2000);
    servo_9.setAngleDuration(120, 1000);
    // servo_9.addDelayDuration(2000);
    servo_9.SetRepeats(5);

    servo_11.StartNewSequence();
    servo_11.setAngleDuration(60, 1000); // delay between target
    servo_11.addDelayDuration(2000);
    servo_11.setAngleDuration(120, 1000);
    // servo_11.addDelayDuration(2000);
    servo_11.SetRepeats(5);

    // test time sync + delay
    // servo_11.StartNewSequence();
    // servo_11.setAngleDuration(170, 500);
    // servo_11.setAngleDuration(0, 500);
    // servo_11.setAngleDuration(170, 500);
    // servo_11.setAngleDuration(90, 500);
    // servo_11.SetRepeats(5);

    // servo_11.StartNewSequence();
    // servo_11.addDelayDuration(2000);
    // servo_11.SetRepeats(1);

    // servo_11.StartNewSequence();
    // servo_11.setAngleDuration(170, 500);
    // servo_11.setAngleDuration(0, 500);
    // servo_11.setAngleDuration(170, 500);
    // servo_11.setAngleDuration(90, 500);
    // servo_11.SetRepeats(5);

    // servo_10.StartNewSequence();
    // servo_10.setAngleDuration(170, 1000);
    // servo_10.setAngleDuration(0, 1000);
    // servo_10.SetRepeats(5);

    // servo_10.StartNewSequence();
    // servo_10.addDelayDuration(2000);
    // servo_10.SetRepeats(1);

    // servo_10.StartNewSequence();
    // servo_10.setAngleDuration(170, 1000);
    // servo_10.setAngleDuration(0, 1000);
    // servo_10.SetRepeats(5);

    // servo_9.StartNewSequence();
    // servo_9.setAngleDuration(170,5000);
    // servo_9.setAngleDuration(0,5000);
    // servo_9.SetRepeats(1);
    // servo_9.StartNewSequence();
    // servo_9.addDelayDuration(2000);
    // servo_9.SetRepeats(1);
    // servo_9.StartNewSequence();
    // servo_9.setAngleDuration(170,5000);
    // servo_9.setAngleDuration(0,5000);
    // servo_9.SetRepeats(1);

    // test time sync
    // servo_11.StartNewSequence();
    // servo_11.setAngleDuration(170, 500);
    // servo_11.setAngleDuration(0, 500);
    // servo_11.setAngleDuration(170, 500);
    // servo_11.setAngleDuration(90, 500);
    // servo_11.SetRepeats(25);

    // servo_10.StartNewSequence();
    // servo_10.setAngleDuration(170, 1000);
    // servo_10.setAngleDuration(0, 1000);
    // servo_10.SetRepeats(25);

    // servo_9.StartNewSequence();
    // servo_9.setAngleDuration(170,5000);
    // servo_9.setAngleDuration(0,5000);
    // servo_9.SetRepeats(5);

    // // test delay between sequence
    // servo_9.StartNewSequence();
    // servo_9.addDelayDuration(2000);
    // servo_9.SetRepeats(1);

    // // test delay between target
    // servo_9.StartNewSequence();
    // servo_9.setAngleDuration(60, 1000);
    // servo_9.addDelayDuration(2000);
    // servo_9.setAngleDuration(120, 1000);
    // servo_9.addDelayDuration(2000);
    // servo_9.SetRepeats(5);

    // // test setAngleSpeed
    // servo_9.StartNewSequence();
    // servo_9.setAngleSpeed(60, 1);
    // servo_9.setAngleSpeed(180, 10);
    // servo_9.SetRepeats(5);

    // // test delay between sequence
    // servo_9.StartNewSequence();
    // servo_9.addDelayDuration(1000);
    // servo_9.SetRepeats(1);

    // // test mix
    // servo_9.StartNewSequence();
    // servo_9.setAngleSpeed(60, 1);
    // servo_9.setAngleDuration(180, 1000);
    // servo_9.addDelayDuration(1000);
    // servo_9.setAngleSpeed(30, 7);

    // servo_9.SetRepeats(5);
}

void loop()
{

    servo_9.Update();
    servo_10.Update();
    servo_11.Update();
}