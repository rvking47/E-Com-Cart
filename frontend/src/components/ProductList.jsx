import React, { useEffect, useState } from 'react'
import { Card, Container, Row } from 'react-bootstrap'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';


const base_url = "https://e-com-cart-5bca.onrender.com";

const ProductList = () => {
  const [products, getProducts] = useState([]);

  const handleFetch = async () => {
    try {
      const result = await axios.get(`${base_url}/api/products/view`, {
        validateStatus: () => true
      });
      console.log(result);
      if (result.status === 200) {
        getProducts(result.data.products);
      }
      else {
        toast.error("Failed to load products!!");
      }
    }
    catch (err) {
      toast.error("Server Error!!" + err.message);
    }
  }

  const handleAddtoCard = async (productId) => {
    try {
      const result = await axios.post(
        `${base_url}/api/cart`,
        { productId, qty: 1 },
        { validateStatus: () => true }
      );

      if (result.status === 201) {
        toast.success(result.data.message || "Added to cart!", { duration: 2500 });
      } else if (result.status === 200) {
        toast.success(result.data.message || "Cart updated!", { duration: 2500 });
      } else {
        toast.error(result.data.message || "Failed to add product!");
      }
    } catch (err) {
      toast.error("Server Error!! " + err.message);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <>
      <div className="heading-product my-2">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center italics-heading underline">Products</h1>
        <Container>
          <Row className="g-4 mt-3">
            {products.length > 0 ? (
              products.map(((val) => (
                <div key={val._id} className="col-lg-4 col-md-6 col-sm-12">
                  <Card className="shadow-lg border-0 hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
                    <Card.Body className="p-4">
                      <Card.Title className="text-xl font-semibold text-gray-800">
                        {val.name}
                      </Card.Title>
                      <Card.Text className="text-gray-600 mt-2">
                        {val.description}
                      </Card.Text>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-lg font-bold text-green-600">₹{val.price}</span>
                        <button onClick={() => handleAddtoCard(val._id)} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200">
                          Add to Cart
                        </button>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              )))
            ) : (
              <p>Products not found</p>
            )}
          </Row>
        </Container>
      </div>
      <Toaster />
    </>
  )
}

export default ProductList