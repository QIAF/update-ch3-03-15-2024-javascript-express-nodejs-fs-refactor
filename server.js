const app = require("./app"); //import ke app js

const PORT = 8000; // panggil port

app.listen(PORT,() => {
    console.log(`App Running on Port :${PORT}`)
});

