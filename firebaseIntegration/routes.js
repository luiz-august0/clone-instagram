import { Router } from "express";
import multer from "multer";
import { storage } from './uploadImage';
const upload = multer({ storage: storage });
const uuid = require('uuid-v4');
const { Storage } = require('@google-cloud/storage');
const storageFirebase = new Storage({
	projectId: 'cloneinstagram-e11cc',
	keyFilename: 'cloneinstagram.json'
})

const routes = new Router();

routes.post('/uploadImage', upload.single("image"), (req, response) => {
	try {
		const bucket = storageFirebase.bucket('gs://cloneinstagram-e11cc.appspot.com')
		const id = uuid()
		bucket.upload('/tmp/imageToSave.jpg', {
			uploadType: 'media',
			destination: `/posts/${id}.jpg`,
			metadata: {
				metadata: {
					contentType: 'image/jpeg',
					firebaseStorageDownloadTokens: id
				}
			}
		}, (err, file) => {
			if (err) {
				console.log(err)
				return response.status(500).json({ error: err })
			} else {
				const filename = encodeURIComponent(file.name)
				const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/'
					+ bucket.name + '/o/' + filename + '?alt=media&token=' + id
				return response.status(201).json({ imageUrl: imageUrl })
			}
		})
	} catch (err){
		console.log(err)
		return response.status(500).json({error: err})
	};
});

export default routes;