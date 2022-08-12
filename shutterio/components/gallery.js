import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Text} from 'react-native'
import GridImageView from 'react-native-grid-image-viewer'
import { TouchableOpacity } from 'react-native-gesture-handler';


const getPhotosURL = "http://localhost:3000/photos";

const headers = {
    "Content-Type": "application/json",
  };


function Gallery (props) {
    let [photosArr, setPhotosArr] = useState([]);

    useEffect(() => {
        axios.get(getPhotosURL, { headers })
        .then((response) => {
            // console.log(response.data)
            let tempArr = [];
            response.data.forEach((item) => {
                tempArr.push(item.photo_url);
            })
            // console.log(tempArr);
            setPhotosArr(tempArr);
        })
        .catch(err => {
            console.log(err);
        })
    },[])

    useEffect(() => {
        // console.log(photosArr);
    },[photosArr])

    navPrompt = () => {
        // console.log("button Press");
        props.navigation.navigate('Home');
    }



    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>See what others have seen!</Text>
            <GridImageView data={photosArr}/>
            <Text style={styles.textStyle}>
                Click on an image to view in full screen mode
            </Text>
            <TouchableOpacity onPress={this.navPrompt}>
                <Text 
                style={styles.promptTextStyle}
                >Back to prompt</Text>
            </TouchableOpacity>
        </View>
    );
}

module.exports = Gallery;


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
        marginBottom: "120%"
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

  const otherStyles = StyleSheet.create({
  background: {
    backgroundColor: 'black',
    flex: 1,
  },
  headline_text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 50,
    marginLeft: 20,
  },
  explore_text: {
    marginTop: 5,
    marginBottom: 10,
    color: 'white',
    marginLeft: 20,
    fontSize: 12,
    fontWeight: '600',
  },
});