import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions} from 'react-native';
import { Title, DefaultTheme, Colors, Provider as PaperProvider } from 'react-native-paper';
import { createStackNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import { Provider } from 'react-redux';
import MainStore from './Stores/MainStore';


const EasyTheme = {
  ...DefaultTheme,
  dark: true,
  cornerRadius: 15,
  headerHeight: 60,
  bottomHeight: 130,
  homeHGrouperAreaHeight: 250,
  screen: {
    height: Dimensions.get("screen").height
  },
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.blue800,
    accent: Colors.blue900,
    white: Colors.white
  }
};

class Startup extends React.Component {
  render() {
    return (
      <Provider store={MainStore}>
        <PaperProvider theme={EasyTheme}>
          <HomeScreen/>
        </PaperProvider>
      </Provider>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: Startup
  }
},
{
  headerMode: "none"
});

export default createAppContainer(AppNavigator);



