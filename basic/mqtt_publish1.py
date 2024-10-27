import paho.mqtt.client as mqtt
from random import randrange, uniform
import time

mqttBroker = "127.0.0.1"
client=mqtt.Client("SI_khaled")
client.connect(mqttBroker)

while True:
    randNumber = uniform(20.0, 120.0)
    client.publish("temperature","hello_there")
    print("Just published " + str(randNumber) + " to topic temperature")
    # print("done")
    time.sleep(1)