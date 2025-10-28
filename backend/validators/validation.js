import Joi from "joi";

const validationProduct = async (req, res, next) => {
    try {
        const Schema = Joi.object({
            name: Joi.string().min(2).max(255).required(),
            price: Joi.number().required(),
            description: Joi.string().min(5).max(355).required(),
        });
        const { error } = Schema.validate(req.body);
        if (error) {
            res.status(402).json({
                message: "Bad request",
                errors: error.details.map((err) => ({
                    field: err.path[0],
                    message: err.message
                }))
            });
        }
        next();
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export default validationProduct;