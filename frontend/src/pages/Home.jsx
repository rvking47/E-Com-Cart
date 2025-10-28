import React from 'react'
import ProductList from '../components/ProductList'
import Navigation from '../components/Navigation'

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main className="container mx-auto px-4 py-6">
                <ProductList />
            </main>
        </div>
    )
}

export default Home