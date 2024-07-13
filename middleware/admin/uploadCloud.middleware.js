const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
//cloudinary
cloudinary.config({
  cloud_name: "dhusa5qqi",
  api_key: "217684452319191",
  api_secret: "gUE34VwepA7N_6QvjcB5ZW-YPa4"
});
//end cloudinary

module.exports.upload = (req, res, next) => {
  if (req.file) {
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    async function upload(req) {
      let result = await streamUpload(req);

      req.body[req.file.fieldname] = result.secure_url;
      next();
    }

    upload(req);
  } else {
    next();
  }
};
