import React from 'react';
import {View, Text, Button} from 'react-native';
import { daysArray, timesArray } from './constants';


const DevicesListView = ({navigation}) => {
  const devices = [
    {
      name: 'Thermostat',
      scheduleProps: {
        days: daysArray,
        times: timesArray,
        defaultValue: 21,
        minValue: 15,
        maxValue: 35,
        valueLabel: 'Temperature',
        unit: '°C',
        isToggle: false,
      },
    },
    {
      name: 'Light',
      scheduleProps: {
        days: daysArray,
        times: timesArray(),
        defaultValue: 0,
        minValue: 0,   // Off State
        maxValue: 1,   // On State        
        valueLabel: 'Light',
        unit: '', // No unit for lights as it's just on off
        isToggle: true,

      },
    },
  ];

  return (
    <View>
      {devices.map((device, index) => (
        <View key={index}>
          <Text>{device.name}</Text>
          <Button
            title={`Schedule ${device.name}`}
            onPress={() =>
              navigation.navigate('DeviceScheduler', {
                items: device.scheduleProps,
                title: `${device.name} Scheduler`,
              })
            }
          />
        </View>
      ))}
    </View>
  );
};

export default DevicesListView;
