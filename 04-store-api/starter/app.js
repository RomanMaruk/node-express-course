require('dotenv').config()
require('express-async-errors');

const express = require('express');
const app = express();

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

const connectDB = require('./db/connect');
const productRouter = require("./routes/products");

//middleware
app.use(express.json())

// routes
app.get('/', (req, res) => {
	res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
})

app.use('/api/v1/products', productRouter)

// product route
app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
	try {
		// conect DB
		await connectDB(process.env.MONGO_URI)
		app.listen(port, console.log(`Server is listening ${port}`))
	} catch (error) {
		console.log(error)

	}
}

start()