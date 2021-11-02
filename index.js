const express =require('express');
const app=express();
const bodyParser=require('body-parser');
const cors = require('cors')

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
//Routers
const userRouter=require('./routes/User')
app.use(userRouter);

app.listen(5000,(err)=> {
    if (err) return console.log(err);
    console.log('Server running on port 5000')
});


