import { StyleSheet, Image, Platform, View, Button, Text} from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import  TimePicker from '@/components/TimePicker';
import axios from 'axios';

// should have a use effect that fetches the current schedule from the esp32 and update the TimePicker component
export default function TabTwoScreen() {
  // States for open time
  const [openHour, setOpenHour] = useState('01');
  const [openMinute, setOpenMinute] = useState('00');
  const [openTOD, setOpenTOD] = useState('am');

  // States for close time
  const [closeHour, setCloseHour] = useState('01');
  const [closeMinute, setCloseMinute] = useState('00');
  const [closeTOD, setCloseTOD] = useState('am');

  const [selectedTime, setSelectedTime] = useState({
    hour: '01',
    minute: '00',
    tod: 'am',
  });

  const handleTimeChange = (hour, minute, tod) => {
    setSelectedTime({ hour, minute, tod });
    //console.log(selectedTime.hour, selectedTime.minute, selectedTime.tod)
  };

  const resetSelection = () => {
    // on the client side, reset the times displayed
  };

  // send schedule info to esp32
  const confirmSelection = async (endpoint : string, time : object | JSON) => {
    console.log("selection confimation started");
    try {
      const {data} = await axios.post('http://192.168.50.219/' + endpoint, {
        scheduledTime: time
      }, {
        headers: {
          // MAYBE THIS NEEDS TO BE JSON
          'Content-Type': 'multipart/form-data'
        }
      }
    );
      console.log('Response:', data);
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Schedule Actions</ThemedText>
      </ThemedView>
      <Text>Open Time:</Text>
      <TimePicker 
        onTimeChange={handleTimeChange}
      />
      <Text>Close Time:</Text>
      <TimePicker 
        onTimeChange={handleTimeChange}
      />
      <View style={styles.buttonContainer}>
        <Button title='Reset Button' onPress={() => {resetSelection("schedule")}}></Button>
        <Button title='Select Button' onPress={() => {confirmSelection("schedule", selectedTime)}}></Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  buttonContainer: {
    // replace flex with better spacing option
    flex: .2,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    backgroundColor: "yellow",
  },
});
