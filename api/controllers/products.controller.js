import Product from "../models/product.model.js"
import { errorHandler } from "../utils/error.js"

export const products = async (req, res, next) => {
    const {title, description, image, price, category} = req.body
    if(title === '' || description === '' || image === '' || category === '' || price === ''){
        return next(errorHandler(500, 'All products forms must be filled'))
    }

    const newProduct = new Product({
        title,
        description,
        image,
        category,
        price
    })
    try {
        await newProduct.save()
        res.status(200).json(newProduct)
    } catch (error) {
        next(error)
    }
}

export const fetchProduct = async(req, res, next) => {
    try {
        const fetchProducts = await Product.findByIdAndUpdate(req.params._id,{
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            image: req.body.image,
            price: req.body.price
        }, {new: true})
        res.status(200).json(fetchProducts)
    } catch (error) {
        next(error)
    }
}

export const fetchAllProducts = async(req, res, next) =>{
    try {
        const products = await Product.find({
            ...(req.query.productId && { productId: req.query.productId }),
            ...(req.query.title && { title: req.query.title }),
            ...(req.query.description && { description: req.query.description }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.price && { price: req.query.price }),
            ...(req.query.image && { image: req.query.image }),
        })

        const totalProduct = await Product.countDocuments()

        res.status(200).json(products, totalProduct)
    } catch (error) {
        next(error)
    }
}