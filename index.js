const app = require("./server/app.js");;
const PORT = process.env.PORT ;


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
});
