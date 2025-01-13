const express = require('express')
const app = express()
require('dotenv').config()
const connectDB = require('./db/connect')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRouter = require('./routes/auth/auth-routes')
const adminProductsRouter = require('./routes/admin/products-routes')
const shopProductsRouter = require('./routes/shop/products-routes')
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes")
const adminOrderRouter = require("./routes/admin/order-routes")
const shopSearchRouter = require("./routes/shop/search-routes");
const bankAuthRouter = require("./routes/bank/bank-auth-route")
const bankActivityRouter = require("./routes/bank/bank-activity-route")


app.use(express.json())
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
)
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use('/api/shop/products', shopProductsRouter);
app.use('/api/shop/cart', shopCartRouter)
app.use('/api/shop/address', shopAddressRouter);
app.use('/api/shop/order', shopOrderRouter);
app.use('/api/admin/orders', adminOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use('/api/bank/auth', bankAuthRouter)
app.use('/api/bank/activity', bankActivityRouter)

app.get('/', (req,res) => {
  res.send(`<h1>Home Page</h1>`)
})


const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    // console.log(process.env.PAYPAL_SECRET_KEY, "Secret key")
    // console.log(process.env.PAYPAL_CLIENT_ID, "Client ID")
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error)
  }
}



start();