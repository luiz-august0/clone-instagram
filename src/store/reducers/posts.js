import { ADD_COMMENT, ADD_POST } from "../actions/actionTypes";

const initialState = {
	posts: [{
		id: Math.random(),
		nickname: 'Luiz Augusto Marques',
		email: 'luizaugustom@hotmail.com',
		image: require('../../../assets/imgs/fence.jpg'),
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
	}]
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST:
			return {
				...state,
				posts: state.posts.concat({
					...action.payload
				})
			}
		case ADD_COMMENT:
			return {
				...state,
				posts: state.posts.map(post => {
					if (post.id === action.payload.postId) {
						if (post.comments) {
							post.comments = post.comments.concat(
								action.payload.comment
							)
						} else {
							post.comments = [action.payload.comment]
						}
					}
					return post
				})
			}
		default :
			return state
	}
}

export default reducer