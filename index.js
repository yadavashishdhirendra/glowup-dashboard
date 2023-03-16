const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//ROUTES
const authRoutes = require("./routes/auth.routes")
const coupans = require("./routes/coupan.routes")
const employees = require("./routes/employee.routes")
const bookings = require("./routes/bookings.routes")
const service = require("./routes/service.routes")
const cc=require("./routes/cc.routes")
require("dotenv").config();

// MONGODB CLOUD CONNECTION
mongoose.connect(process.env.DATABASE).then((data) => {
      console.log(`MONGODB CONNECTED WITH SERVER: ${data.connection.host}`)
}).catch(err => {
      console.log(err);
})

// MIDDLEWARES
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: "200mb", extended: true }))
app.use(cors())
app.use(bodyParser.urlencoded({
      limit: '200mb',
      extended: true
}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use("/api/v2", authRoutes)
app.use("/api/v2",coupans)
app.use("/api/v2",employees)
app.use("/api/v2",bookings)
app.use("/api/v2",service)
app.use("/api/v2/customer-care", cc)
if (process.env.NODE_ENV === "production") {
      //Set static folder
      app.use(express.static("glowup-ui/build"));
      app.get("*", (req, res) => {
            res.sendFile(path.resolve(__dirname, "glowup-ui", "build", "index.html"));
      });
}
app.listen(PORT, () => {
      console.log("server started", PORT)
})