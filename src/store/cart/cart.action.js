import {createAction} from "../../utils/reducer/reducer.utils";
import {CART_ACTION_TYPES} from "./cart.types";

export const setIsCartOpen = (isOpened) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isOpened);

export const addItemToCart = (cartItems, productToAdd) => {
	const newCartItems = addCartItem(cartItems, productToAdd);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart = (cartItems, itemToRemove) => {
	const newCartItems = removeCartItem(cartItems, itemToRemove);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const clearItemFromCart = (cartItems, itemToClear) => {
	const newCartItems = clearCarItem(cartItems, itemToClear);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}


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
