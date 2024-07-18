import { StyleSheet, Image, Platform, View, Button} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import  TimePicker from '@/components/TimePicker';

export default function TabTwoScreen() {
  const resetSelection = () => {

  };

  const confirmSelection = () => {
    
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Schedule Actions</ThemedText>
      </ThemedView>
      <TimePicker />
      <TimePicker />
      <View style={styles.buttonContainer}>
        <Button title='Reset Button' onPress={resetSelection}></Button>
        <Button title='Select Button' onPress={confirmSelection}></Button>
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
