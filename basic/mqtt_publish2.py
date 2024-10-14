import paho.mqtt.client as mqtt
from random import randrange, uniform
import time

mqttBroker = "mqtt.eclipseprojects.io"
client=mqtt.Client("SI_khaled")
client.connect(mqttBroker)

while True:
    randNumber = randrange(20, 120)
    client.publish("temperature",randNumber)
    print("Just published " + str(randNumber) + " to topic temperature")
    time.sleep(1)