import { ADD_POST, ADD_COMMENT } from "./actionTypes";
import Axios from "axios";

export const addPost = post => {
	return dispatch => {
		const image = new FormData()
		image.append('image',{
			name: "imageToSave",
			type: 'image/jpg',
			uri: post.image.uri
		})

		Axios({
			url: 'uploadImage',
			baseURL: 'http://192.168.0.105:5000',
			method: 'post',
			data: image
		})
			.catch(err => console.log(err))
			.then(resp => {
				post.image = resp.data.imageUrl
				Axios.post('/posts.json', { ...post })
					.catch(err => console.log(err))
					.then(res => console.log(res.data))
			})
	}
	// return {
	// 	type: ADD_POST,
	// 	payload: post
	// }
}

export const addComment = payload => {
	return {
		type: ADD_COMMENT,
		payload
	}
}