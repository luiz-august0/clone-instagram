import { 
    USER_LOGGED_IN, 
    USER_LOGGED_OUT,
    LOADING_USER,
    USER_LOADED
} from "./actionTypes"; 
import { setMessage } from "./message";
import Axios from "axios";

const authBaseUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
const API_KEY = 'AIzaSyCvi1iXC74mYg4DF4BBkypp3dWZGTH2GdY';

export const userLogged = user => {
    return {
        type: USER_LOGGED_IN,
        payload: user
    }
}

export const logout = () => {
    return {
        type: USER_LOGGED_OUT
    }
}

export const createUser = (user) => {
    return dispatch => {
        Axios.post(`${authBaseUrl}/signupNewUser?key=${API_KEY}`, {
            email: user.email,
            password: user.password,
            returnSecureToken: true
        })
            .catch(err => {
                dispatch(setMessage({
					title: 'Erro',
					text: 'Ocorreu um erro inesperado!'
				}))
            })
            .then(res => {
                if (res.data.localId) {
                    Axios.put(`/users/${res.data.localId}.json`, {
                        name: user.name
                    })
                        .catch(err => console.log(err))
                        .then(res => {
                            dispatch(setMessage({
                                title: 'Sucesso',
                                text: 'Usuário criado com sucesso!'
                            }))
                        })
                }
            })
    }
}

export const loadingUser = () => {
    return {
        type: LOADING_USER
    }
}

export const userLoaded = () => {
    return {
        type: USER_LOADED
    }
}

export const login = user => {
    return dispatch => {
        dispatch(loadingUser())
        Axios.post(`${authBaseUrl}/verifyPassword?key=${API_KEY}`, {
            email: user.email,
            password: user.password,
            returnSecureToken: true
        })
            .catch(err => {
                dispatch(setMessage({
					title: 'Erro',
					text: 'Ocorreu um erro inesperado!'
				}))
            })
            .then(res => {
                if (res.data.localId) {
                    Axios.get(`/users/${res.data.localId}.json`)
                        .catch(err =>{
                            dispatch(setMessage({
                                title: 'Erro',
                                text: 'Ocorreu um erro inesperado!'
                            }))
                        })
                        .then(res => {
                            user.password = null
                            user.name = res.data.name
                            dispatch(userLogged(user))
                            dispatch(userLoaded())
                        })                
                    }
            })
    }
}