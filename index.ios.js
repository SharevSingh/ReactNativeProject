/**
 * This file only downloads data from firebase 
 */
'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button, 
  NavigatorIOS
} from 'react-native';
import * as firebase from "firebase";
import MenuCategoriesPage from './MenuCategoriesPage';
import Styles from './Styles.js';

// Initialize Firebase
const firebaseConfig = {
	apiKey: "AIzaSyDNd0JbrnsQBbuM2I26P8J84nrfJt_i7ZI",
    authDomain: "sendingnotification-4a127.firebaseapp.com",
    databaseURL: "https://sendingnotification-4a127.firebaseio.com",
    projectId: "sendingnotification-4a127",
    storageBucket: "sendingnotification-4a127.appspot.com"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
var Firebase = require('firebase');
//end

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.myFirebaseRef = firebaseApp.database().ref();
    this.state = {
    		totalCategories:0, // to store the number of different types of Menus 
    		categoriesArray:[],// to hold the value of all the Menus
    		dataDownloaded:false,// to check if data is downloaded from firebase
   	 }
  	}

  componentDidMount() {
  	// read firebase
	this.myFirebaseRef.child("FilesToUse").child("Tookaya").child("menucategories").on('value', (snapshot) => {
            if (snapshot.val()) {
            	var catArray = [];
            	var total = 0;

            	snapshot.forEach((child) => {
        			if(child.key!="total") {
						catArray.push(child.val());
        			}
        			else {
        				total = child.val();
        			}
      			});

                this.setState({
                 	totalCategories: total,
                 	categoriesArray: catArray,
                 	dataDownloaded: true
                });
            }
        });
	}

  render() {
  	//check if data is downloaded 
    if(this.state.dataDownloaded) {
    	return (
    		//go to MenuCategoriesPage
     		 <NavigatorIOS
        		initialRoute={{
          		component: MenuCategoriesPage,
          		title: "Tookaya's Menu",
          		passProps: {
          			totalCategories: this.state.totalCategories,
          			categoriesArray:this.state.categoriesArray
          			},
        		}}
        		style={{flex: 1}}
      		/>
    		)
    	}
    	else {
    		  return <Text style={Styles.descriptionIndex}> Welcome!!!</Text>;
    	}
	}
}




AppRegistry.registerComponent('myRNProject', () => LandingPage);
