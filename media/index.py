import os
import argparse
import logging
import time
import json
import asyncio
import socketio
#from aiortc import RTCPeerConnection, RTCSessionDescription, RTCIceCandidate
#from aiortc.contrib.signaling import BYE, add_signaling_arguments, create_signaling

import sys
import board
import pyaudio
import numpy as np
import wave
from rpi_ws281x import PixelStrip, Color
import threading
from PIL import Image
import struct
import math
import datetime

mod=0
display_list=[0,0,0,0,0,0,0,0,0,0]
global temp
temp=[[],[],[],[],[],[],[],[],[],[]]

SHORT_NORMALIZE = (1.6/32768.0) #1.0
mic=pyaudio.PyAudio()
CHUNK=2**10
FORMAT=pyaudio.paInt16
CHANNELS=1#
RATE=48100   #44100 48000
LED_COUNT = 100 # Number of LED pixels.
LED_PIN = 10 # GPIO pin connected to the pixels (10 uses SPI /dev/spidev0.0).
LED_FREQ_HZ = 900000 # LED signal frequency in hertz (usually 800khz)
LED_DMA = 10 # DMA channel to use for generating signal (try 10)
LED_BRIGHTNESS = 200 # Set to 0 for darkest and 255 for brightest
LED_INVERT = False 
LED_CHANNEL = 0 # set to '1' for GPIOs 13, 19, 41, 45 or 53
r=165
g=165
b=0

INPUT_BLOCK_TIME = 0.07
INPUT_FRAMES_PER_BLOCK = int(RATE*INPUT_BLOCK_TIME)
strip = PixelStrip(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS)
strip.begin()

sio = socketio.AsyncClient()

pc = False
peer = False
channel = False
friend = False
myid = False
room = 'AAA'

global onstate
onstate = True
audioState = True

openstate = { 'audio' : False, 'clock' : False, 'mode' : False }

global typedata
typedata = 'audio'

def on(r,g,b):
	for i in range(strip.numPixels()):
		strip.setPixelColor(i,Color(r,g,b))
	strip.show()

def off(r,g,b):
	for i in range(strip.numPixels()):
		strip.setPixelColor(i,0)
	strip.show()

brightness=200
tos=1

#Picture
temp2 = Image.open('/home/dsu/project/a.png')


def picture():
	px = temp2.load()
	new=temp2.resize((10,10))
	px = new.load()
	rgb=[]
	for i in range(10):
		rgb.append([])
		for j in range(10):
			rgb[i].append(0)
	for i in range(0,10):
		for j in range(0,10):
			rgb[i][j]=new.getpixel((i, j))
	for k in range(0,10) :
		strip.setPixelColor(9-k ,Color(rgb[0][k][0],rgb[0][k][1],rgb[0][k][2]))
	for k in range(0,10) :
		strip.setPixelColor(10+k ,Color(rgb[1][k][0],rgb[1][k][1],rgb[1][k][2]))
	for k in range(0,10) :
		strip.setPixelColor(29-k ,Color(rgb[2][k][0],rgb[2][k][1],rgb[2][k][2]))
	for k in range(0,10) :
		strip.setPixelColor(30+k ,Color(rgb[3][k][0],rgb[3][k][1],rgb[3][k][2]))
	for k in range(0,10) :
		strip.setPixelColor(49-k ,Color(rgb[4][k][0],rgb[4][k][1],rgb[4][k][2]))
	for k in range(0,10) :
		strip.setPixelColor(50+k ,Color(rgb[5][k][0],rgb[5][k][1],rgb[5][k][2]))
	for k in range(0,10) :
		strip.setPixelColor(69-k ,Color(rgb[6][k][0],rgb[6][k][1],rgb[6][k][2]))
	for k in range(0,10) :
		strip.setPixelColor(70+k ,Color(rgb[7][k][0],rgb[7][k][1],rgb[7][k][2]))
	for k in range(0,10) :
		strip.setPixelColor(89-k ,Color(rgb[8][k][0],rgb[8][k][0],rgb[8][k][2]))
	for k in range(0,10) :
		strip.setPixelColor(90+k ,Color(rgb[9][k][0],rgb[9][k][1],rgb[9][k][2]))
	strip.show()

# Rainbow
def rainbow(strip, wait_ms=20, iterations=1):
    for j in range(256 * iterations):
        for i in range(strip.numPixels()):
            strip.setPixelColor(i, wheel((i + j) & 255))
        strip.show()
        time.sleep(wait_ms / 1000.0)

def wheel(pos):
    if pos < 85:
        return Color(pos * 3, 255 - pos * 3, 0)
    elif pos < 170:
        pos -= 85
        return Color(255 - pos * 3, 0, pos * 3)
    else:
        pos -= 170
        return Color(0, pos * 3, 255 - pos * 3)


def clock():
	global brightness
	global tos
	if brightness>=255:
		tos=-1
	if brightness<=0:
		tos=1
	brightness+=tos
	strip.setBrightness(brightness)
	
	numbers=[
	[[0,1,1,1,0],
	[0,1,0,1,0],
	[0,1,0,1,0],
	[0,1,0,1,0],
	[0,1,1,1,0]],

	[[0,0,1,0,0],
	[0,1,1,0,0],
	[0,0,1,0,0],
	[0,0,1,0,0],
	[0,1,1,1,0]],

	[[0,1,1,1,0],
	[0,0,0,1,0],
	[0,1,1,1,0],
	[0,1,0,0,0],
	[0,1,1,1,0]],

	[[0,1,1,1,0],
		[0,0,0,1,0],
		[0,1,1,1,0],
		[0,0,0,1,0],
		[0,1,1,1,0]],

	[[0,0,1,0,0],
	[0,1,0,0,0],
	[0,1,1,1,0],
	[0,0,1,0,0],
	[0,0,1,0,0]], 

	[[0,1,1,1,0],
	[0,1,0,0,0],
	[0,1,1,1,0],
	[0,0,0,1,0],
	[0,1,1,1,0]],

	[[0,1,1,1,0],
	[0,1,0,0,0],
	[0,1,1,1,0],
	[0,1,0,1,0],
	[0,1,1,1,0]],

	[[0,1,1,1,0],
	[0,1,0,1,0],
	[0,1,0,1,0],
	[0,0,0,1,0],
	[0,0,0,1,0]],

	[[0,1,1,1,0],
	[0,1,0,1,0],
	[0,1,1,1,0],
	[0,1,0,1,0],
	[0,1,1,1,0]],

	[[0,1,1,1,0],
	[0,1,0,1,0],
	[0,1,1,1,0],
	[0,0,0,1,0],
	[0,1,1,1,0]]
	]

	temps=[[0,0,0,0,0],
			[0,0,0,0,0],
			[0,0,0,0,0],
			[0,0,0,0,0],
			[0,0,0,0,0]]

	now = datetime.datetime.now()
	n1=now.hour//10
	n2=now.hour%10
	n3=now.minute//10
	n4=now.minute%10
	temps=numbers[n1].copy()#hour_first
	for i in range(0,5,2):
		for j in range(0,5):
			if temps[j][i]==1:strip.setPixelColor(10*(i+1)-1-j,Color(125,30,0))
			else:strip.setPixelColor(10*(i+1)-1-j,Color(125,125,125))
	for i in range(1,4,2):
		for j in range(0,5):
			if temps[j][i]==1:strip.setPixelColor(10*i+j,Color(125,30,0))
			else:strip.setPixelColor(10*i+j,Color(125,125,125))
	strip.show()

	temps=numbers[n3].copy()#minute_first

	for i in range(0,5,2):
		for j in range(0,5):
			if temps[j][i]==1:strip.setPixelColor(10*(i+1)-6-j,Color(0,100,100))
			else:strip.setPixelColor(10*(i+1)-6-j,Color(125,125,125))
	for i in range(1,4,2):
		for j in range(0,5):
			if temps[j][i]==1:strip.setPixelColor(10*i+5+j,Color(0,100,100))
			else:strip.setPixelColor(10*i+5+j,Color(125,125,125))
	strip.show()

	temps=numbers[n2].copy()#hour_second

	for i in range(0,5,2):
		for j in range(0,5):
			if temps[j][i]==1:strip.setPixelColor(40+10*(i+1)+j,Color(0,0,100))
			else:strip.setPixelColor(40+10*(i+1)+j,Color(125,125,125))
	for i in range(1,4,2):
		for j in range(0,5):
			if temps[j][i]==1:strip.setPixelColor(60+10*i-1-j,Color(0,0,100))
			else:strip.setPixelColor(60+10*i-1-j,Color(125,125,125))
	strip.show()

	temps=numbers[n4].copy()#minute_second

	for i in range(0,5,2):
		for j in range(0,5):
			if temps[j][i]==1:strip.setPixelColor(40+10*(i+1)+5+j,Color(100,0,100))
			else:strip.setPixelColor(40+10*(i+1)+5+j,Color(125,125,125))
	for i in range(1,4,2):
		for j in range(0,5):
			if temps[j][i]==1:strip.setPixelColor(60+10*i-6-j,Color(100,0,100))
			else:strip.setPixelColor(60+10*i-6-j,Color(125,125,125))
	strip.show()


# Audio Spectrum
def act_func(count,frq,r,g,b):
	global temp
	display_list.insert(0,count)
	display_list.pop()
	degree=int(display_list[0]/60)

	print("decibel : %s "%(degree))
	temp[9].clear()
	#for a in range(90,99) :
	#    strip.setPixelColor(a ,0)
	strip.show()
	if frq<10: frq=1
	elif frq>100: frq=10
	else : frq=frq//10
	for i in range(0,frq):
		temp[9].append(1)
		strip.setPixelColor(99-i ,Color(r,g,b))
	for i in range(0,10-frq):
		strip.setPixelColor(90+i,Color(127,127,127))
	if len(temp[9])>1:strip.setPixelColor(99-frq,Color(127,0,0))
	strip.show()
	for j in range(0, 9):
		number=len(temp[j])
		temp[j].clear()
		temp[j]=temp[j+1].copy()
		dif=number-len(temp[j])
		if number>len(temp[j]):
			if j==0:
				for k in range(len(temp[j]),number) :
					strip.setPixelColor(k ,Color(127,127,127))
				if len(temp[j])>1:strip.setPixelColor(len(temp[j]), Color(127,0,0))
			elif j%2==1:
				for k in range(len(temp[j]),number+1) :
					strip.setPixelColor(10*j+9-k,Color(127,127,127))
				if len(temp[j])>1:strip.setPixelColor(10*j+9-len(temp[j])+1 ,Color(127,0,0))
			else:
				for k in range(len(temp[j]),number+1) :
					strip.setPixelColor((10*j)+k,Color(127,127,127))
				if len(temp[j])>1:strip.setPixelColor(10*j+len(temp[j])-1,Color(127,0,0))
			strip.show()

		else:
			if j==0:
				for k in range(0,len(temp[j])) :
					strip.setPixelColor(k ,Color(r,g,b))
				for k_2 in range(len(temp[j]),10) :
					strip.setPixelColor(k_2 ,Color(127,127,127))
				if len(temp[j])>1:strip.setPixelColor(len(temp[j]),Color(127,0,0))
			elif j%2==1:
				for k in range(0,len(temp[j])) :
					strip.setPixelColor(10*j+9-k ,Color(r,g,b))
				for k_2 in range(len(temp[j]),10) :
					strip.setPixelColor(10*j+9-k_2 ,Color(127,127,127))
				if len(temp[j])>1: strip.setPixelColor(10*j+9-len(temp[j]),Color(127,0,0))
				#strip.setPixelColor(10*j+9-k+1,Color(127,0,0))
			else :
				for k in range(0,len(temp[j])) :
					strip.setPixelColor((10*j)+k ,Color(r,g,b))
				for k_2 in range(len(temp[j]),10) :
					strip.setPixelColor((10*j)+k_2,Color(127,127,127))
				if len(temp[j])>1: strip.setPixelColor((10*j)+len(temp[j]),Color(127,0,0))
			strip.show()
		#time.sleep(0.1)


# To decibel
stream= mic.open(format=FORMAT, channels=CHANNELS,rate=RATE,input=True,
frames_per_buffer=CHUNK)
errorcount = 0  

# To frequency
def get_rms(block):

	count2 = len(block)/2
	format = "%dh"%(count2)
	shorts = struct.unpack( format, block )
	# iterate over the block.
	sum_squares = 0.0
	for sample in shorts:
	# sample is a signed short in +/- 32768. 
	# normalize it to 1.0
		n = sample * SHORT_NORMALIZE
		sum_squares += n*n

	return math.sqrt( sum_squares / count2 )

def channel_log(channel, t, message):
	print("channel(%s) %s %s" % (message))

@sio.event
async def connect():
	print('서버에 연결되었습니다.')
	print("내 아이디", sio.sid)
	await sio.emit('aduuid', sio.sid)
	await sio.emit('room', room)

@sio.event
async def template(data):
	global typedata
	global onstate
	if (data['handle'] == 'power'):
		if onstate:
			typedata = 'on'
			onstate = False
		else:
			typedata = 'off'
			onstate = True

		print('power')
	elif (data['handle'] == 'clock'):
		typedata = 'clock'
		print('clock')
	elif (data['handle'] == 'audio'):
		typedata = 'audio'
		print('audio')
	elif (data['handle'] == 'mode'):
		typedata = 'mode'
		print('mode')
	elif (data['handle'] == 'picture'):
		typedata = 'picture'
		print('picture')
	else:
		print('none')

@sio.event
async def joind(data):
	global pc
	global friend
	print('서버로부터 메시지 수신:', data)
	friend = data

	#channel = pc.createDataChannel("chat")
	#@channel.on("open")
	#def on_open():
	#	print("데이터 채널 오픈")

	#@channel.on("message")
	#def on_message(message):
	#	channel_log(message)
	#	print(message)

	#offer = await pc.createOffer()
	#await pc.setLocalDescription(offer)
	#offer_data = {
	#	"target": data,
	#	"caller" : room,
	#	"sdp" : { "type" : offer.type, "sdp" : offer.sdp }
	#}
	#print(offer_data)
	#await sio.emit("offer", offer_data)

@sio.event
async def answer(data):
	print('')
	#global pc
	#await pc.setRemoteDescription(RTCSessionDescription(sdp=data['sdp']['sdp'],type=data['sdp']['type']))

@sio.event
async def icecandidate(data):
	print('')
	#global pc
	#data["sdpMid"] = int(data["sdpMid"])
	#print(data)

	#candidate_ = isinstance(data, RTCIceCandidate)#RTCIceCandidate(data['candidate'])
	#print(candidate_)

	#await pc.addIceCandidate(candidate_)

def on_ice_candidate(event):
	global friend
	if event.candidate:
		candidate_data = {
			'candidate': {
				'candidate': event.candidate.sdp,
				'sdpMid': event.candidate.sdpMid,
				'sdpMLineIndex': event.candidate.sdpMLineIndex
			},
			'target' : friend
		}
		sio.emit('icecandidate', candidate_data)

async def run():
	global pc
	global typedata
	#pc = RTCPeerConnection()
	#pc.onicecandidate = lambda event: on_ice_candidate(event)

	await sio.connect('https://dsu-capstone-a47fe2ecb7f8.herokuapp.com')
	#await sio.connect('http://10.1.242.21:9000')
	#await sio.wait()

	while True:
		if (typedata == 'on'):
			on(r,g,b)
		elif (typedata == 'off'):
			off(r,g,b)
		elif (typedata == 'audio'):
			#openstate = { 'audio' : True, 'clock' : False, 'mode' : False }
			#onstate = False
			try:
				block = stream.read(INPUT_FRAMES_PER_BLOCK)
			except IOError:
				errorcount += 1
				print( "(%d) Error recording: %s"%(errorcount) )
				noisycount = 1
			frq =round(100*get_rms(block))
			print("frequency: %s  "%(frq),end='')
			data=stream.read(CHUNK)
			data_int=np.array(wave.struct.unpack(str(2*CHUNK)+'B',data),dtype='b')
			high_count=np.where(data_int>100)
			sthread=threading.Thread(target=act_func,args=(len(high_count[0]),frq,r,g,b))
			sthread.start()
		elif (typedata == 'clock'):
			clock()
		elif (typedata == 'mode'):
			rainbow(strip)
		elif (typedata == 'picture'):
			picture()
		
		await asyncio.sleep(0.01)

if __name__ == "__main__":
	asyncio.run(run())