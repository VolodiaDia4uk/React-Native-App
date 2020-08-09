import React, { useState,useEffect } from 'react';
import {StyleSheet, Image,Alert,AsyncStorage } from 'react-native';
import { Container, Header, Content, Form, Item, Input,Label,Button,View,Text,Icon  } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default function Registration(props) {
const [usernameValue,changeUsernameValue] = useState('')
const [usernameError,changeUsernameError] = useState('')
const [passwordValue,changePasswordValue] = useState('')
const [passwordError,changePasswordError] = useState('')
const [confirmedPasswordValue,changeConfirmedPasswordValue] = useState('')
const [confirmedPasswordError,changeConfirmedPasswordError] = useState('')
const [image,setImage] = useState('')
const [isError,showError] = useState(true)



let passwordValidator=(text,name)=>{
   if(text===name&&confirmedPasswordValue!==''){
      changeConfirmedPasswordError('good')
    }
    else{
      changeConfirmedPasswordError('passwords don`t matchsdsd')
    }
}
const changeCurrentValue=(text,inputName)=>{
if(inputName=='username'){
  changeUsernameValue(text)
  if(text.length>=5){
  changeUsernameError('good')  
  }
  else{
  changeUsernameError('at least  5 symbols')     
  }  
}
else if(inputName=='password'){
  changePasswordValue(text)
  passwordValidator(text,confirmedPasswordValue)

  var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if(re.test(text))
  {
    changePasswordError('good')
  }
  else{
    changePasswordError('bad password')
  }
  }
  else if(inputName==='changePassword'){
    changeConfirmedPasswordValue(text)
    passwordValidator(text,passwordValue)
  }
}

let  login=async()=>{
  let userContainer = {}
  userContainer.username = usernameValue
  userContainer.password = passwordValue
  userContainer.imageSrc = image
  try{
  let isUsername = await AsyncStorage.getItem(userContainer.username)
  if(isUsername===null)
  {
    await AsyncStorage.setItem(userContainer.username,JSON.stringify(userContainer))
    props.navigation.navigate('Login')
  }
  else{
    alert('user is')
  }
  }
  catch(e){
    alert(e)
  }
}

  let getPermissionAsync = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
      }
  };
  let disabl = ()=>{
    if(usernameError==='good'&&passwordError==='good'&&confirmedPasswordError==='good'&&image!==''){
      showError(false)  
    }
    else{
      showError(true)
    } 
  }

useEffect(()=>{
  getPermissionAsync()
  disabl()
})
  let _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri)
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
  

 return (
     <Container>
        <Content style={{borderColor:'#047aff',borderWidth:10,borderBottomWidth:0}}>
        <View >
        <View style={{alignItems:'center',fontSize:30,backgroundColor:'#047aff',borderBottomLeftRadius:30,borderBottomRightRadius:30,position:'fixed'}}>
        <Text style={{fontSize:30,color:'white'}}>
          Create an account 
        </Text>
        </View>
          <Form style={{alignItems:'center'}}>
            <Item floatingLabel>
              <Label>Enter username</Label>
              <Input value={usernameValue} onChangeText={(text)=>changeCurrentValue(text,'username')}/>
            </Item>
            <Text>{usernameError}</Text>
            <Item floatingLabel>
              <Label>Enter password</Label>
              <Input value={passwordValue}  secureTextEntry={true} onChangeText={(text)=>changeCurrentValue(text,'password')}/>
            </Item>
            <Text>{passwordError}</Text>
            <Item floatingLabel>
              <Label>Confirm password</Label>
              <Input value={confirmedPasswordValue}  secureTextEntry={true} onChangeText={(text)=>changeCurrentValue(text,'changePassword')}/>
            </Item>
            <Text>{confirmedPasswordError}</Text>
            <Button transparent onPress={_pickImage} style={{}}>
            <Text>
            Pick an image from camera roll
            </Text>
            </Button>
            {image!==''?<Image source={{ uri: image }} style={{ width:200, height:200 }} />:null}
          <Button onPress={()=>login()} style={{justifyContent:'center',width:150,marginTop:30}} disabled={isError}>
            <Text>
            SUBMIT
            </Text>
          </Button>
          <Button onPress={()=>props.navigation.navigate('Login')} style={{justifyContent:'center',width:150,marginVertical:30}}>
            <Text>
            Login
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
