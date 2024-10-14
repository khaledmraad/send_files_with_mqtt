import paho.mqtt.client as mqtt
from random import randrange, uniform
import time

mqttBroker = "broker.emqx.io"
client=mqtt.Client("SI_khaled")
client.connect(mqttBroker)

while True:
    randNumber = uniform(20.0, 120.0)
    client.publish("/nodejs/mqtt",randNumber)
    print("Just published " + str(randNumber) + " to topic temperature")
    time.sleep(1)