import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Animated, Dimensions } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
const timeOfDayPeriod = Array("am", "pm");

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const TimePicker = () => {
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedTOD, setSelectedTOD] = useState(0);

  const hourScrollY = useRef(new Animated.Value(0)).current;
  const minuteScrollY = useRef(new Animated.Value(0)).current;
  const timeOfDayPeriodScrollY = useRef(new Animated.Value(0)).current;


  const { height } = Dimensions.get('window');
  const itemHeight = 50;
  const visibleItems = Math.floor(height / itemHeight / 2) * 2 + 1;

  const handleScroll = (scrollY : Animated.Value, setIndex : React.Dispatch<React.SetStateAction<number>> | React.Dispatch<React.SetStateAction<string>>, data: string[]) => {
    return Animated.event(
      [{ nativeEvent: { contentOffset: { y: scrollY } } }],
      {
        useNativeDriver: true,
        listener: (event : any) => {
          const offsetY = event.nativeEvent.contentOffset.y;
          const index = Math.round(offsetY / itemHeight) % data.length;
          setIndex((index + data.length) % data.length);
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.pickerContainer}>
        <AnimatedFlatList
          data={hours}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <Text style={styles.pickerText}>{item}</Text>}
          getItemLayout={(data, index) => (
            { length: itemHeight, offset: itemHeight * index, index }
          )}
          showsVerticalScrollIndicator={false}
          snapToInterval={itemHeight}
          decelerationRate="fast"
          onScroll={handleScroll(hourScrollY, setSelectedHour, hours)}
          style={styles.picker}
        />
        <Text style={styles.separator}>:</Text>
        <AnimatedFlatList
          data={minutes}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <Text style={styles.pickerText}>{item}</Text>}
          getItemLayout={(data, index) => (
            { length: itemHeight, offset: itemHeight * index, index }
          )}
          showsVerticalScrollIndicator={false}
          snapToInterval={itemHeight}
          decelerationRate="fast"
          onScroll={handleScroll(minuteScrollY, setSelectedMinute, minutes)}
          style={styles.picker}
        />
        <Text style={styles.separator}></Text>
        <AnimatedFlatList
          data={timeOfDayPeriod}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <Text style={styles.pickerText}>{item}</Text>}
          getItemLayout={(data, index) => (
            { length: itemHeight, offset: itemHeight * index, index }
          )}
          showsVerticalScrollIndicator={false}
          snapToInterval={itemHeight}
          decelerationRate="fast"
          onScroll={handleScroll(timeOfDayPeriodScrollY, setSelectedTOD, minutes)}
          style={styles.picker}
        />
      </View>
      <Text style={styles.selectedTime}>
        Selected Time: {`${hours[selectedHour]}:${minutes[selectedMinute]} ${timeOfDayPeriod[selectedTOD]}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 24,
    marginBottom: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    backgroundColor: "red"
  },
  picker: {
    height: 50,
    width: 100,
    backgroundColor: "blue",
    
  },
  pickerText: {
    fontSize: 32,
    height: 50,
    textAlign: 'center',
  },
  separator: {
    fontSize: 24,
    marginHorizontal: 10,
  },
  selectedTime: {
    marginTop: 20,
    fontSize: 24,
  },
});

export default TimePicker;
