const express = require("express")
const cors = require("cors")


const app = express();
const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send("API is running,,")
})

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})