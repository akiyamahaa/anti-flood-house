#include <Servo.h>

#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>

#include <SocketIoClient.h>

#define USE_SERIAL Serial

#include "DHT.h"

#define DHTPIN 5 // what digital pin we're connected to
#define servo 14
#define DHTTYPE DHT11 // DHT 11
Servo gServo;
DHT dht(DHTPIN, DHTTYPE);

const int analogInPin = A0;  // ESP8266 Analog Pin ADC0 = A0
const int digitalInPin = 4;

int sensorValue = 0;  // value read from the pot

ESP8266WiFiMulti WiFiMulti;
SocketIoClient webSocket;

void messageEvenetHandler(const char * payload, size_t length) {
  USE_SERIAL.printf("got message: %s\n", payload);
}

void setup() {
  gServo.attach(servo);
  USE_SERIAL.begin(115200);

  USE_SERIAL.setDebugOutput(true);

  USE_SERIAL.println();
  USE_SERIAL.println();
  USE_SERIAL.println();

  for (uint8_t t = 4; t > 0; t--) {
    USE_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
    USE_SERIAL.flush();
    delay(1000);
  }

  WiFiMulti.addAP("AMERICANSTUDY", "666102268");

  while (WiFiMulti.run() != WL_CONNECTED) {
    delay(100);
  }
  dht.begin();
  webSocket.on("reply", messageEvenetHandler);
  webSocket.begin("192.168.10.26", 3000);
  // use HTTP Basic Authorization this is optional remove if not needed
  //webSocket.setAuthorization("username", "password");
}
uint64_t messageTimestamp;
void convertFloatToChar(float floatNum1,float floatNum2, char* Buf){
    String convert1 = String(floatNum1);
    String convert2 = String(floatNum2);
    ("\""+ convert1 + " " + convert2+"\"").toCharArray(Buf,50);
} 
void convertNumberToChar(int intNum,char* Buf){
    String convert1 = String(intNum);
    convert1.toCharArray(Buf,50);
} 
void loop() {
  webSocket.loop();
  uint64_t now = millis();
  //dht
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(t)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }
  //Analog
    sensorValue = analogRead(analogInPin);
    int value = digitalRead(digitalInPin);//Đọc tín hiệu cảm biến mưa
    if (now - messageTimestamp > 6000) {
      messageTimestamp = now;
      // Send event
      char resDht[50];
      char resEarth[50];
      char resStatus[50];
      convertFloatToChar(h,t, resDht);
      convertNumberToChar(sensorValue, resEarth);
      convertNumberToChar(value, resStatus);
      webSocket.emit("dht",resDht);
      webSocket.emit("earth",resEarth);
      webSocket.emit("arduino",resStatus);
    }
    if( t < 22 && sensorValue < 800 && value == 1){
      gServo.write(90);
      delay(1000);
    }
    
}
