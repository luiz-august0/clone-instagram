import React, { Component } from 'react'
import { StyleSheet, FlatList, View } from 'react-native'  
import Header from '../components/Header'
import Post from '../components/Post'

class Feed extends Component {
    state = {
        posts: [{
            id: Math.random(),
            nickname: 'Luiz Augusto Marques',
            email: 'luizaugustom@hotmail.com',
            image: require('../../assets/imgs/fence.jpg'),
            comments: [{
                nickname: 'Julia',
                comment: 'Stunning!'
            }, {
                nickname: 'João',
                comment: 'Foto Linda!'
            }, {
                nickname: 'Leticia',
                comment: 'Foto Linda!'
            }]
        }, {
            id: Math.random(),
            nickname: 'Franciso de Sierra',
            email: 'francis00239912@hotmail.com',
            image: require('../../assets/imgs/bw.jpg'),
            comments: []
        }]
    }

    render() {
        return (
            <View style={styles.container}>
                <Header/>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) =>
                    <Post key={item.id} {...item}/>}/>
            </View>
        )   
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
})

export default Feed;