import express from "express";

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("You reached the App!");
})

app.listen(PORT, () => {
    console.log(`Server listening in ${PORT}`);
})



