import React, { useState, useEffect, } from 'react';
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
  const [url, setUrl] = useState('');
  useEffect(() => {
    DeepLinking.addScheme('https://');

    Linking.addEventListener('url', handleUrl);

    DeepLinking.addRoute('/www.google.com', (response) => {
      setResponse(response)
      console.log('r', response)
    })
    DeepLinking.addRoute('/www.google.com/password/reset/a123bkbh123jhjhsdfsdkfjkb?email=sakshi@gmail.com', (response) => {
      setResponse(response)
      console.log('r1', response)
      console.log('path', response.path)
      console.log('scheme', response.scheme)
      console.log('------');
      var queryregex = /[?&]([^=#]+)=([^&#]*)/g,
        params = {},
        match;
      while (match = queryregex.exec(url)) {
        params[match[1]] = match[2];

      }

      console.log(params)


      //path /www.google.com/password/reset/a123bkbh123jhjhsdfsdkfjkb?email=sakshi@gmail.com
      var resetRegex = /[-a-zA-Z0-9@:%._\+~#=]{2,25}/g, resetmatch;
      const resetparams = {}
        ;
      // while (resetmatch = resetRegex.exec(response.path)) {
      //   resetparams[resetmatch];
      // }
      // console.log('new->',resetparams)
      //console.log(resetRegex.test(response.path))
      resetmatch = url.match(resetRegex)
      if (resetmatch) {
        console.log(resetmatch.slice(-2, -1), 'done')

      }

    })
  

    Linking.getInitialURL().then((url) => {
      console.log(url)
      if (url) {
        //Linking.openURL(url)
        console.log('-->', url)
        setUrl(url)
      }
    }).catch(err => console.error('An error occurred', err))


    return () => {
      Linking.removeAllListeners('url', handleUrl)
    }
  }, [])

  
  const getPararams = () => {
    //queryparams
    var queryregex = /[?&]([^=#]+)=([^&#]*)/g,
      params = {},
      match;
    while (match = queryregex.exec(url)) {
      params[match[1]] = match[2];

    }

    console.log(params)

    //
    var resetRegex = /[-a-zA-Z0-9@:%._\+~#=]{2,25}/g, resetmatch;
    const resetparams = {}
      ;
    resetmatch = url.match(resetRegex)
    if (resetmatch) {
      console.log(resetmatch.slice(-2, -1), 'done')

    }
  }

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
        {/* <Button
          onPress={() => Linking.openURL('https://www.google.com')}
          title="Open https://www.google.com"
        />
        <Button
          onPress={() => Linking.openURL('https://www.google.com/password/reset/a123bkbh123jhjhsdfsdkfjkb?email=sakshi@gmail.com')}
          title="Open https://www.google.com/password/reset/a123bkbh123jhjhsdfsdkfjkb?email=sakshi@gmail.com"
        /> */}
        <Button
          onPress={() =>getPararams()}
          title={url}
        />
        {/* <Button
          onPress={() => Linking.openURL('example://test/100/details')}
          title="Open example://test/100/details"
        /> */}
      </View>


      {/* {console.log('response', response)} */}
      <View style={styles.container}>
        <Text style={styles.text}>{url.scheme ? `Url scheme: ${url.scheme}` : ''}</Text>
        <Text style={styles.text}>{url.path ? `Url path: ${url.path}` : ''}</Text>


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
