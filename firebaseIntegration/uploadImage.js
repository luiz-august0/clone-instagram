import multer from "multer";

export const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "/tmp");
	},
	filename: (req, file, callback) => {
		callback(null, `imageToSave.jpg`);
	}
})