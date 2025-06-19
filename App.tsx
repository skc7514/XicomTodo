/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NewAppScreen } from '@react-native/new-app-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ImageListScreen from './src/screens/ImageListScreen';
import ImageDetailScreen from './src/screens/ImageDetailScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ImageList" screenOptions={{headerShown: false}}>
        <Stack.Screen name="ImageList" component={ImageListScreen} />
        <Stack.Screen name="ImageDetail" component={ImageDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

