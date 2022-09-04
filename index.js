import express from 'express'
import session from 'express-session'
import cors from 'cors'
// Use SequelizeStore to save login user
import SequelizeStore from 'connect-session-sequelize'
// Import config db
import { db } from './config/Database.js'
// Import all routes
import router from './routes/routes.js'
// Configure dotenv
import dotenv from 'dotenv'
dotenv.config()

// Initialize Express app
const app = express()

// Configure store
const sessionStore = SequelizeStore(session.Store)
const store = new sessionStore({
    db: db
});

// Configure express can able to use json in response or request
app.use(express.json())

// Configure file to static folder public
app.use(express.static('public'))

// Configure express can able to use cors
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}))

// Configure express can able to use session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}))

//generate sync session
// store.sync()

// Defining All Routes 
app.use(router)

// Running app express
app.listen(process.env.APP_PORT, ()=>{
    console.log('Server up and running at port : ' + process.env.APP_PORT)
})