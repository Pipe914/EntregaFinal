import React, {Component} from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./components/HomeScreen.js";
import WebViewComponent from "./components/WebViewComponent.js";
import { MovieProvider } from "./contexts/MovieContexts.js";
import MovieList from "./components/MovieList.js";
import AddMovieForm from "./components/MovieForm.js";
import MovieDetails from "./components/MovieDetails.js";

const Stack = createStackNavigator();

class App extends Component {

  render() {
    return (
      <MovieProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="MovieList" component={MovieList} />
            <Stack.Screen name="AddMovie" component={AddMovieForm} />
            <Stack.Screen name="WebView" component={WebViewComponent} />
            <Stack.Screen name="MovieDetails" component={MovieDetails} />
          </Stack.Navigator>
        </NavigationContainer>
      </MovieProvider>
    );
  }
}

export default App;
