import React from 'react';
import {cleanup, render} from '@testing-library/react-native';
 
import App from '../App';
 
afterEach(cleanup);
 


describe('App_class', () => {

  // Tests that the App component renders with all screens.
  it("test_renders_app_with_all_screens", () => {
      const wrapper = shallow(<App />);
      expect(wrapper.find(MovieProvider)).toHaveLength(1);
      expect(wrapper.find(NavigationContainer)).toHaveLength(1);
      expect(wrapper.find(Stack.Navigator)).toHaveLength(1);
      expect(wrapper.find(Stack.Screen)).toHaveLength(5);
  });

  // Tests that the user can navigate to the MovieList screen.
  it("test_navigates_to_movie_list_screen", () => {
      const navigation = { navigate: jest.fn() };
      const wrapper = shallow(<HomeScreen navigation={navigation} />);
      wrapper.find(Pressable).at(0).simulate('press');
      expect(navigation.navigate).toHaveBeenCalledWith("MovieList");
  });

  // Tests that the MovieList screen handles an empty movie list.
  it("test_handles_empty_movie_list", () => {
      const navigation = { navigate: jest.fn() };
      const wrapper = shallow(<MovieList navigation={navigation} />);
      expect(wrapper.find(Text)).toHaveLength(1);
      expect(wrapper.find(Text).text()).toEqual("No tienes favoritos");
  });

  // Tests that the AddMovieForm screen handles invalid input.
  it("test_handles_invalid_input_in_add_movie_form", () => {
      const addFavoriteMock = jest.fn();
      const wrapper = shallow(<AddMovieForm addFavorite={addFavoriteMock} />);
      wrapper.find(Button).simulate('press');
      expect(addFavoriteMock).not.toHaveBeenCalled();
  });

  // Tests that the user can add a movie to the list.
  it("test_adds_movie_to_list", () => {
      const addFavoriteMock = jest.fn();
      const wrapper = shallow(<AddMovieForm addFavorite={addFavoriteMock} />);
      wrapper.find(TextInput).at(0).simulate('changeText', 'Test Movie');
      wrapper.find(TextInput).at(1).simulate('changeText', 'Test Director');
      wrapper.find(TextInput).at(2).simulate('changeText', '2022');
      wrapper.find(TextInput).at(3).simulate('changeText', 'Test Productora');
      wrapper.find(TextInput).at(4).simulate('changeText', 'Test Genero');
      wrapper.find(TextInput).at(5).simulate('changeText', '1000000');
      wrapper.find(Button).simulate('press');
      expect(addFavoriteMock).toHaveBeenCalled();
  });

  // Tests that the MovieDetails screen fetches movie details from Firebase.
  it("test_fetches_movie_details_from_firebase", () => {
      const route = { params: { name: "Test Movie" } };
      const wrapper = shallow(<MovieDetails route={route} />);
      expect(wrapper.find(Text)).toHaveLength(1);
      expect(wrapper.find(Text).text()).toEqual("Cargando...");
  });
});
