import React, { useState, useEffect } from 'react';
import { Products, NavBar, Cart, Checkout } from './components';
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


const App = () => {
    const [products, setProducts] = useState([]);

    const [cart, setCart] = useState({});

    
    const [order, setOrder] = useState({});
    
    const [errorMessage, setErrorMessage] = useState('');

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setProducts(data);
    }

    const fetchCart = async () => {
       
        setCart(await commerce.cart.retrieve());

    }

    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);
        setCart(item.cart);
    }

    const handleUpdateCartQuantity = async (productId, quantity) => {
        const item = await commerce.cart.update(productId, {quantity});
        setCart(item.cart);
    }

    const handleRemoveFromCart = async (productId) => {
        const item = await commerce.cart.remove(productId);
        setCart(item.cart);
    }

    const handleEmptyCart = async () => {
        const item = await commerce.cart.empty();
        setCart(item.cart);
    }

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();
    
        setCart(newCart);
      };
    
      const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
          const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
    
          setOrder(incomingOrder);
    
          refreshCart();
        } catch (error) {
          setErrorMessage(error.data.error.message);
        }
      };

    useEffect(() => {
        fetchProducts()
        fetchCart();
    }, []);

    console.log(cart);

    return (
        <Router>
            <div>
                <NavBar totalItems={cart.total_items} />
                <Switch>
                    <Route exact path='/'>
                        <Products products={products} handleAddToCart={handleAddToCart} />
                    </Route>
                    <Route exact path='/cart'>
                        <Cart 
                            cart={cart}
                            handleEmptyCart={handleEmptyCart}
                            handleUpdateCartQuantity={handleUpdateCartQuantity}
                            handleRemoveFromCart={handleRemoveFromCart} 
                        />
                    </Route>
                    <Route exact path='/checkout'>
                        <Checkout 
                            cart={cart}
                            onCaptureCheckout={handleCaptureCheckout}
                        />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;