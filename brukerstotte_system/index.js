const express = require("express");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.static("build"));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});