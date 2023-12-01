import React, { useState, useEffect, useRef } from 'react';
import { NativeModules, NativeEventEmitter, Text, View, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, Alert, FlatList, Animated } from 'react-native';

import DeviceInfo from 'react-native-device-info';

import { NavigationContainer, useNavigation, StackActions } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { RTCPeerConnection, RTCSessionDescription, RTCIceCandidate, mediaDevices, RTCView, MediaStream } from 'react-native-webrtc'
import io from "socket.io-client";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Buffer } from 'buffer';
import BleManager, {
	BleDisconnectPeripheralEvent,
	BleManagerDidUpdateValueForCharacteristicEvent,
	BleScanCallbackType,
	BleScanMatchMode,
	BleScanMode,
	Peripheral,
} from 'react-native-ble-manager';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const buffer = Buffer.from('dsu');

//import {BleManager} from 'react-native-ble-plx'
//const _BleManager = new BleManager();


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import 'react-native-gesture-handler';

import { logger } from "react-native-logs";
import { ScrollView } from 'react-native-gesture-handler';

var log = logger.createLogger();

BleManager.start({ showAlert: false }).then(() => {
	// Success code
	console.log("Module initialized");
});

const App = () =>{
	useEffect(() => {
	}, [])

	return(
		<View style={{  flex: 1, flexDirection: 'row' ,alignItems: 'center', justifyContent: 'center', alignContent: 'center', alignSelf: 'center'}}>
			<NavigationContainer screenOptions={{ gestureDirection: 'vertical' }}>
				<Stack.Navigator>
					{/*}
					<Stack.Screen
						name="MainLoad"
						component={MainLoad}
					/>
					{*/}
					<Stack.Screen
						name="MainHome"
						component={MainHome}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="MainInfo"
						component={MainInfo}
						screenOptions={{
							headerStyle: { height: 56 }
						}}
						options={{ headerShown: false, 
							headerShown: false,
							gestureEnabled: true,
							cardOverlayEnabled: true,
							...TransitionPresets.ModalPresentationIOS,
							cardStyle:{
								backgroundColor:"transparent",
							},
							title: "MainInfo"
						}}
						mode="modal"
					/>
					<Stack.Screen
						name="MainTerms"
						component={MainTerms}
						screenOptions={{
							headerStyle: { height: 56 }
						}}
						options={{ headerShown: false, 
							headerShown: false,
							gestureEnabled: true,
							cardOverlayEnabled: true,
							...TransitionPresets.ModalPresentationIOS,
							cardStyle:{
								backgroundColor:"transparent",
							},
							title: "MainTerms"
						}}
						mode="modal"
					/>
					<Stack.Screen
						name="MainPrivacy"
						component={MainPrivacy}
						screenOptions={{
							headerStyle: { height: 56 }
						}}
						options={{ headerShown: false, 
							headerShown: false,
							gestureEnabled: true,
							cardOverlayEnabled: true,
							...TransitionPresets.ModalPresentationIOS,
							cardStyle:{
								backgroundColor:"transparent",
							},
							title: "MainPrivacy"
						}}
						mode="modal"
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</View>
	);
}

const ModalHeader = () => {
	const navigation = useNavigation();
	return (
		<View>
			<View style={{ borderBottom: 1, borderWidth: 1, borderColor: '#ddd', backgroundColor: '#f9f9f9', flexDirection: 'row', justifyContent: 'space-between' }}>
				<View>
					<TouchableOpacity onPress={()=>{
						navigation.goBack()
					}}>
						<View style={{ padding: 15 }}>
							<FontAwesomeIcon icon={['fas', "angle-down"]} color="#ddd" size={18}/>
						</View>
					</TouchableOpacity>
				</View>
				<View>
					<TouchableOpacity onPress={()=>{
						navigation.goBack()
					}}>
						<View style={{ padding: 15 }}>
							<Text style={{ color: '#3481ff', fontSize: 14, fontWeight: 'bold' }}>닫기</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

//	Main > Load
const MainLoad = () => {
	const navigation = useNavigation();
	useEffect(() => {
		setTimeout(()=>{
			navigation.push('HomeSearch')
		},1000)
	}, []);

	return(
		<View>
			<Text style={{ fontSize: 22 }}>로드</Text>
		</View>
	)
}

const MainTerms = () => {
	return (
		<View style={{ flex: 1, paddingTop: 30 }}>
			<View style={{ flex: 1, borderTopLeftRadius: 10, borderTopRightRadius: 10, overflow: "hidden", backgroundColor: "#fff" }}>
				<SafeAreaView style={{ flex: 1, }}>
					<ModalHeader />
					<ScrollView style={{ padding: 15 }}>
						<Text style={{ fontSize: 14, fontWeight: 'bold', color: '#999' }}>이용약관</Text>
						<Text style={{ paddingTop: 15, fontSize: 20, color: '#333' }}>이용약관</Text>
						<Text style={{ padding: 5, paddingTop: 10, fontSize: 14, color: '#333', letterSpacing: 1, lineHeight: 20 }}>
						동서대학교는 「개인정보보호법」 등 관련법령상의 개인정보보호 규정을 준수하며, 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
						</Text>
						<Text style={{ paddingTop: 15, fontSize: 20, color: '#333' }}>제 1장</Text>
						<Text style={{ padding: 5, paddingTop: 10, paddingBottom: 10, fontSize: 14, color: '#333', letterSpacing: 1, lineHeight: 20 }}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer. Augue mauris augue neque gravida in fermentum et sollicitudin ac. Dictumst quisque sagittis purus sit amet. Id eu nisl nunc mi. A lacus vestibulum sed arcu non odio. Cras pulvinar mattis nunc sed blandit libero volutpat. Viverra mauris in aliquam sem fringilla ut morbi. Viverra vitae congue eu consequat ac felis donec. Pellentesque habitant morbi tristique senectus. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Gravida dictum fusce ut placerat orci nulla. Massa sed elementum tempus egestas sed. Id consectetur purus ut faucibus pulvinar elementum integer. Sit amet consectetur adipiscing elit pellentesque habitant morbi.
						Nam at lectus urna duis convallis convallis tellus. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Fermentum dui faucibus in ornare quam viverra orci sagittis eu. Leo duis ut diam quam nulla. Risus sed vulputate odio ut. Enim nulla aliquet porttitor lacus. Duis ut diam quam nulla porttitor. Suspendisse interdum consectetur libero id faucibus. Sit amet cursus sit amet dictum sit. Pellentesque dignissim enim sit amet venenatis urna. Sodales neque sodales ut etiam sit amet nisl. Sed blandit libero volutpat sed cras ornare arcu dui.
						Elementum curabitur vitae nunc sed velit. Proin libero nunc consequat interdum varius sit amet mattis. Sit amet consectetur adipiscing elit. Neque aliquam vestibulum morbi blandit cursus risus at. Eget lorem dolor sed viverra ipsum. Risus ultricies tristique nulla aliquet enim tortor at. Mauris ultrices eros in cursus turpis. Semper auctor neque vitae tempus. Elit duis tristique sollicitudin nibh. Tempor nec feugiat nisl pretium fusce id velit ut tortor. Est lorem ipsum dolor sit amet. Ut venenatis tellus in metus vulputate eu scelerisque. Eleifend donec pretium vulputate sapien. Lacus luctus accumsan tortor posuere ac. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue. Scelerisque purus semper eget duis at tellus at urna condimentum. Cras adipiscing enim eu turpis egestas pretium aenean pharetra magna. Odio eu feugiat pretium nibh ipsum.
						Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Sodales ut etiam sit amet. Odio euismod lacinia at quis risus sed vulputate. Vitae proin sagittis nisl rhoncus mattis rhoncus urna neque. Amet massa vitae tortor condimentum lacinia quis. Id consectetur purus ut faucibus pulvinar. Integer eget aliquet nibh praesent tristique magna sit amet purus. Porttitor lacus luctus accumsan tortor. Eget duis at tellus at urna condimentum. Neque ornare aenean euismod elementum nisi quis eleifend quam. Hac habitasse platea dictumst vestibulum rhoncus. Sit amet consectetur adipiscing elit duis tristique. Amet volutpat consequat mauris nunc congue. Duis convallis convallis tellus id interdum. Mattis pellentesque id nibh tortor id aliquet lectus. Habitasse platea dictumst quisque sagittis purus sit amet volutpat consequat. Metus dictum at tempor commodo ullamcorper a lacus vestibulum sed. Massa placerat duis ultricies lacus. Tortor id aliquet lectus proin nibh nisl condimentum id venenatis. Mauris augue neque gravida in fermentum et sollicitudin.
						</Text>
					</ScrollView>
				</SafeAreaView>
			</View>
		</View>
	)
}

const MainPrivacy = () => {
	console.log()
	return (
		<View style={{ flex: 1, paddingTop: 30 }}>
			<View style={{ flex: 1, borderTopLeftRadius: 10, borderTopRightRadius: 10, overflow: "hidden", backgroundColor: "#fff" }}>
				<SafeAreaView style={{ flex: 1, }}>
					<ModalHeader />
					<ScrollView style={{ padding: 15 }}>
						<Text style={{ fontSize: 14, fontWeight: 'bold', color: '#999' }}>개인정보 취급방침</Text>
						<Text style={{ paddingTop: 15, fontSize: 20, color: '#333' }}>개인정보 취급방침</Text>
						<Text style={{ padding: 5, paddingTop: 10, fontSize: 14, color: '#333', letterSpacing: 1, lineHeight: 20 }}>
						동서대학교는 「개인정보보호법」 등 관련법령상의 개인정보보호 규정을 준수하며, 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
						</Text>
						<Text style={{ paddingTop: 15, fontSize: 20, color: '#333' }}>제 1장</Text>
						<Text style={{ padding: 5, paddingTop: 10, paddingBottom: 10, fontSize: 14, color: '#333', letterSpacing: 1, lineHeight: 20 }}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer. Augue mauris augue neque gravida in fermentum et sollicitudin ac. Dictumst quisque sagittis purus sit amet. Id eu nisl nunc mi. A lacus vestibulum sed arcu non odio. Cras pulvinar mattis nunc sed blandit libero volutpat. Viverra mauris in aliquam sem fringilla ut morbi. Viverra vitae congue eu consequat ac felis donec. Pellentesque habitant morbi tristique senectus. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Gravida dictum fusce ut placerat orci nulla. Massa sed elementum tempus egestas sed. Id consectetur purus ut faucibus pulvinar elementum integer. Sit amet consectetur adipiscing elit pellentesque habitant morbi.
						Nam at lectus urna duis convallis convallis tellus. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Fermentum dui faucibus in ornare quam viverra orci sagittis eu. Leo duis ut diam quam nulla. Risus sed vulputate odio ut. Enim nulla aliquet porttitor lacus. Duis ut diam quam nulla porttitor. Suspendisse interdum consectetur libero id faucibus. Sit amet cursus sit amet dictum sit. Pellentesque dignissim enim sit amet venenatis urna. Sodales neque sodales ut etiam sit amet nisl. Sed blandit libero volutpat sed cras ornare arcu dui.
						Elementum curabitur vitae nunc sed velit. Proin libero nunc consequat interdum varius sit amet mattis. Sit amet consectetur adipiscing elit. Neque aliquam vestibulum morbi blandit cursus risus at. Eget lorem dolor sed viverra ipsum. Risus ultricies tristique nulla aliquet enim tortor at. Mauris ultrices eros in cursus turpis. Semper auctor neque vitae tempus. Elit duis tristique sollicitudin nibh. Tempor nec feugiat nisl pretium fusce id velit ut tortor. Est lorem ipsum dolor sit amet. Ut venenatis tellus in metus vulputate eu scelerisque. Eleifend donec pretium vulputate sapien. Lacus luctus accumsan tortor posuere ac. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue. Scelerisque purus semper eget duis at tellus at urna condimentum. Cras adipiscing enim eu turpis egestas pretium aenean pharetra magna. Odio eu feugiat pretium nibh ipsum.
						Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Sodales ut etiam sit amet. Odio euismod lacinia at quis risus sed vulputate. Vitae proin sagittis nisl rhoncus mattis rhoncus urna neque. Amet massa vitae tortor condimentum lacinia quis. Id consectetur purus ut faucibus pulvinar. Integer eget aliquet nibh praesent tristique magna sit amet purus. Porttitor lacus luctus accumsan tortor. Eget duis at tellus at urna condimentum. Neque ornare aenean euismod elementum nisi quis eleifend quam. Hac habitasse platea dictumst vestibulum rhoncus. Sit amet consectetur adipiscing elit duis tristique. Amet volutpat consequat mauris nunc congue. Duis convallis convallis tellus id interdum. Mattis pellentesque id nibh tortor id aliquet lectus. Habitasse platea dictumst quisque sagittis purus sit amet volutpat consequat. Metus dictum at tempor commodo ullamcorper a lacus vestibulum sed. Massa placerat duis ultricies lacus. Tortor id aliquet lectus proin nibh nisl condimentum id venenatis. Mauris augue neque gravida in fermentum et sollicitudin.
						</Text>
					</ScrollView>
				</SafeAreaView>
			</View>
		</View>
	)
}

const MainInfo = () => {
	const peerRef = useRef();
	const socketRef = useRef();
	const trackRef = useRef();
	const sendChannel = useRef();
	const otherUser = useRef();
	const [messages, setMessages] = useState([]);
	const [stream, setStream] = useState(null);

	const [text, setText] = useState('');

	const Temp = useRef();

	console.log("info")


	const tempRes = (data) => {
		socketRef.current.emit("temp", { type : 'client', handle : data });
	};

	useEffect(() => {
		const handle = {
			tempReq : (data) => {
				console.log(data)
			},
			joind : async (userID) => {
				peerRef.current = await peerConnection();
				//sendChannel.current = peerRef.current.createDataChannel("chat", { negotiated: true, id: 0 });
				sendChannel.current = peerRef.current.createDataChannel("chat");
				sendChannel.current.onmessage = handleReceiveMessage;
				peerRef.current.onnegotiationneeded = () => handleNegotiationNeededEvent(userID);

				await trackConnection();
			},
			offer : async (data) => {
				console.log("받음!");
				console.log(data);
				peerRef.current = await peerConnection();
				otherUser.current = data.caller;

				//await trackConnection();

				//sendChannel.current = peerRef.current.createDataChannel("chat");
				//sendChannel.current.onmessage = handleReceiveMessage;
				peerRef.current.ondatachannel = async (event) => {
					sendChannel.current = event.channel;
					sendChannel.current.onmessage = handleReceiveMessage;
				}
				
				peerRef.current.setRemoteDescription(new RTCSessionDescription(data.sdp)).then(() => {

				}).then(() => {
					return peerRef.current.createAnswer();
				}).then(answer => {
					return peerRef.current.setLocalDescription(answer);
				}).then(() => {
					console.log("보내기");
					console.log({
						target: data.caller,
						caller: data.target,
						sdp: peerRef.current.localDescription,
					})
					socketRef.current.emit("answer", {
						target: data.caller,
						caller: data.target,
						sdp: peerRef.current.localDescription,
					});

				});
			},
			answer : async (data) => {
				const desc = new RTCSessionDescription(data.sdp);
				peerRef.current.setRemoteDescription(desc).catch(e => console.log("Error handle answer", e));
				//channel.send("접속");
				
			},
			handleNewICECandidateMsg : (incoming) => {
				if(incoming){
					const candidate = new RTCIceCandidate(incoming);

					peerRef.current.addIceCandidate(candidate).catch((e) => {
						console.log(e)
					});
				}
			}
		}

		socketRef.current = io.connect("https://dsu-capstone-a47fe2ecb7f8.herokuapp.com")
		//socketRef.current = io.connect("http://10.1.242.21:9000")

		roomConnection('AAA');
		socketRef.current.on('joind', handle.joind);
		socketRef.current.on('offer', handle.offer);
		socketRef.current.on('answer', handle.answer);
		socketRef.current.on('temp', handle.tempReq);
		socketRef.current.on('icecandidate', handle.handleNewICECandidateMsg);

		return () => {
			socketRef.current.disconnect()
			socketRef.current.off('joind', handle.joind);
			socketRef.current.off('offer', handle.offer);
			socketRef.current.off('answer', handle.answer);
			socketRef.current.off('temp', handle.tempReq);
			socketRef.current.off('icecandidate', handle.handleNewICECandidateMsg);
		  };
	}, []);


	const roomConnection = async (data) => {
		setTimeout(()=>{
			socketRef.current.emit('room', data);
			console.log(socketRef.current.id)
		},1000)
	};
	const peerConnection = async (data) => {
		const peer = new RTCPeerConnection({
			iceServers: [
				{
					urls: "stun:stun.stunprotocol.org"
				},
				{
					urls: 'turn:numb.viagenie.ca',
					credential: 'muazkh',
					username: 'webrtc@live.com'
				},
			]
		});

		peer.onicecandidate = handleICECandidateEvent;
		return peer;
	};
	const trackConnection = async () => {
		trackRef.current = await mediaDevices.getUserMedia({ video: true, audio : true });
		await trackRef.current.getTracks().forEach(async (track) => {
			console.log(track);
			await peerRef.current.addTrack(track, trackRef.current);
			return true;
		});
		peerRef.current.ontrack = handleTrack
		return true;
	};
	
	const handleNegotiationNeededEvent = (userID) =>{
		peerRef.current.createOffer().then(offer => {
			return peerRef.current.setLocalDescription(offer);
		}).then(() => {
			socketRef.current.emit("offer", {
				target: userID,
				caller : socketRef.current.id,
				sdp: peerRef.current.localDescription,
			});
		}).catch((err) => {
			console.log("Error handling negotiation needed event", err)
		});
	};

	const handleTrack = async (e) => {
		if(e?.streams[0]){
			const data = await new MediaStream(e.streams[0]);
			console.log(data);
			setStream(data.toURL())
		}
		return true;
	};
	const handleReceiveMessage = async (e) => {
		const array = [...messages, e?.data];
		await setMessages(array)
	};

	const handleICECandidateEvent = (e) => {
		if (e.candidate) {
			const payload = {
				target: otherUser.current,
				candidate: e.candidate,
			}
			socketRef.current.emit("icecandidate", payload);
		}
	}


	return (
		<View style={{ flex: 1, paddingTop: 30 }}>
			<View style={{ flex: 1, borderTopLeftRadius: 10, borderTopRightRadius: 10, overflow: "hidden", backgroundColor: "#fff" }}>
				<SafeAreaView style={{ flex: 1, }}>
					<ModalHeader />
					<View style={{ padding: 15 }}>
						<View style={{ paddingTop: 15, paddingBottom: 15 }}>
							<TouchableOpacity onPress={() => { tempRes('power') }}>
								<View style={{ backgroundColor: '#2196f3', padding: 5, borderRadius: 7 }}>
									<View style={{ padding: 5, borderRadius: 5 }}>
										<View>
											<View style={{ alignItems: 'center', alignContent: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
												<Text style={{ fontSize: 14, color: '#fff', fontWeight: 'bold', paddingLeft: 5 }}>on / off</Text>
												<FontAwesomeIcon icon={['fas', "power-off"]} color="#fff" size={18}/>
											</View>
										</View>
									</View>
								</View>
							</TouchableOpacity>
						</View>
						<View style={{ paddingTop: 15, paddingBottom: 15 }}>
							<TouchableOpacity onPress={() => { tempRes('audio') }}>
								<View style={{ backgroundColor: '#2196f3', padding: 5, borderRadius: 7 }}>
									<View style={{ padding: 5, borderRadius: 5 }}>
										<View>
											<View style={{ alignItems: 'center', alignContent: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
												<Text style={{ fontSize: 14, color: '#fff', fontWeight: 'bold', paddingLeft: 5 }}>노래방</Text>
												<FontAwesomeIcon icon={['fas', "music"]} color="#fff" size={18}/>
											</View>
										</View>
									</View>
								</View>
							</TouchableOpacity>
						</View>
						<View style={{ paddingTop: 15, paddingBottom: 15 }}>
							<TouchableOpacity onPress={() => { tempRes('clock') }}>
								<View style={{ backgroundColor: '#2196f3', padding: 5, borderRadius: 7 }}>
									<View style={{ padding: 5, borderRadius: 5 }}>
										<View>
											<View style={{ alignItems: 'center', alignContent: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
												<Text style={{ fontSize: 14, color: '#fff', fontWeight: 'bold', paddingLeft: 5 }}>시계</Text>
												<FontAwesomeIcon icon={['far', "clock"]} color="#fff" size={18}/>
											</View>
										</View>
									</View>
								</View>
							</TouchableOpacity>
						</View>
						<View style={{ paddingTop: 15, paddingBottom: 15 }}>
							<TouchableOpacity onPress={() => { tempRes('mode') }}>
								<View style={{ backgroundColor: '#2196f3', padding: 5, borderRadius: 7 }}>
									<View style={{ padding: 5, borderRadius: 5 }}>
										<View>
											<View style={{ alignItems: 'center', alignContent: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
												<Text style={{ fontSize: 14, color: '#fff', fontWeight: 'bold', paddingLeft: 5 }}>모드 변경</Text>
												<FontAwesomeIcon icon={['fas', "play"]} color="#fff" size={18}/>
											</View>
										</View>
									</View>
								</View>
							</TouchableOpacity>
						</View>
						<View style={{ paddingTop: 15, paddingBottom: 15 }}>
							<TouchableOpacity onPress={() => { tempRes('picture') }}>
								<View style={{ backgroundColor: '#2196f3', padding: 5, borderRadius: 7 }}>
									<View style={{ padding: 5, borderRadius: 5 }}>
										<View>
											<View style={{ alignItems: 'center', alignContent: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
												<Text style={{ fontSize: 14, color: '#fff', fontWeight: 'bold', paddingLeft: 5 }}>액자</Text>
												<FontAwesomeIcon icon={['fas', "image"]} color="#fff" size={18}/>
											</View>
										</View>
									</View>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</SafeAreaView>
			</View>
		</View>
	)
}

/*
					<View style={{ padding: 15 }}>
						<TextInput
							value={text}
							onChangeText={setText}
							style={{ borderWidth: 1, borderColor: '#333333' }}
						/>
						<TouchableOpacity 
							style={{ marginTop: 30 }}
							onPress={() => {
								sendChannel.current.send(JSON.stringify({ user : socketRef.current.id, message : text, date : new Date() }));
								setText('');
							}}
						>
							<View style={{ backgroundColor: '#666' }}>
								<View>
									<FontAwesomeIcon icon={['fas', "cube"]} color="#fff" size={22}/>
								</View>
							</View>
						</TouchableOpacity>
					</View>
					<RTCView style={{ backgroundColor: '#333333', width: 400, height: 500 }} streamURL={stream} />
					<FlatList
						data={messages}
						renderItem={({item}) => <Text>{item}</Text>}
					/>
*/

const HomeOptions = (icon, title) => {
	const navigation = useNavigation();
	return {
		tabBarIcon: ({focused, color, size}) => {
			return <FontAwesomeIcon
				color={color}
				icon={icon}
				size={18}/>;
		},
		headerLeft: ({onPress}) => (
			<View>
				<View style={{ padding: 5, borderRadius: 10, marginLeft: 10 }}>
					<TouchableOpacity
						style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
						onPress={() => {
							navigation.navigate("HomeHome")
						}}
					>
						<View>
							<FontAwesomeIcon icon={['fas', "cube"]} color="#fff" size={22}/>
						</View>
						<Text style={{ paddingLeft: 7, fontWeight: 'bold', fontSize: 16, color: "#fff" }}>SL</Text>
					</TouchableOpacity>
				</View>
			</View>
		),
		headerTitle: () => (
			<View></View>
		),
		headerRight: () => (
			<View>
				<View
					style={{ padding: 5, borderRadius: 10, marginRight: 10 }}
					onPress={() => {
						navigation.push("HomeSearch")
					}}
				>
					<TouchableOpacity>
						<FontAwesomeIcon icon={['fab', "bluetooth-b"]} color="#fff" size={22}/>
					</TouchableOpacity>
				</View>
			</View>
		),
		headerStyle: { 
			backgroundColor: '#3481ff',
		},
		animationEnabled : true,
		headerBackVisible: false,
		title: title
	}
}

//	Main > Home
const MainHome = () => {
	return(
		<View style={{ flex: 1 }}>
			<Tab.Navigator>
				<Tab.Screen
					name="HomeHome"
					component={HomeHome}
					options={HomeOptions(['fas', "chalkboard"], "Home")}
				/>
				<Tab.Screen
					name="HomeSearch"
					component={HomeSearch}
					options={HomeOptions(['fab', 'bluetooth-b'], "Search")}
				/>
				<Tab.Screen
					name="HomeStorage"
					component={HomeStorage}
					options={HomeOptions(['fas', 'database'], "Storage")}
				/>
				<Tab.Screen
					name="HomeSetting"
					component={HomeSetting}
					options={HomeOptions(['fas', 'cog'], "Setting")}
				/>
			</Tab.Navigator>
		</View>
	)
}
//
//	Main > Home > Home
const HomeHome = (props) => {
	const navigation = useNavigation();

	return(
		<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignSelf: 'center'}}>
			<View style={{ flex: 1, padding: 15 }}>
				<View>
					<Text style={{ padding: 10, paddingBottom: 5, fontSize: 15, color: "#999" }}>My Device</Text>
					<View>
						<TouchableOpacity
							style={{ borderRadius: 10, backgroundColor: '#fff', overflow: 'hidden' }}
							onPress={() => {navigation.push('MainInfo')}}
						>
							<View style={{ padding: 15, paddingTop: 15, paddingBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
								<View>
									<Text style={{ fontSize: 18, paddingBottom: 10 }}>사용자 지정 제목</Text>
									<View style={{ flexDirection: 'row', alignItems: 'center' }}>
										<Text style={{ fontSize: 12 }}>DC:A6:32:AB:ED:AB</Text>
										<Text style={{ fontSize: 14, color: '#2196f3', paddingLeft: 15 }}>Activate</Text>
									</View>
								</View>
								<View>
									<TouchableOpacity>
										<FontAwesomeIcon icon={['fas', "angle-left"]} color="#999" size={22}/>
									</TouchableOpacity>
								</View>
							</View>
						</TouchableOpacity>
					</View>
				</View>

				<View style={{ paddingTop: 30, paddingBottom: 30 }}>
					<TouchableOpacity>
						<View style={{ backgroundColor: '#2196f3', padding: 5, borderRadius: 7 }}>
							<View style={{ padding: 5, borderColor: "#fff", borderWidth: 0, borderStyle: 'dashed', borderRadius: 5 }}>
								<View stlye={{ padding: 18 }}>
									<View style={{ alignItems: 'center', alignContent: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
										<Text style={{ fontSize: 14, color: '#fff', fontWeight: 'bold', paddingLeft: 5 }}>블루투스 연결</Text>
										<FontAwesomeIcon icon={['fab', "bluetooth-b"]} color="#fff" size={22}/>
									</View>
								</View>
							</View>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

//	Main > Home > Search
const HomeSearch = () => {
	const [devices, setDevices] = useState([]);
	const [device, setDevice] = useState([]);
	let array = []
	useEffect(() => {
		bleManagerEmitter.addListener('BleManagerDiscoverPeripheral',handleDiscoverPeripheral);
		bleManagerEmitter.addListener("BleManagerDidUpdateState", handleUpdateState);

		return () => {
		//	bleManagerEmitter.removeListener('BleManagerDiscoverPeripheral',handleDiscoverPeripheral);
		//	bleManagerEmitter.removeListener("BleManagerDidUpdateState", handleUpdateState);
		}
	}, [])

	const ScanStart = () => {
		BleManager.scan([], 5, false).then(() => {
			// Success code
			console.log("Scan started");
		});
	}

	const ScanEnd = () => {
		BleManager.stopScan().then(() => {
			// Success code
			console.log("Scan stopped");
		});
	}

	const handleDiscoverPeripheral = async (handle) => {
		//console.log(handle)
		if(handle?.name == 'Gopher'){
			console.log(handle?.id)
			await setDevices([...devices, handle?.id])
		}
	}

	const handleUpdateState = (handle) => {
		console.log(handle)
	}

	return(
		<View>
			<View style={{ padding: 15 }}>
				<View style={{ paddingTop: 15, paddingBottom: 30 }}>
					<TouchableOpacity onPress={() => { ScanStart() }}>
						<View style={{ backgroundColor: '#2196f3', padding: 5, borderRadius: 7 }}>
							<View style={{ padding: 5, borderColor: "#fff", borderWidth: 2, borderStyle: 'dashed', borderRadius: 5 }}>
								<View>
									<View style={{ alignItems: 'center', alignContent: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
										<Text style={{ fontSize: 14, color: '#fff', fontWeight: 'bold', paddingLeft: 5 }}>블루투스 검색</Text>
										<FontAwesomeIcon icon={['fas', "signal"]} color="#fff" size={22}/>
									</View>
								</View>
							</View>
						</View>
					</TouchableOpacity>
				</View>
				<View>
					<Text style={{ padding: 10, paddingBottom: 5, fontSize: 15, color: "#999" }}>Device List</Text>
					<View>
						<View
							style={{ borderRadius: 10, backgroundColor: '#fff', overflow: 'hidden' }}	
						>
							<View style={{ padding: 15, paddingTop: 15, paddingBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
								<View>
									<Text>검색 결과가 없습니다.</Text>
									<View style={{ minHeight: 50 }}>
										<FlatList
											data={devices}
											renderItem={({item}) => {
												return (
													<TouchableOpacity
														onPress={() => {
															BleManager.connect(item).then(() => {
																console.log("Connected");
																BleManager.retrieveServices(item).then(
																	(peripheralInfo) => {
																		const buffer = Buffer.from("123");
																		console.log(peripheralInfo)
																		BleManager.write(item, "09fc95c0-c111-11e3-9904-0002a5d5c51b", "16fe0d80-c111-11e3-b8c8-0002a5d5c51b", buffer.toJSON().data).then(() => {
																			console.log('Write: ' + data );
																		}).catch((error) => {
																			console.log(error);
																		});
																	}
																);
																/*
																*/
															}).catch((error) => {
																console.log(error);
															});
														}}
													>
														<View style={{ backgroundColor: '#dddddd', flexDirection: 'row', alignItem: 'center', justifyContent: 'center', padding: 15, borderRadius: 7 }}>
															<Text style={{ color: '#fff', fontSize: 12, letterSpacing: 2, color: '#333333' }}>{ item }</Text>
														</View>
													</TouchableOpacity>
												)
											}}
										/>
									</View>
								</View>
							</View>
						</View>
					</View>
				</View>
			</View>
		</View>
	)
}

//	Main > Home > Storage
const HomeStorage = () => {
	return(
		<View style={{ flex: 1 }}>
			<ScrollView style={{ padding: 15 }}>
				<View style={{ paddingBottom: 30 }}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignContent: 'center' }}>
						<Text style={{ padding: 10, paddingBottom: 5, fontSize: 15, color: "#999" }}>Photo List</Text>
						<TouchableOpacity style={{ paddingRight: 15, paddingLeft: 15 }}>
							<View>
								<FontAwesomeIcon icon={['fas', "angle-down"]} color="#999" size={12}/>
							</View>
						</TouchableOpacity>
					</View>
					<View>
						<View
							style={{ borderRadius: 10, backgroundColor: '#fff', overflow: 'hidden' }}
						>
							<View style={{ padding: 15, paddingTop: 15, paddingBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
								<View>
									<Text style={{ fontSize: 14, color: "#333" }}>사진이 없습니다</Text>
									<View style={{ minHeight: 50 }}>

									</View>
								</View>
							</View>
						</View>
					</View>
				</View>
				<View style={{ paddingBottom: 30 }}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignContent: 'center' }}>
						<Text style={{ padding: 10, paddingBottom: 5, fontSize: 15, color: "#999" }}>Video List</Text>
						<TouchableOpacity style={{ paddingRight: 15, paddingLeft: 15 }}>
							<View>
								<FontAwesomeIcon icon={['fas', "angle-down"]} color="#999" size={12}/>
							</View>
						</TouchableOpacity>
					</View>
					<View>
						<View
							style={{ borderRadius: 10, backgroundColor: '#fff', overflow: 'hidden' }}
						>
							<View style={{ padding: 15, paddingTop: 15, paddingBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
								<View>
									<Text style={{ fontSize: 14, color: "#333" }}>영상이 없습니다</Text>
									<View style={{ minHeight: 50 }}>
	
									</View>
								</View>
							</View>
						</View>
					</View>
				</View>
				<View style={{ paddingBottom: 30 }}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignContent: 'center' }}>
						<Text style={{ padding: 10, paddingBottom: 5, fontSize: 15, color: "#999" }}>Audio List</Text>
						<TouchableOpacity style={{ paddingRight: 15, paddingLeft: 15 }}>
							<View>
								<FontAwesomeIcon icon={['fas', "angle-down"]} color="#999" size={12}/>
							</View>
						</TouchableOpacity>
					</View>
					<View>
						<View
							style={{ borderRadius: 10, backgroundColor: '#fff', overflow: 'hidden' }}
						>
							<View style={{ padding: 15, paddingTop: 15, paddingBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
								<View>
									<Text style={{ fontSize: 14, color: "#333" }}>오디오가 없습니다</Text>
									<View style={{ minHeight: 50 }}>

									</View>
								</View>
							</View>
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	)
}

//	Main > Home > Setting
const HomeSetting = () => {

	const navigation = useNavigation();
	const list = [
		{ name : 'Device', child : [
			{ name : 'Brand', type : 'show', content : DeviceInfo?.getBrand() },
			{ name : 'OS', type : 'show', content : DeviceInfo.getSystemName(),  },
			{ name : 'Model', type : 'show', content : DeviceInfo?.getModel() },
			{ name : 'System Version', type : 'show', content : DeviceInfo.getSystemVersion() }
		]},
		{ name : 'About', child : [ { name : '이용약관', href : 'MainTerms' }, { name : '개인정보 취급방침', href : "MainPrivacy" }] }
	]
	return(
		<View style={{ flex: 1, backgroundColor: "#f1f1f1" }}>
			<View>
				<View style={{ paddingTop: 30, paddingBottom: 30, paddingRight: 15, paddingLeft: 15 }}>
					<FlatList
						data={list}
						scrollEnabled={false}
						renderItem={({item}) => {
							return (
								<View style={{ paddingBottom: 15 }}>
									<Text style={{ paddingLeft: 15, paddingBottom: 5, fontSize: 15, color: "#999" }}>{ item?.name }</Text>
									<View style={{ backgroundColor: "#fff", borderRadius: 15, overflow: 'hidden' }}>
										<FlatList
											data={item.child}
											renderItem={({item}) => {
												if(item?.type == 'show'){
													return (
														<TouchableOpacity
															onPress={() => {
																//navigation.push(item?.href)
															}}
														>
															<View style={{ backgroundColor: '#fff', flexDirection: 'row', padding: 17, borderRadius: 7, borderBottomWidth: 1, borderColor: "#f1f1f1", justifyContent: 'space-between' }}>
																<Text style={{ fontSize: 13, letterSpacing: 2, color: '#444444' }}>{ item?.name }</Text>
																<Text style={{ fontSize: 12, fontWeight: 'bold', color: '#333333', justifyContent: 'space-between' }}>{ item?.content }</Text>
															</View>
														</TouchableOpacity>
													)
												}else{
													return (
														<TouchableOpacity
															onPress={() => {
																navigation.push(item?.href)
															}}
														>
															<View style={{ backgroundColor: '#fff', flexDirection: 'row', padding: 17, borderRadius: 7, borderBottomWidth: 1, borderColor: "#f1f1f1", justifyContent: 'space-between' }}>
																<Text style={{ fontSize: 13, letterSpacing: 2, color: '#333333' }}>{ item?.name }</Text>
																<FontAwesomeIcon
																	icon={['fas', 'angle-right']}
																	size={14}
																/>
															</View>
														</TouchableOpacity>
													)
												}
											}}
										/>
									</View>
								</View>
							)
						}}
					/>
				</View>
				<View>
					<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
						<Text style={{ fontSize: 20, color: "#333" }}>an <Text style={{ fontSize: 22, color: "#3481ff" }}>sublights</Text> company</Text>
					</View>
					<View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 15 }}>
						<Text style={{ color: '#555', fontSize: 12 }}>SubLights v1.0 (Alpha Test.)</Text>
					</View>
				</View>
			</View>
		</View>
	)
}

export default App