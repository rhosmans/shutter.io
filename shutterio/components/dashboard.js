// components/dashboard.js
import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import firebase from '../database/firebase';
import {subjects} from '../utils/SubjectDictonary'
export default class PhotoPrompt extends Component {
  constructor() {
    super();
    this.state = { 
      uid: '',
      currentSubject: ''
    }
  }
  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
  }  

  render() {
    this.state = { 
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid
    }    
    return (
      <View style={styles.container}>
        <Text style = {styles.textStyle}>
          Hello, {this.state.displayName}
        </Text>
        <View style={styles.logoutWrapper}>
            <Button
            color="#fff"
            title="Logout"
            onPress={() => this.signOut()}
            />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#2a2a2a'
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20,
    color: "#fff"
  },
  logoutWrapper: {
      justifyContent: "flex-end"
  }
});