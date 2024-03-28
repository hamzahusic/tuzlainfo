const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/kategorijaRoutes");
const objavaRoutes = require("./routes/objavaRoutes");

app.use(express.json());
app.use(bodyParser.json())
app.use(cors());

const PORT = 4003;

app.use("/user",userRoutes);
app.use("/category",categoryRoutes);
app.use("/objava",objavaRoutes);

app.listen(PORT, () => {
    console.log("Server is listening to port " + PORT)
})