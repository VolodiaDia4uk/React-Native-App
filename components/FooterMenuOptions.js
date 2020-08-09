import React from 'react';
import {Footer, FooterTab, Button, Text} from 'native-base';
import { StyleSheet } from 'react-native';

export default function FooterMenuOptions(props) {
  
    const{clearTaksByType,deleteAllTasks} = props
    return (
        <Footer >
          <FooterTab style={{backgroundColor:'white',borderTopWidth:1,borderColor:'#047aff'}}>
            <Button transparent onPress={()=>clearTaksByType('doneTasks')}>
              <Text style={styles.elements}>Remove Not Done Tasks</Text>
            </Button>
            <Button  info style={{justifyContent:'center',backgroundColor:'#047aff'}} onPress={()=>deleteAllTasks()}>
              <Text style={{color:'white',textAlign:'center',fontSize:12}}>Delete All Tasks</Text>
            </Button>
            <Button transparent onPress={()=>clearTaksByType('notDoneTasks')}>
              <Text style={styles.elements}>Remove Done Tasks</Text>
            </Button>
          </FooterTab>
        </Footer>    );
  }

const styles = StyleSheet.create({
  elements: {
    textAlign:'center',
    fontSize:12,
  },
})