import React, { Component } from 'react';
import { Container, Content, Text,List,Button,Input,Item,View,Body,Toast,Root} from 'native-base';
import {
  Alert,
  Modal,
  StyleSheet,
  AsyncStorage,
  Image
  } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 

import AddItem from '../components/AddItem'
import TodoItems from '../components/TodoItems'
import FooterMenuOptions from '../components/FooterMenuOptions'

export default class Main extends Component {

state={
  arr:[],
  text:'',
  modalWindow:false,
  newTaskText:'',
  editedIndex:null,
  imageSrc:'',
  userStorage:''
}

loadData = async () => {
  try {
    let data = await AsyncStorage.getItem('currentUser')
    data = JSON.parse(data)
    let userData = data.username+'Item'
    const value = await AsyncStorage.getItem(userData);
    let todoArr = JSON.parse(value)||[]
       this.setState({
         arr:todoArr,
         userStorage:userData,
         imageSrc:data.imageSrc
       })
    
  } 
  catch (error) {
    alert(error)
}
};
componentDidMount(){
  this.loadData()
  this.props.navigation.setOptions({
      headerRight: () => (
        <Image style={styles.imageStyles} source={{uri:this.state.imageSrc}}/>
      ),
      title:<Text style={{color:'#047aff',fontSize:20}}>Todo List</Text>
    });
}
onTextChange=(inpText)=>{
  this.setState({
    text:inpText
  })
}

deleteAllTasks=()=>{
  this.setState({
    arr:[]
  })
  this.addItemToStorage(this.state.arr)

}

addItemToStorage = async(arrItems)=>{
  await AsyncStorage.setItem(this.state.userStorage, JSON.stringify(arrItems))
  .then( ()=>{
    console.log('It was saved successfully')
  })
  .catch( (error)=>{
    alert(error)
  })
}

removeByIndex=(index)=>{
  this.state.arr.splice(index,1)
  this.setState({
    arr:this.state.arr
  })
  this.addItemToStorage(this.state.arr)
}

clearTaksByType=(arrType)=>{
  const {arr}=this.state
  let newArr = arrType=='doneTasks' ? newArr = arr.filter(item=>item.checked) : arr.filter(item=>item.checked==false)
  this.setState({
    arr:newArr,
    prevArr:arr,
    returnPrev:true
  })
  this.addItemToStorage(this.state.arr)
}

toogleModal=(index)=>{
  let itemText = this.state.arr[index].text
  this.setState({
    modalWindow:!this.state.modalWindow,
    newTaskText:itemText,
    editedIndex:index
  })
}

changeChecked=(index)=>{
  let item = this.state.arr
  item[index].checked=!item[index].checked
  this.setState({
    arr:item
  })
  this.addItemToStorage(this.state.arr)
}
showToast=()=>{
  Toast.show({
                text: "Minimum 3 symbols",
                type: "danger",
                buttonText: "OKAY",
                duration: 2500,
                style:{bottom:25}
              })
}
addNewItem=()=>{
  let text = this.state.text.trim()
  if(text.length<3){
   this.showToast()
  }
  else{
  let obj={}
  obj.text = text
  obj.checked = false
  let todoArr = [obj,...this.state.arr]
  this.setState({
    arr:todoArr,
    text:''
  })
  this.addItemToStorage(todoArr)
  }  
}

onChangeModalText=(text)=>{  
  this.setState({
    newTaskText:text
  })
}

confirmEditing=()=>{
  const {arr,newTaskText} = this.state
  if(newTaskText.length<3){
   this.showToast()
  }
  else{
    arr[this.state.editedIndex].text = newTaskText
    this.setState({
      arr:this.state.arr,
      modalWindow:false,
      editedIndex:null
    })
    this.addItemToStorage(this.state.arr)
  }
}


render(){
return(
<Root>
  <Container style={{flex:1}}>
    <Content style={{flex:1,borderColor:'#047aff',borderWidth:10,borderBottomWidth:0}}>
      <AddItem
      text={this.state.text} 
      addNewItem={this.addNewItem} 
      onTextChange={this.onTextChange} 
      />
      <List
      dataArray={this.state.arr}
      renderRow={(rowData,sectionID,rowID) =>
      <TodoItems
      navigation={this.props.navigation} 
      text={rowData.text}
      checked={rowData.checked}
      index = {rowID} 
      changeChecked={this.changeChecked} 
      toogleModal={this.toogleModal}
      removeByIndex={this.removeByIndex}
      />
      }
      />
    </Content>
    <Modal
      animationType="slide"
      transparent={true}
      visible={this.state.modalWindow}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        }}
      >
      <View style={styles.centeredView}>
        <View style={styles.modalContent}>
            <Item style={{height:40,borderRadius:1,marginVertical:30}}>  
              <Input 
                style={{fontWeight:'bold'}}
                value={this.state.newTaskText}
                placeholder="enter new value:"
                onChangeText={this.onChangeModalText}
                />
            </Item>
            <View style={{flexDirection:'row'}}>
              <Button
                transparent
                onPress={()=>{this.setState({modalWindow:false})}}
                style={{marginRight:40}}
                >
              <Text >Back</Text>
              </Button>
              <Button
                onPress={this.confirmEditing}
                >
              <Text >Submit</Text>
              </Button>
            </View>
        </View>
      </View>
    </Modal>    
    <FooterMenuOptions
    deleteAllTasks={this.deleteAllTasks}
    clearTaksByType={this.clearTaksByType}
    />
  </Container>
</Root>
);
}
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal:40
  },
  modalContent:{
    borderRadius:10,
    borderWidth:2,
    borderColor:'#5A6AF1',
    backgroundColor:'white',
    opacity:0.9,
    alignItems:'center'
  },
  imageStyles:{
    width:50,
    height:'100%',
    borderRadius:'50%',
    marginRight:10,
    borderWidth:1,
    borderColor:'#047aff'
  }
  })