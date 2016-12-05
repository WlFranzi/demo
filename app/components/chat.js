'use strict';
import React, { Component } from 'react';
import MessageDetail from './messageDetail'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  AppState,
} from 'react-native';

import InvertibleScrollView from 'react-native-invertible-scroll-view';


if (!window.location) {
      window.navigator.userAgent = 'ReactNative';
    } 
    const io = require('socket.io-client/socket.io');
    const socket = io('https://agile-savannah-12064.herokuapp.com', {
      transports: ['websocket', 'force new connection': true]
    });


export default class MessageList extends Component {
  state = {appState: AppState.currentState, messages: [], newMessage:'', btnLocation: 0};
  constructor(props) {
    super(props);
    this.clearText = this.clearText.bind(this);
  }

  componentWillMount() {
    Keyboard.addListener('keyboardWillShow', (e) => this.keyboardWillShow(e));
    Keyboard.addListener('keyboardWillHide', (e) => this.keyboardWillHide(e));
  }

  loadData() {
    socket.on('connect', () => {
        console.log('connected!');
        socket.emit('joinChatGroup', { userId: 1, groupId: 1 });
        socket.on('joined', (check) =>{
          console.log('Joined the chat room')
        });
        
        // fetch history of Messages
        socket.emit('fetchHistoryMsg', { groupId: 1, userId: 1 });
        socket.on('historyMsgReceived', (data) =>{
          let message = data;
          console.log("Fetched Data")
          this.setState({messages: message});
        }); 
    });  
  }

  fetchHistory() {
    socket.emit('fetchHistoryMsg', { groupId: 1, userId: 1 });
    socket.on('historyMsgReceived', (data) =>{
      let message = data;
      console.log("Fetched Data")
      this.setState({messages: message});
    }); 
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    AppState.addEventListener('memoryWarning', this._handleMemoryWarning);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    AppState.removeEventListener('memoryWarning', this._handleMemoryWarning);
  }

  _handleAppStateChange(currentAppState) {
      //    listen for received messages
      socket.on('msgReceived', (received) =>{
        console.log("got it!")
        console.log(received)
        this.setState({messages: this.state.messages.push(received)});
      });
  }

  keyboardWillShow(e) {
    this.setState({btnLocation: e.endCoordinates.height})
  }

  keyboardWillHide(e) {
    this.setState({btnLocation: 0})
  }

  renderMessageshistory() {
    return this.state.messages.map((message) =>
      <MessageDetail key={message._id} message={message}/>
      );
  }

  clearText() {
    this.refs['textInput'].setNativeProps({text: ''});  
  }

  render() {
    this.loadData()
    if ((this.state.messages).length !== 0) {
      return (
      <View style={{bottom: this.state.btnLocation,
        flex: 1,
        justifyContent: "flex-end",
        alignSelf: 'stretch',
        backgroundColor: '#F5FCFF'}}>

          <InvertibleScrollView inverted={true} ref='invertible' style={{flex: 1}}>    
            <View style={{margin: 10}}>        
              {this.renderMessageshistory()}
            </View>
          </InvertibleScrollView>

        <View style={styles.sendbox} >
        <TextInput 
              // multiline={true}
              ref={'textInput'}
              style={styles.input}
              onChangeText={text => this.setState({newMessage: text})}
              placeholder="Type here ..."
            />
         <TouchableOpacity
          style={this.state.newMessage ? styles.buttonActive : styles.buttonInactive}
          onPress={() => {
              if (this.state.newMessage != '') {
                let options = {
                  userId: 1,
                  userName: 'Gertrude',
                  groupId: 1,
                  groupName: 'stress',
                  content: this.state.newMessage,
                  creationTime: Date.now(),
                };
                socket.emit('sendMsg', options);
                console.log('done?')
                console.log(options)
              }
              this.clearText('textInput')
              this.fetchHistory()
          }}
          underlayColor='#D97573'>
          <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity> 
          </View>       
      </View>
          )
    } else {
      return (
      <View style={styles.loadingcontainer}>
        <Text>
          .. Loading
        </Text>
      </View>
      )}
    }
}

const styles = StyleSheet.create({
   loadingcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 0,
    margin: 0,
  },
  sendbox: {
    flexDirection: 'row',
  },
  inputBox: {
    flex: 1,
    position: 'absolute', 
    left: 0, 
    right: 0, 
    bottom: 0,
    backgroundColor: '#D6EFEF',
    borderWidth: 4,
    borderColor: 'yellow',
    justifyContent: 'space-between'
  },
  input: {
    height: 45,
    padding: 5,
    flex: 1,
    marginRight: 5,
    fontSize: 12,
    borderColor: '#E0E0E0',
    margin: 5,
    borderColor: '#b4b4b4',
    borderRadius: 8,
    color: 'black',
    backgroundColor: 'white',
    borderWidth: 2,
  },
  buttonActive: {
    flex: .4,
    backgroundColor: "#D6EFEF",
    borderRadius: 6,
    justifyContent: 'center',
    margin: 5,
    borderWidth: 2
  },
  buttonInactive: {
    flex: .4,
    backgroundColor: "#e8f6f6",
    borderRadius: 6,
    justifyContent: 'center',
    margin: 5,
    borderWidth: 2,
    borderColor: 'grey'
  },
   buttonText: {
    height: 25,
    textAlign: 'center',
    fontSize: 18,
  },
});
