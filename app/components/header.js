'use strict';
// Import libraries for making a component
import React from 'react';
import { Text, View } from 'react-native';

// Make a component
const Header = (props) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={viewStyle}>
      <Text style={styles.textStyleHeader}>{props.headerText}</Text>
      <Text style={styles.textStyleNote}>{props.noteText}</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
    margin: 4,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 4,
  },
  textStyleHeader: {
    paddingTop: 12,
    fontSize: 20,
    fontFamily: 'Georgia',
    fontWeight: 'bold',
  },
  textStyleNote: {
    fontSize: 10,
    color: 'grey',
    paddingTop: 12,
  }
};


// Make the component available to other parts of the app
export default Header;