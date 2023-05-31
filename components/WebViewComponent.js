import React from 'react';
import { WebView } from 'react-native-webview';

class MyWebComponent extends React.Component {
  render() {
    return (
      <WebView
        source={{ uri: ' https://200f-181-32-8-209.ngrok-free.app' }}
        style={{ marginTop: 20 }}
        />
    );
  }
}

export default MyWebComponent;