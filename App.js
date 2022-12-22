import React from 'react'
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import Navigator from './src/Navigator'
import {name as appName} from './app.json';
import * as Font from 'expo-font';

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
                <Navigator/>
            </Provider>
        )
    }
}

AppRegistry.registerComponent(appName, () => Redux);