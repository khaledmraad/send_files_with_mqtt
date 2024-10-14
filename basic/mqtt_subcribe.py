import paho.mqtt.client as mqtt
from random import randrange, uniform
import time


def on_message(client, userdata, message):
    print("message received " ,str(message.payload.decode("utf-8")))


mqttBroker = "mqtt.eclipseprojects.io"
client=mqtt.Client("SI_Mourad")
client.connect(mqttBroker)


client.loop_start()
client.subscribe("temperature")
client.on_message=on_message

time.sleep(30)
client.loop_end()

