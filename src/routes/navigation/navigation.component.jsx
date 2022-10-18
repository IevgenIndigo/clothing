import {Outlet} from "react-router-dom";
import {Fragment, useContext} from "react";

import {ReactComponent as CrwnLogo} from "../../assets/crown.svg";
import {LogoContainer, NavigationContainer, NavLink, NavLinks} from './navigation.styles';
import {UserContext} from "../../contexts/user.context";
import {signOutUser} from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {CartContext} from "../../contexts/cart.context";

const Navigation = () => {
	const {currentUser} = useContext(UserContext);
	const {isCartOpen} = useContext(CartContext);

	const signOutHandler = async () => {
		await signOutUser();
	}

	return (
		<Fragment>
			{/*<div className="navigation">
				<Link className='logo-container' to='/'>
					<CrwnLogo className='logo'/>
				</Link>
				<div className="nav-links-container">
					<Link className='nav-link' to='/shop'>
						SHOP
					</Link>

					{
						currentUser
							? (<span className='nav-link' onClick={signOutHandler}>SIGN OUT</span>)
							: (<Link className='nav-link' to='/auth'>SIGN IN</Link>)
					}

					<CartIcon/>
				</div>
				{
					isCartOpen ? <CartDropdown/> : null
				}
			</div>*/}
			<NavigationContainer>
				<LogoContainer to='/'>
					<CrwnLogo className='logo'/>
				</LogoContainer>
				<NavLinks>
					<NavLink to='/shop'>
						SHOP
					</NavLink>

					{
						currentUser
							? (<NavLink as='span' onClick={signOutHandler}>SIGN OUT</NavLink>)
							: (<NavLink to='/auth'>SIGN IN</NavLink>)
					}

					<CartIcon/>
				</NavLinks>
				{
					isCartOpen ? <CartDropdown/> : null
				}
			</NavigationContainer>
			<Outlet/>
		</Fragment>
	)
}

export default Navigation;