


#include "DHT.h"

#define DHTPIN A0     // what digital pin we're connected to
 

#define DHTTYPE DHT11   

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  Serial.println("Temperature,Humidity,Rain fall  and soil moisture ");

  dht.begin();
}

void loop() {
  
  delay(2000);
  float h = dht.readHumidity(A0);
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();
  // Read temperature as Fahrenheit (isFahrenheit = true)
  float f = dht.readTemperature(true);
  // Compute heat index in Fahrenheit (the default)
  float hif = dht.computeHeatIndex(f, h);
  // Compute heat index in Celsius (isFahreheit = false)
  float hic = dht.computeHeatIndex(t, h, false);
  float sensorValue = analogRead(A1);
   float sensorValue1 = analogRead(A2);
 
  Serial.print(t);
  Serial.print('\t');
    delay(2000);
//  Serial.print(" %\t");
  //Serial.print("Temperature: ");
  Serial.print(h);
  Serial.print('\t');
    delay(2000);
  //Serial.print(" *C ");
   //Serial.print(" %\t");
  Serial.print(f);
  Serial.print('\t');
    delay(2000);
  //Serial.print(" *F\t");
  // Serial.print(" %\t");
  //Serial.print("Heat index: ");
  Serial.print(hic);

  Serial.print('\t');
    delay(2000);
   //Serial.print(" %\t");
  //Serial.print(" *C ");
  Serial.print(hif);
  Serial.print('\t');
    delay(2000);
 //Serial.print(" *F");
  //Serial.print(" %\t");
 //Serial.print("Soil Moisture: ");
  Serial.print(sensorValue);
   Serial.print('\t');
    delay(2000);
    Serial.print(sensorValue1);
  Serial.println('\t');
    delay(2000);


}
