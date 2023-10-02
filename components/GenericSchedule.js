import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { EventEmitterContext } from '../EventEmitterContext';

const GenericSchedule = ({ route }) => {
  
  const { items, title } = route.params;
  const { emit } = useContext(EventEmitterContext); // Consume Context to use emit
  const [schedules, setSchedules] = useState([]);
  const [selectedDay, setSelectedDay] = useState(items.days[0]);
  const [selectedTime, setSelectedTime] = useState(items.times[0]);
  const [value, setValue] = useState(items.defaultValue);

  const addSchedule = () => {
    const schedule = { id: Date.now(), day: selectedDay, time: selectedTime, value };
    setSchedules([...schedules, schedule]);
    emit('scheduleSet', {
      device: title,
      schedule,
    });
  };

  const removeSchedule = (id) => {
    const updatedSchedules = schedules.filter(schedule => schedule.id !== id);
    setSchedules(updatedSchedules);
  };

  const adjustValue = (delta) => {
    const newValue = value + delta;
    if (newValue >= items.minValue && newValue <= items.maxValue) setValue(newValue);
  };

  const toggleValue = () => {
    setValue(value === items.minValue ? items.maxValue : items.minValue);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Day:</Text>
        <Picker selectedValue={selectedDay} onValueChange={setSelectedDay} style={styles.picker}>
          {items.days.map(day => <Picker.Item key={day} label={day} value={day} />)}
        </Picker>

        <Text style={styles.label}>Time:</Text>
        <Picker selectedValue={selectedTime} onValueChange={setSelectedTime} style={styles.picker}>
          {items.times.map(time => <Picker.Item key={time} label={time} value={time} />)}
        </Picker>

        {items.isToggle ? (
          <Button title={value === items.minValue ? 'Off' : 'On'} onPress={toggleValue} />
        ) : (
          <View style={styles.adjustmentButtons}>
            <TouchableOpacity onPress={() => adjustValue(-1)} style={styles.button}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.value}>{value}{items.unit}</Text>
            <TouchableOpacity onPress={() => adjustValue(1)} style={styles.button}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        )}

        <Button title="Add Schedule" onPress={addSchedule} />
      </View>

      <ScrollView style={styles.schedules}>
        {schedules.map(schedule => (
          <View key={schedule.id} style={styles.scheduleItem}>
            <Text>{schedule.day} at {schedule.time} - {schedule.value}{items.unit}</Text>
            <Button title="Remove" onPress={() => removeSchedule(schedule.id)} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: 150,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
  },
  value: {
    marginHorizontal: 20,
    fontSize: 16,
  },
  schedules: {
    flex: 1,
  },
  scheduleItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default GenericSchedule;
