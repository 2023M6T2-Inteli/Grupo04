const int GAS_SENSOR_PIN = 0;

int gasSensorValue;
char incomingCommand;

void setup(){

  pinMode(A0, INPUT);
  Serial.begin(115200);
  
}

void loop(){

  if(Serial.available()){

    gasSensorValue = analogRead(GAS_SENSOR_PIN);
    incomingCommand = Serial.read();

    switch (incomingCommand) {
      
      case '1':
        Serial.println(gasSensorValue);
        break;
          
      // Ignoring new line and carriage return characters
      case '\n':
      case '\r':
        break;

    }  
  }
}