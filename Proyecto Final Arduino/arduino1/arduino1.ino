#include <SoftwareSerial.h>

SoftwareSerial serial (10,11);
char value;//variable to receive data from the serial port
int pin = 8; //LED -> change to the actual output for the lightbulb

void setup() {
  Serial.begin(57600);
  pinMode(pin, OUTPUT); // pin 48 (on-board LED) as OUTPUT
  while(!Serial){
    //wait for serial to connect
  }
  // set the data rate for the SoftwareSerial port
  serial.begin(4800);
}

void loop() {
  if(serial.available()){
    value = serial.read();
  }
  checkValue(value);
  delay(100);
}

/* ON/OFF code
 * case 0: //bulb1=OFF bulb2=OFF
 * case 1: //bulb1=ON bulb2=OFF
 * case 2: //bulb1=OFF bulb2=ON
 * case 3: //bulb1=ON bulb2=ON
*/
void checkValue(char value){
  switch(value){
    case 0: turnOff();
    case 1: turnOn();
    case 2: turnOff();
    case 3: turnOn();
  }
}

//Turn on the lightbulb
void turnOn(){
  digitalWrite(pin,HIGH);
}

//Turn off the lightbulb
void turnOff(){
  digitalWrite(pin, LOW);
}

