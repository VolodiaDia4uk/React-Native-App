import React, { useState } from 'react';
import {StyleSheet, Image,AsyncStorage } from 'react-native';
import { Container, Header, Content, Form, Item, Input,Label,Button,View,Text,Icon  } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export default function Login(props) {
const [usernameValue,changeUsernameValue] = useState('')
const [passwordValue,changePasswordValue] = useState('')
const [isError,showError] = useState('')
const [showPassword,changeShowPassword] = useState(true)

const changeCurrentValue=(text,inputName)=>{
if(inputName=='username'){
  changeUsernameValue(text)
}
else changePasswordValue(text)
}

let  login=async(e)=>{
try{
  let data = await AsyncStorage.getItem(usernameValue)
  if(data){
    let userInfo = JSON.parse(data)
    if(userInfo.password===passwordValue){
      await AsyncStorage.setItem('currentUser',JSON.stringify(userInfo))
      props.navigation.navigate('Main',{imageSrc:userInfo.imageSrc})
    }
    else{
      alert('password not match')
    }

  }
  else{
    alert('user not found')
  }
}
catch(err){
  alert(err)
}
}

 return (
     <Container>
        <Content style={{borderColor:'#047aff',borderWidth:10,borderBottomWidth:0}}>
          <View>
          <View style={{alignItems:'center',fontSize:30,backgroundColor:'#047aff',borderBottomLeftRadius:30,borderBottomRightRadius:30,position:'fixed'}}>
          <Text style={{fontSize:30,color:'white',textAlign:'center'}}>
            Enter username and password 
          </Text>
          </View>
            <Form style={{alignItems:'center'}}>
              <Item floatingLabel >
                <Label>Enter username</Label>
                <Input value={usernameValue} onChangeText={(text)=>changeUsernameValue(text,'username')}/>
              </Item>
              <Item floatingLabel>
                <Label>Enter password</Label>
                <Input value={passwordValue} onChangeText={(text)=>changePasswordValue(text,'password')}  secureTextEntry={showPassword}/>
                <Icon active name="airplane" onPress={()=>changeShowPassword(!showPassword)}/>
              </Item>
            <Button onPress={login} style={{justifyContent:'center',width:150,marginTop:30}}>
              <Text>
              SUBMIT
              </Text>
            </Button >
            <Button onPress={()=>props.navigation.navigate('Registration')} style={{justifyContent:'center',width:150,marginVertical:30}}>
              <Text>
              REGISTRATION
              </Text>
              </Button>
            </Form>
          </View>
        </Content>
      </Container>
    );
  }


const styles = StyleSheet.create({
  
});
