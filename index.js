const express = require('express');
const cors = require('cors');
const { connection } = require('./db.js');
const { router } = require('./Routes/form.routes.js');

const app = express();
app.use(cors()); 
app.use(express.json());

app.use("/userDetails", router); 

const port = 8090; 

app.listen(port, async () => {
    try {
        await connection;
        console.log(`Server is running on port ${port}`);
    } catch (err) {
        console.error(err);
    }
});
