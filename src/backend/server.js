// importing

import express from 'express'
import mongoose from 'mongoose'
import Messages from './db.js'
import Pusher from 'pusher'
import cors from 'cors'

import dotenv from 'dotenv'

// config dotenv
dotenv.config()

// app config

const app = express()
const port = process.env.PORT || 9000

// const pusher = new Pusher({
//   appId: "1692925",
//   key: "983ba4a957b97a70023b",
//   secret: "69df89c1370cf87769c9",
//   cluster: "us3",
//   useTLS: true
// });

// middleware

app.use(express.json())
app.use(cors())


// DB config

const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const connection_url = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.bz4au0j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(connection_url)

const db = mongoose.connection

db.once('open', () => {
    console.log('DB connected')

    const msgCollection = db.collection("messagecontents")
    const changeStream = msgCollection.watch()

    changeStream.on('change', (change) => {
        console.log(change)
        
        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument
            pusher.trigger('messages', 'inserted', 
                {
                    name: messageDetails.name,
                    message: messageDetails.message,
                    timeStamp: messageDetails.timeStamp,
                    received: messageDetails.received
                }
            )
        } else {
            console.log("Error triggering Pusher")
        }
    })
})

// api routes

// doesnt 
app.get('/dropdown/Subjects', (req, res) => {

    const major_list = ["Computer Science", "Creative Writing"];
    res.status(200).send(major_list);
})

// Must have API calls to puppeteer



// everything below is BS

app.get('/', (req, res) => res.status(200).send('hello world'))

app.get('/messages/sync', (req, res) => {
    Messages.find().then((data) => {
        res.status(200).send(data)
    }).catch((err) => {
        res.status(500).send(err)
    })
})

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body
    
    // Messages.create(dbMessage, (err, data) => {
    //     if (err) {
    //         res.status(500).send(err)
    //     } else {
    //         res.status(201).send(`new message created: \n ${data}`)
    //     }
    // })

    Messages.create(dbMessage).then((data) => {
        res.status(201).send(`new message created: \n ${data}`)
    }).catch((err) => {
        res.status(500).send(err)
        console.log(err)
    })
})

// listener

app.listen(port, () => console.log(`Listening on localhost:${port}`))

