const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)

const app = express()

const conn = require('./db/conn')

const User = require('./models/User')
const Training = require('./models/Training')
const Exercise = require('./models/Exercise')

const TrainingController = require('./controller/TrainingController')

const trainingRoutes = require('./routes/trainingRoutes')
const exerciseRoutes = require('./routes/exercisesRoutes')

app.use(
    express.urlencoded({
        extended: true
    })
)

//Session middleware
app.use(
    session({
        name: "session",
        secret: "nosso_secret",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
            path: require('path').join(require('os').tmpdir(), 'sessions')
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    })
)

app.use(express.json())

app.use(express.static('public'))

app.use('/training', trainingRoutes)
app.use('/exercise', exerciseRoutes)
// app.use('/', authRoutes)

// app.post('/add', TrainingController.createTrainingPost)

conn.sync().then(() => {
    app.listen(3000)
})
.catch((err) => console.log(err))