import React, { useState, useEffect ,} from 'react';
import {
  StyleSheet,
  View,
  Linking,
  Text,
  Button,
  
} from 'react-native';
import { WebView } from 'react-native-webview';
import DeepLinking from 'react-native-deep-linking';

const App = () => {
  //https://www.google.com/?name=arpit&&lastname=jain
  // var url='https://www.google.com/search?client=firefox-b-d&q=deep+linking+react+native'
  // const urlParams=new URLSearchParams('?client=firefox-b-d&q=deep+linking+react+native')
  // const myParam = urlParams.get('client');
  const [response, setResponse] = useState({})
  useEffect(() => {
    DeepLinking.addScheme('https://');

    Linking.addEventListener('url', handleUrl);

    DeepLinking.addRoute('/www.google.com', (response) => {
      setResponse( response )
      console.log('r', response)
    })
    DeepLinking.addRoute('/www.google.com/search?client=firefox-b-d&q=deep+link+react+native', (response) => {
      setResponse( response )
      console.log('r1', response)
      console.log('path',response.path)
      console.log('scheme',response.scheme)
      
    })

    Linking.getInitialURL().then((url) => {
      if (url) {
        Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err))


    return () => {
      Linking.removeAllListeners('url', handleUrl)
    }
  }, [])

  
  const handleUrl = ({ url }) => {
    Linking.canOpenURL(url).then((suported) => {
      if (suported) {
        DeepLinking.evaluateUrl(url);
      }
    })
  }

 return (
    // <View style={styles.body}>
    //   <WebView
    //     source={{
    //       uri: 'https://www.google.com'
    //     }}
    //   />
    //   <View>
    //     <Text>Value Of Url Parameter:{myParam}</Text>
    //   </View>
    // </View>
    <View style={styles.container}>
      <View style={styles.container}>
        <Button
          onPress={() => Linking.openURL('https://www.google.com')}
          title="Open https://www.google.com"
        />
        <Button
          onPress={() => Linking.openURL('https://www.google.com/search?client=firefox-b-d&q=deep+link+react+native')}
          title="Open https://www.google.com/search?client=firefox-b-d&q=deep+link+react+native"
        />
        {/* <Button
          onPress={() => Linking.openURL('example://test/100/details')}
          title="Open example://test/100/details"
        /> */}
      </View>


      {/* {console.log('response', response)} */}
      <View style={styles.container}>
        <Text style={styles.text}>{response.scheme ? `Url scheme: ${response.scheme}` : ''}</Text>
        <Text style={styles.text}>{response.path ? `Url path: ${response.path}` : ''}</Text>
      

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    margin: 10,
  },
});
export default App;
