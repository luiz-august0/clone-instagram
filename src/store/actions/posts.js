import { 
	SET_POSTS, 
	ADD_COMMENT, 
	CREATING_POSTS, 
	POST_CREATED 
} from "./actionTypes";
import { setMessage } from "./message";
import Axios from "axios";

export const addPost = post => {
	return dispatch => {
		dispatch(creatingPost())
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
			.catch(err => {
				dispatch(setMessage({
					title: 'Erro',
					text: 'Ocorreu um erro inesperado!'
				}))
			})
			.then(resp => {
				post.image = resp.data.imageUrl
				Axios.post('/posts.json', { ...post })
					.catch(err => {
						dispatch(setMessage({
							title: 'Erro',
							text: 'Ocorreu um erro inesperado!'
						}))
					})
					.then(res => {
						dispatch(getPosts())
						dispatch(postCreated())
						dispatch(setMessage({
							title: 'Sucesso',
							text: 'Nova postagem realizada!'
						}))
					})
			})
	}
	// return {
	// 	type: ADD_POST,
	// 	payload: post
	// }
}

export const addComment = payload => {
	return dispatch => {
		Axios.get(`/posts/${payload.postId}.json`)
			.catch(err => {
				dispatch(setMessage({
					title: 'Erro',
					text: 'Ocorreu um erro inesperado!'
				}))
			})
			.then(res => {
				const comments = res.data.comments || []
				comments.push(payload.comment)
				Axios.patch(`/posts/${payload.postId}.json`, { comments })
					.catch(err => console.log(err))
					.then(res => {
						dispatch(getPosts())
					})
			})
	}
	/*return {
		type: ADD_COMMENT,
		payload
	}*/
}

export const setPosts = posts => {
	return {
		type: SET_POSTS,
		payload: posts
	}
}

export const getPosts = () => {
	return dispatch => {
		Axios.get('/posts.json')
			.catch(err => {
				dispatch(setMessage({
					title: 'Erro',
					text: 'Ocorreu um erro inesperado!'
				}))
			})
			.then(res => {
				const rawPosts = res.data
				const posts = []
				for (let key in rawPosts) {
					posts.push({
						...rawPosts[key],
						id: key
					})
				}

				dispatch(setPosts(posts.reverse()))
			})
	}
}

export const creatingPost = () => {
	return {
		type: CREATING_POSTS
	}
}

export const postCreated = () => {
	return {
		type: POST_CREATED
	}
}