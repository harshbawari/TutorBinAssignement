import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../screens/SplashScreen';

const RootStack = createStackNavigator();

const splashScreen = ({ navigation }) => {
  return (
    <SplashScreen />
  );
}
const mainScreen = ({ navigation }) => {
  return (
    <View>

    </View>
  );
}

const RootStackNavigator = (props) => {

  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name='splash'
        component={splashScreen}
        options={{
          headerShown: false
        }}
      />
      <RootStack.Screen
        name='main'
        component={mainScreen}
        options={{
          headerShown: false
        }}
      />
    </RootStack.Navigator>
  );

}


export default RootStackNavigator;