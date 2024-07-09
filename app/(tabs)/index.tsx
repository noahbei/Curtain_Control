import { Image, StyleSheet, Platform, Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function HomeScreen() {
  const handlePost = async (endpoint : string, dir : string) => {
    console.log(`${dir} started`);
    try {
      const {data} = await axios.post('http://192.168.50.219/' + endpoint, {
        direction: dir
      }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
      console.log('Response:', data);
      // Handle success
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.topHalf}>
        <TouchableOpacity style={styles.button}
                          onPressIn={() => handlePost('curtain', 'open')}
        >
          <Text style={styles.buttonText}>Open</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
                          onPressIn={() => handlePost('curtain', 'close')}
        >
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.bottomHalf}>
        <TouchableOpacity style={styles.button}
                          onPressIn={() => handlePost('rotate', 'clockwise')}
                          onPressOut={() =>handlePost('rotate', 'stop')}
        >
          <Text style={styles.buttonText}>Rotate Left</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
                          onPressIn={() => handlePost('rotate', 'counterclockwise')}
                          onPressOut={() =>handlePost('rotate', 'stop')}
        >
          <Text style={styles.buttonText}>Rotate Right</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
                          onPressIn={() => handlePost('rotate', 'stop')}
        >
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  topHalf: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: "black"
  },
  bottomHalf: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: "yellow"
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
