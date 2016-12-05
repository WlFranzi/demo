// Index.ios.js - place code in here for IOS!!!!

// Import a library to help create a component
import React from 'react';
import { AppRegistry, View } from 'react-native';
import Header from './app/components/header';
import Chat from './app/components/chat';

// Create a component
const CoNLLprivateSpace = () => (
  <View style={{ flex: 1 }}>
    <Header headerText={'Group 1'} noteText={'- you share similar questions regarding stress -'} />
    <Chat />
  </View>
);

// Render it to the device
AppRegistry.registerComponent('CoNLLprivateSpace', () => CoNLLprivateSpace);
