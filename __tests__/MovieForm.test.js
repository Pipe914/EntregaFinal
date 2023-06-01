import React from "react";
import { cleanup } from "@testing-library/react-native";

import AddMovieForm from "../components/MovieForm.js";

afterEach(cleanup);

describe('AddMovieForm_function', () => {

    // Tests that the handleSubmit function successfully adds a valid movie to the Firebase database and clears the form fields.
    it("test_submit_valid_movie", async () => {
        const addFavoriteMock = jest.spyOn(global, 'addToFirebase').mockImplementation(() => Promise.resolve(true));
        const alertMock = jest.spyOn(global, 'alert').mockImplementation(() => {});

        const wrapper = shallow(<AddMovieForm />);
        const tituloInput = wrapper.find('TextInput').at(0);
        const directorInput = wrapper.find('TextInput').at(1);
        const yearInput = wrapper.find('TextInput').at(2);
        const productoraInput = wrapper.find('TextInput').at(3);
        const generoInput = wrapper.find('TextInput').at(4);
        const presupuestoInput = wrapper.find('TextInput').at(5);
        const submitButton = wrapper.find('Button');

        tituloInput.simulate('changeText', 'The Godfather');
        directorInput.simulate('changeText', 'Francis Ford Coppola');
        yearInput.simulate('changeText', '1972');
        productoraInput.simulate('changeText', 'Paramount Pictures');
        generoInput.simulate('changeText', 'Drama');
        presupuestoInput.simulate('changeText', '6000000');

        await submitButton.props().onPress();

        expect(addFavoriteMock).toHaveBeenCalledWith({
            objectToSave: {
                titulo: 'The Godfather',
                director: 'Francis Ford Coppola',
                year: '1972',
                productora: 'Paramount Pictures',
                genero: 'Drama',
                presupuesto: '6000000',
            },
        }, "FavoritosNative");
        expect(alertMock).toHaveBeenCalledWith("Agregado a favoritos");

        expect(tituloInput.props().value).toBe('');
        expect(directorInput.props().value).toBe('');
        expect(yearInput.props().value).toBe('');
        expect(productoraInput.props().value).toBe('');
        expect(generoInput.props().value).toBe('');
        expect(presupuestoInput.props().value).toBe('');

        addFavoriteMock.mockRestore();
        alertMock.mockRestore();
    });

    // Tests that the handleSubmit function displays an alert after successfully adding a movie to the Firebase database.
    it("test_display_alert", async () => {
        const addFavoriteMock = jest.spyOn(global, 'addToFirebase').mockImplementation(() => Promise.resolve(true));
        const alertMock = jest.spyOn(global, 'alert').mockImplementation(() => {});

        const wrapper = shallow(<AddMovieForm />);
        const submitButton = wrapper.find('Button');

        await submitButton.props().onPress();

        expect(alertMock).toHaveBeenCalledWith("Agregado a favoritos");

        addFavoriteMock.mockRestore();
        alertMock.mockRestore();
    });

    // Tests that the handleSubmit function does not add a movie to the Firebase database if any of the fields are empty and does not clear the form fields.
    it("test_submit_empty_fields", async () => {
        const addFavoriteMock = jest.spyOn(global, 'addToFirebase').mockImplementation(() => Promise.resolve(true));
        const alertMock = jest.spyOn(global, 'alert').mockImplementation(() => {});

        const wrapper = shallow(<AddMovieForm />);
        const submitButton = wrapper.find('Button');

        await submitButton.props().onPress();

        expect(addFavoriteMock).not.toHaveBeenCalled();
        expect(alertMock).not.toHaveBeenCalled();

        addFavoriteMock.mockRestore();
        alertMock.mockRestore();
    });
});