import React from 'react';
import {View, Text, Button} from 'react-native';


const DevicesListView = ({navigation}) => {
  const devices = [
    {
      name: 'Thermostat',
      scheduleProps: {
        days: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        times: ['08:00 AM', '09:00 AM', '10:00 AM'],
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
        days: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        times: ['08:00 AM', '09:00 AM', '10:00 AM'],
        defaultValue: 0,
        minValue: 0,   // Off State
        maxValue: 1,   // On State        
        valueLabel: 'Light',
        unit: '', // No unit for lights as it's just ON/OFF
        isToggle: true,

      },
    },
    // Add other devices here
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
