import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {EventEmitterContext} from '../EventEmitterContext';
import {daysArray, timesArray} from './constants';

const DeviceListView = ({navigation}) => {
  const {subscribe} = useContext(EventEmitterContext); // Consume Context to use subscribe

  useEffect(() => {
    // Subscribe to 'scheduleSet' event to handle it here
    const unsubscribe = subscribe('scheduleSet', async data => {
      try {
        await Promise.reject();
      } catch (error) {
        Alert.alert(
          'Request Failed',
          'Schedule did not save on the device correctly',
        );
      }
    });

    // Unsubscribe when the component is unmounted
    return () => unsubscribe();
  }, [subscribe]);

  const [devices, setDevices] = useState([
    {
      id: 1,
      name: 'Thermostat',
      isEditing: false,
      scheduleProps: {
        days: daysArray,
        times: timesArray(),
        defaultValue: 21,
        minValue: 15,
        maxValue: 35,
        valueLabel: 'Temperature',
        unit: '°C',
        isToggle: false,
      },
    },
    {
      id: 2,
      name: 'Smart Bulb',
      isEditing: false,
      scheduleProps: {
        days: daysArray,
        times: timesArray(),
        defaultValue: 0,
        minValue: 0, // Off State
        maxValue: 1, // On State
        valueLabel: 'Light',
        unit: '', // No unit for lights as it's just on off
        isToggle: true,
      },
    },
  ]);

  const toggleEditing = id => {
    setDevices(
      devices.map(device =>
        device.id === id ? {...device, isEditing: !device.isEditing} : device,
      ),
    );
  };
  const handleNameChange = (id, newName) => {
    if (!validateName(newName)) {
      Alert.alert(
        'Invalid Name',
        'Name must be between 1-20 characters long and cannot have special characters.',
      );
      return;
    }

    setDevices(
      devices.map(device =>
        device.id === id ? {...device, name: newName} : device,
      ),
    );
  };

  const validateName = name => {
    const regex = /^[a-zA-Z0-9 ]{1,20}$/;
    return regex.test(name);
  };

  // The devices would come from the backend once implemented

  return (
    <View>
      {devices.map((device, index) => (
        <View key={device.id} style={{margin: 10}}>
          {device.isEditing ? (
            <TextInput
              value={device.name}
              onChangeText={newName => handleNameChange(device.id, newName)}
              onBlur={() => toggleEditing(device.id)}
              autoFocus={true}
              style={{borderWidth: 1, borderColor: 'black', padding: 5}}
            />
          ) : (
            <TouchableOpacity onPress={() => toggleEditing(device.id)}>
              <Text>{device.name}</Text>
            </TouchableOpacity>
          )}

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

export default DeviceListView;
