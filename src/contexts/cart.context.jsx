import {createContext, useEffect, useState} from "react";

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {
	},
	cartItems: [],
	addItemToCart: () => {
	},
	removeItemFromCart: () => {},
	clearItemFromCart: () => {},
	cartCount: 0,
	total: 0
});

const addCartItem = (cartItems, productToAdd) => {
	const existingCartItem = cartItems.find((cartItem) => {
		return cartItem.id === productToAdd.id;
	})

	if (existingCartItem) {
		return cartItems.map((cartItem) => {
			if (cartItem.id === productToAdd.id) {
				return {...cartItem, quantity: cartItem.quantity + 1}
			} else {
				return cartItem;
			}
		})
	}

	return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
	const existingCartItem = cartItems.find((cartItem) => {
		return cartItem.id === cartItemToRemove.id;
	});

	if (existingCartItem.quantity === 1) {
		return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
	}

	return cartItems.map((cartItem) => {
		if (cartItem.id === cartItemToRemove.id) {
			return {...cartItem, quantity: cartItem.quantity - 1}
		} else {
			return cartItem;
		}
	})
}

const clearCarItem = (cartItems, cartItemToClear) => {
	return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}

export const CartProvider = ({children}) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);
	const [total, setTotal] = useState(0);

	const addItemToCart = (productToAdd) => {
		const newCartItems = addCartItem(cartItems, productToAdd);
		setCartItems(newCartItems);
	}

	const removeItemFromCart = (itemToRemove) => {
		const newCartItems = removeCartItem(cartItems, itemToRemove);
		setCartItems(newCartItems);
	}

	const clearItemFromCart = (itemToClear) => {
		const newCartItems = clearCarItem(cartItems, itemToClear);
		setCartItems(newCartItems);
	}

	useEffect(() => {
		const totalItemsCount = cartItems.reduce((total, item) => {
			return total + item.quantity;
		}, 0);

		setCartCount(totalItemsCount);
	}, [cartItems]);

	useEffect(() => {
		const totalSum = cartItems.reduce((total, item) => {
			return total + item.quantity * item.price;
		}, 0)

		setTotal(totalSum);
	}, [cartItems]);

	const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, total}
	return (
		<CartContext.Provider value={value}>
			{children}
		</CartContext.Provider>
	)
}