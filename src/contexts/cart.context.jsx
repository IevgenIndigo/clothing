import {createContext, useReducer} from "react";
import {createAction} from "../utils/reducer/reducer.utils";

export const CART_ACTION_TYPES = {
	SET_IS_CART_OPENED: 'SET_IS_CART_OPENED',
	SET_CART_ITEMS: 'SET_CART_ITEMS'
}

const cartReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case CART_ACTION_TYPES.SET_CART_ITEMS:
			return {
				...state,
				...payload
			}

		case CART_ACTION_TYPES.SET_IS_CART_OPENED:
			return {
				...state,
				isCartOpen: payload
			}

		default:
			throw new Error('unhandled typee');
	}
}

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
	cartCount: 0,
	total: 0
}

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
	const [ state, dispatch ] = useReducer(cartReducer, INITIAL_STATE);
	const { isCartOpen, cartCount, total, cartItems } = state;

	const setIsCartOpen = (isOpened) => {
		dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPENED, isOpened));
	}

	const updateCartItemsReducer = (newCartItems) => {
		const totalItemsCount = newCartItems.reduce((total, item) => {
			return total + item.quantity;
		}, 0);

		const totalSum = newCartItems.reduce((total, item) => {
			return total + item.quantity * item.price;
		}, 0);

		dispatch({
			type: CART_ACTION_TYPES.SET_CART_ITEMS,
			payload: {
				cartItems: newCartItems,
				cartCount: totalItemsCount,
				total: totalSum
			}
		})
	}

	const addItemToCart = (productToAdd) => {
		const newCartItems = addCartItem(cartItems, productToAdd);
		updateCartItemsReducer(newCartItems);
	}

	const removeItemFromCart = (itemToRemove) => {
		const newCartItems = removeCartItem(cartItems, itemToRemove);
		updateCartItemsReducer(newCartItems);
	}

	const clearItemFromCart = (itemToClear) => {
		const newCartItems = clearCarItem(cartItems, itemToClear);
		updateCartItemsReducer(newCartItems);
	}

	const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, total}
	return (
		<CartContext.Provider value={value}>
			{children}
		</CartContext.Provider>
	)
}