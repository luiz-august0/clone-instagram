import React from 'react'
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import App from './src/App'
import {name as appName} from './app.json';
import * as Font from 'expo-font';
import Axios from 'axios';

Axios.defaults.baseURL = 'https://cloneinstagram-e11cc-default-rtdb.firebaseio.com/'

import storeConfig from './src/store/storeConfig';

let customFonts = {
    'shelter': require('./assets/fonts/shelter.otf')
};

const store = storeConfig();


export default class Redux extends React.Component {
    state = {
        fontsLoaded: false,
    };

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }

    componentDidMount() {
        this._loadFontsAsync();
    }

    render() {
        if (!this.state.fontsLoaded) {
            return null;
        }
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}

AppRegistry.registerComponent(appName, () => Redux);