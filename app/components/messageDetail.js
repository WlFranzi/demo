'use strict';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const MessageDetail = (props) => {
  var id = props.message.senderId
  console.log(id)
  if (id != 1) { 
    return (
      <View style={styles.talkBubble}>
        <View style={styles.talkBubbleOTHER}>
          <Text style={styles.infoBubbleContentOTHER}>{props.message.content}</Text>
          <Text style={styles.infoBubbleNameOTHER}>{props.message.senderName}</Text>
        </View>
          <Text style={styles.infoBubbleTimeOTHER}> {props.message.creationTime}</Text>
      </View>
    )
  } else {
    return (
      <View style={styles.talkBubble}>
        <View  style={styles.talkBubbleME}>
          <Text style={styles.infoBubbleNameME}>{props.message.senderName}</Text>
          <Text style={styles.talkBubbleContentME}>{props.message.content}</Text>
        </View>
        <Text style={styles.infoBubbleTimeME}>{props.message.creationTime}</Text>
      </View>
    )
  }
};

const styles = StyleSheet.create({
 talkBubble: {
  marginLeft: -3,
  flex: 1,
  backgroundColor: 'transparent',
  margin: 5,
 },

 talkBubbleME: {
  maxWidth: 300,
  flexDirection: 'row',
  alignSelf : 'flex-end',
 },
 talkBubbleContentME: {
    backgroundColor: '#D6EFEF',
    borderWidth : 0.5,
    borderColor: 'grey',
    padding: 6,
    alignSelf : 'flex-end',
    borderRadius: 10,
    fontWeight: 'bold',
  },
  infoBubbleNameME: {
   alignSelf : 'flex-end',
   bottom: 2,
   margin: 3,
   fontStyle: 'italic'
  },
  infoBubbleTimeME: {
   alignSelf : 'flex-end',
   color: 'grey',
   fontSize: 7,
  },
  talkBubbleOTHER: {
    maxWidth: 200,
    flexDirection: 'row',
    alignSelf : 'flex-start',
  },
  infoBubbleContentOTHER: {
    maxWidth: 200,
    maxHeight: 1000,
    backgroundColor: '#FDF8E5',
    borderWidth : 0.5,
    borderColor: 'grey',
    padding: 6,
    alignSelf : 'flex-start',
    borderRadius: 10,
    fontWeight: 'bold',
  },
  infoBubbleNameOTHER: {
   alignSelf : 'flex-start',
   bottom: 2,
   margin: 3,
   fontStyle: 'italic'
  },
  infoBubbleTimeOTHER: {
    alignSelf : 'flex-start',
    color: 'grey',
    fontSize: 7,

  }

});

export default MessageDetail;