const app = require("./server/app.js");;
const PORT = process.env.PORT ;
const cloudinary=require("cloudinary");

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
});

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

