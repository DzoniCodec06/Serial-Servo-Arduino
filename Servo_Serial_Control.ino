#include <Servo.h>

Servo serv1;
Servo serv2;

String command;

void setup() {
  Serial.begin(9600);
  serv1.attach(10);
  serv2.attach(11);

  serv1.write(0);
  serv2.write(0);
}

void loop() {
  if (Serial.available() > 1) {
    command = Serial.readStringUntil('\n');
    if (command.substring(0, 1) == "1") {
      //Serial.println("Servo 1: ");
      delay(15);
      //Serial.println(command.substring(3));
      serv1.write(command.substring(3).toInt());
    } else if (command.substring(0, 1) == "2") {
      //Serial.println("Servo 2: ");
      delay(15);
      //Serial.println(command.substring(3));
      serv2.write(command.substring(3).toInt());
    }
    delay(5);
  }
}
