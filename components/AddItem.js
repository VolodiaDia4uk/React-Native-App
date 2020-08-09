import React from 'react';
import {Header, Input, Button,View} from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

export default function AddItem(props) {
    return (
        <View style={styles.container}>
          <Input 
            placeholder="add new task" style={styles.input} value={props.text} onChangeText={props.onTextChange}/>
          <AntDesign name="pluscircle" size={40} color="white" onPress={props.addNewItem} />
        </View>  
    );
  }


const styles = StyleSheet.create({
  container:{
  flex:1,
  backgroundColor:'#047aff',
  paddingVertical:20,
  alignItems:'center',
  flexDirection:'row'
  },
  input: {
    borderRadius:10,
    marginRight:20,
    backgroundColor:'white'
  },

})