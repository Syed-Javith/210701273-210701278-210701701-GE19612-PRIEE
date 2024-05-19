const express = require('express');
const connectToDB = require('./db');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const requestRoutes = require('./routes/request.routes')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

connectToDB();
app.use(express.json())
app.use(cors({
    credentials : true,
    methods : ['GET','POST','PUT','DELETE','PATCH'],
    allowedHeaders : ['Content-Type','Authorisation'],
    origin : ['http://localhost:4200','https://google-frontend.vercel.app']
}))
app.use(bodyParser.urlencoded({ extended : true }))
app.use('/',authRoutes)
app.use('/',foodRoutes)
app.use('/',requestRoutes)

app.listen(8000,() => {
    console.log("Server connected at PORT:8000");
});