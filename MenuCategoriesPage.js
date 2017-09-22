/**
 * This file shows the downloaded data 
 */
'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image,
} from 'react-native';
import Styles from './Styles.js';

export default class MenuCategoriesPage extends Component {
	renderCategories = () => {
    const categoriesText = [];

    //loop all the category names
    for( let i = 0; i < parseInt(this.props.totalCategories); i++) {
      //if condition only for styling puposes
      if(i==0) {
        categoriesText.push(
          <Text key={i} style={Styles.extraPaddingDesc}>
            {this.props.categoriesArray[i]}
          </Text>
          )
      }
      else {
          categoriesText.push(
          <Text style={Styles.description} key={i}>
            {this.props.categoriesArray[i]}
          </Text>//key should be unique :)
        )
      }
    }
    return categoriesText;
  }


  render() {    
	   return (
		   <View style={Styles.container}>
          {this.renderCategories()}
       </View>
	   );
  }
}
