import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;

    const onAdd = (product, quantity) => {
        //check if product already in cart
        const checkProductInCart = cartItems.find((item) => item._id === product._id);
        
        //add product total price to previous price
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        //increase total quantity
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
        
        //if product already in cart
        if(checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
            if(cartProduct._id === product._id) return {
                ...cartProduct,
                quantity: cartProduct.quantity + quantity
            }
        })
            setCartItems(updatedCartItems);
        } else {
            //set new key to object product: quantity
            product.quantity = quantity;
            //add new item to cart
            setCartItems([...cartItems, { ...product }]);
        }
        
        //notification appears on page when successfully added product to cart
        toast.success(`${qty} ${product.name} added to the cart.`);
    }
    
    const toggleCartItemQuanitity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id)
        //index = cartItems.findIndex((product) => product._id === id);
        //never mutate the state with equal = sign, so don't use index to access cartItems
        const newCartItems = cartItems.filter((item) => item._id !== id)
    
        if(value === 'inc') {
          setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
          setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
          setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
        } else if(value === 'dec') {
          if (foundProduct.quantity > 1) {
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
          }
        }
    }

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
      }
    
      const decQty = () => {
        setQty((prevQty) => {
          if(prevQty - 1 < 1) return 1;
         
          return prevQty - 1;
        });
      }

    return (
        <Context.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                setShowCart,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuanitity
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);
