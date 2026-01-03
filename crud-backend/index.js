import express from 'express'
import cors from 'cors'
import e from 'express'




const app = express()
const port = 3000

app.use(cors)
app.use(express.json())

app.get('/',(req, res)=>{
    res.send(`<h1>Hello World</h1>`)
})
app.listen(port, ()=>{
    console.log(`this ${port} is running`)
})