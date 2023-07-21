const Product = require("../models/product")

const getAllProductsStatic = async (req, res) => {
	// throw new Error('async Error')
	// const products = await Product.find({}).sort('name -price')
	// const products = await Product.find({}).select('name featured')
	const products = await Product.find({
		price: {
			$lt: 50,
			$gt: 40
		}
	}).sort('price')
	res.status(200).json({
		qul: products.length,
		products,
	})
}
const getAllProducts = async (req, res) => {
	const body = {}
	const {
		name,
		featured,
		company,
		sort,
		fields,
		limit,
		page,
		maxPrice,
		minPrice
	} = req.query

	if (name) body.name = {
		$regex: name,
		$options: 'i'
	};
	if (featured) body.featured = featured;
	if (company) body.company = company;
	if (maxPrice) body.price = {
		...body.price,
		$lte: +maxPrice
	};
	if (minPrice) body.price = {
		...body.price,
		$gte: +minPrice,
	};
	let result = Product.find(body)

	if (sort) {
		const sortList = sort.split(',').join(' ')
		result = result.sort(sortList)
	} else {
		result = result.sort('creatAt')
	}

	if (fields) {
		const fieldsList = fields.split(',').join(' ')
		result = result.select(fieldsList)
	}

	const limitProducts = +limit || 10
	const pageProducts = +page || 1
	const skip = (pageProducts - 1) * limitProducts
	result.limit(limitProducts).skip(skip)


	const products = await result
	res.status(200).json({
		qul: products.length,
		products,
	})
}

module.exports = {
	getAllProducts,
	getAllProductsStatic
}