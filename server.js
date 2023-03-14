const express=require('express')
const app=express()
const morgan=require('morgan')
const mongoose=require('mongoose')
const bodyParser =require('body-parser')
const PersonRoute=require('./routes/person')

mongoose.connect('mongodb://127.0.0.1:27017/checkpoint',{ useNewUrlParser: true, useUnifiedTopology: true })
const db=mongoose.connection
db.on('error',(err)=>console.log(err))
db.once('open',()=>{console.log("database connection established!")})
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const PORT=process.env.Port || 3000
app.listen(PORT,()=>
{console.log(`server is running on port ${PORT}`)})
app.use('/api/person',PersonRoute)