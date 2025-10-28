import productModel from "../models/productModel.js";

const create = async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const resposne = new productModel({
            name,
            price,
            description
        });
        await resposne.save();
        res.status(201).json({ message: "Product add successFully!!", resposne });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const view = async (req, res) => {
    try {
        const resposne=await productModel.find({});
        if(!resposne)
        {
            return res.status(404).json({message:"Product is not found"});
        }
        res.status(200).json({products:resposne});
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export {create, view};

