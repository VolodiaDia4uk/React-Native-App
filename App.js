import React, { useState,useEffect } from 'react';
import { View, Text, Button, Image,StyleSheet,AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './screens/Login';
import Registration from './screens/Registration';
import Main from './screens/Main';

const Stack = createStackNavigator();

export default function App(props) {
const ref = React.useRef(null);
  return (
    <NavigationContainer ref={ref}> 
      <Stack.Navigator >
        <Stack.Screen 
        name="Login" 
        component={Login}
        options={{
          headerLeft:()=> null
        }}
        />
        <Stack.Screen 
        name="Registration" 
        component={Registration}
        options={{
          headerLeft:()=> null
        }} />
        <Stack.Screen
        name="Main"
        options={{
          title:null,
          headerLeft:()=> <Button title='Login' onPress={()=>ref.current && ref.current.navigate('Login')}/>,
        }}
         component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});
