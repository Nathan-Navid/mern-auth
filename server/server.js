const express  = require ('express');
const app = express();
const port = 8000;
const cors = require('cors');
// app.use(cors());
// app.use(express.json());

const cookieParser = require ('cookie-parser')



require('dotenv').config();
require('./config/mongoose.config');

require('./routes/user.routes')(app);

app.use(cookieParser());
app.use(cors({credentials: true, origin:'http://localhost:3000'}))
app.use(express.json(), express.urlencoded({extended: true}));

// const AllMyShowRoutes = require ('./routes/show.routes');
// AllMyShowRoutes(app);

app.listen(port, () => console.log(`Listening on port: ${port}`))