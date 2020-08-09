import React from 'react';
import {Text,ListItem,Button,View,Body } from 'native-base';
import { AntDesign } from '@expo/vector-icons'; 


export default function TodoItems(props) {

  const {text,checked,index,changeChecked,toogleModal,removeByIndex} = props
  let textDecor = checked ? {textDecorationLine: 'line-through', textDecorationStyle: 'solid',color:'red'}:{color:'green'}
  const checkedColor = checked ? 'red' : 'green'
  return(
            <View >
              <ListItem
              onLongPress={()=>toogleModal(index)}
              >
              <AntDesign name="checkcircleo" size={36} color={checkedColor} onPress={()=>changeChecked(index)}/>    
              <Body>
                <Text style={{...textDecor,fontSize:20}} numberOfLines={1}>{text}</Text>
              </Body>
              <Button onPress={()=>removeByIndex(index)} style={{alignItems:'center',backgroundColor:'red'}}>
                <AntDesign name="minuscircle" size={24} color="black" style={{paddingHorizontal:15}}/>
              </Button>
              </ListItem>
              </View>
  )
}

