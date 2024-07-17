import { useState, useEffect } from 'react';
import { Image, StyleSheet, Platform, Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function HomeScreen() {
  const [isOpen, setIsOpen] = useState(false); // make this null at the start

  useEffect(() => {
    // Fetch the current status when the component mounts
    const fetchStatus = async () => {
      try {
        const response = await axios.get('http://192.168.50.219/status');
        setIsOpen(response.data.status === 'open');
        console.log('isOpen --> ' + response.data.status)
      } catch (error) {
        console.error('Error fetching status:', error);
      }
    };

    fetchStatus();
  }, []);

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
      if (endpoint === "curtain" && dir !== "stop") {
        setIsOpen(dir === "open");
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.topHalf}>
        <TouchableOpacity style={styles.button}
                          onPressIn={() => isOpen ? handlePost('curtain', 'close') : handlePost('curtain', 'open')}
        >
          <Text style={styles.buttonText}>{isOpen ? 'Close' : 'Open'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
                          onPressIn={() => handlePost('stop', 'stop')}
        >
          <Text style={styles.buttonText}>Stop</Text>
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
