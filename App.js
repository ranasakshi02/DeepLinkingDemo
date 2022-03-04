import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
const App = () => {
  return (
    <View style={styles.body}>
      <WebView
        source={{
          uri: 'https://www.google.com'
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10
  }

});

export default App;
