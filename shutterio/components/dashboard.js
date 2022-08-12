import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';
import firebase from '../database/firebase';
import {subjects} from '../utils/SubjectDictonary'
import * as Permissions from "expo-permissions"
import * as ImagePicker from "expo-image-picker"
import { AntDesign } from "@expo/vector-icons"
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';


const cloudName = 'aURL'
const upload_preset = 'RFC2205MVPReave'
const cloudinary_url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`



function PhotoPrompt (props) {
    let [uid, setUid] = useState('');
    let [displayName, setDisplayName] = useState('');
    let [currentSubject, setCurrentSubject] = useState('');
    let [newPhoto, setNewPhoto] = useState('');

    const headers = {
        "Content-Type": "application/json",
      };
    
    const dailyUrl = "http://localhost:3000/daily";
    const postPhotoURL = "http://localhost:3000/photos";

    useEffect(() => {
        loggedIn();
    },[props])

    useEffect(() => {
        console.log(newPhoto);
        if(newPhoto !== '') {
            cloudinaryUpload(newPhoto, "Image");
        }
    },[newPhoto])


    loggedIn = () => {
        setDisplayName(firebase.auth().currentUser.displayName);
        setUid(firebase.auth().currentUser.uid);
        axios.get(dailyUrl, { headers })
            .then((response) => {
                setCurrentSubject(response.data);
                // console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    signOut = () => {
        firebase.auth().signOut().then(() => {
        props.navigation.navigate('Login')
        })
        .catch(error => this.setState({ errorMessage: error.message }))
    }  

    addPhoto = async () => {
        ImagePicker.launchImageLibraryAsync({})
        .then((success) => {
            setNewPhoto(success.uri);
            // console.log(success);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    navGallery = () => {
        // console.log("button Press");
        props.navigation.navigate('Gallery');
    }


    cloudinaryUpload = (photoURI, type) => {
        const photoFormData = new FormData();
        let name = "name"
        let photo = {
            photoURI,
            type,
            name
        }
        photoFormData.append("file", photo);
        photoFormData.append("upload_preset", upload_preset);
        photoFormData.append("cloud_name", cloudName);
        fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: "post",
        body: photoFormData,
        })
        .then((res) => res.json())
        .then((success) => {
            console.log(success);
        })
        .catch((err) => {
            console.log("An Error Occured While Uploading");
            console.log(err);
        });
    }
    
   
    return (
    <View style={styles.container}>
        <Text style = {styles.textStyle}>
            Hello, {displayName}
        </Text>
        <View style={styles.bodyWrapper}>
            <Text style= {styles.promptTextStyle}>Todays Prompt is: </Text>
            <Text style= {styles.promptStyle}>{currentSubject}</Text>
            <TouchableOpacity onPress={addPhoto}>
                {newPhoto ? (
                    <Image source={{uri: newPhoto}} style={styles.newPhoto} />
                ) : (
                    <View style={styles.defaultIcon}>
                        <AntDesign name = "plus" size={20} color="#fff"/>
                        <Text style={styles.textStyle}>Add your photo!</Text>
                    </View>
                )}
            </TouchableOpacity>
            <TouchableOpacity onPress={this.navGallery}>
                <Text 
                style={styles.promptTextStyle}
                >See other photos taken today!</Text>
            </TouchableOpacity>
        </View>
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

export default PhotoPrompt;


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
  },
  promptTextStyle: {
      color:'#fff',
      fontWeight: '700',
      textAlign:'center',
      marginTop: 20
  },
  bodyWrapper: {
      justifyContent: "center",
      marginBottom: "50%"
  },
  submitAndView: {
      color:'pink',
      fontWeight: 'bold',
      textAlign:'center',
      fontSize: 25
  },
  promptStyle: {
      color:'#fff',
      fontWeight: 'bold',
      textAlign:'center',
      fontSize: 25
  },
  defaultIcon: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100
  },
  newPhoto: {
    backgroundColor: "#fff",
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: "center",
    marginTop: 50,
    overflow: 'hidden'
  },
});