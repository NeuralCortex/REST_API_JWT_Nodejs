let express = require("express")
let bodyParser = require('body-parser')
let cors = require("cors")

const loginRoute = require("./api/routes/login");
const dataRoutes = require("./api/routes/data");

let app = express()
let port = 5000

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

app.use(cors())

app.use("/login", loginRoute)
app.use("/data", dataRoutes)

app.listen(port, () => {
    console.log("Server listening on Port: " + port);
});