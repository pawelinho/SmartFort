import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DeviceListView from './screens/DeviceListView';
import GenericSchedule from './components/GenericSchedule';
import {EventEmitterProvider} from './EventEmitterContext';

const Stack = createNativeStackNavigator();

function ThermostatScreen() {
  return (
    <EventEmitterProvider>
      <Stack.Navigator initialRouteName="Devices">
        <Stack.Screen name="Devices" component={DeviceListView} />
        <Stack.Screen name="DeviceScheduler" component={GenericSchedule} />
      </Stack.Navigator>
    </EventEmitterProvider>
  );
}

function HomeScreen() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="note" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Thermostat"
          component={ThermostatScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="note" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
