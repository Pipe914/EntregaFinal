import React from "react";
import { cleanup } from "@testing-library/react-native";

import HomeScreen from "../components/HomeScreen.js";

afterEach(cleanup);

describe('HomeScreen_class', () => {

    // Tests that the HomeScreen component renders a View with correct styles and text.
    it("test_home_screen_renders_correctly", () => {
        const wrapper = shallow(<HomeScreen />);
        expect(wrapper.find(View)).toHaveLength(1);
        expect(wrapper.find(Text)).toHaveLength(1);
        expect(wrapper.find(Pressable)).toHaveLength(3);
        expect(wrapper.find(Text).props().children).toEqual("Bienvenido a tu app de películas");
        expect(wrapper.find(View).props().style).toEqual(styles.container);
    });

    // Tests that each button in the HomeScreen component navigates to the correct screen when pressed.
    it("test_home_screen_buttons_navigate_correctly", () => {
        const navigateMock = jest.fn();
        const wrapper = shallow(<HomeScreen navigation={{ navigate: navigateMock }} />);
        wrapper.find(Pressable).at(0).simulate('press');
        expect(navigateMock).toHaveBeenCalledWith("MovieList");
        wrapper.find(Pressable).at(1).simulate('press');
        expect(navigateMock).toHaveBeenCalledWith("AddMovie");
        wrapper.find(Pressable).at(2).simulate('press');
        expect(navigateMock).toHaveBeenCalledWith("WebView");
    });

    // Tests that the HomeScreen component handles errors gracefully when navigating to undefined screens.
    it("test_home_screen_handles_errors_gracefully", () => {
        const navigateMock = jest.fn();
        const wrapper = shallow(<HomeScreen navigation={{ navigate: navigateMock }} />);
        wrapper.find(Pressable).at(0).simulate('press');
        expect(navigateMock).toHaveBeenCalledWith("MovieList");
        wrapper.setProps({ navigation: { navigate: undefined } });
        wrapper.find(Pressable).at(0).simulate('press');
        expect(navigateMock).toHaveBeenCalledTimes(1);
    });
});
