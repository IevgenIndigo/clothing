import {Outlet} from "react-router-dom";
import {Fragment} from "react";

import {ReactComponent as CrwnLogo} from "../../assets/crown.svg";
import {LogoContainer, NavigationContainer, NavLink, NavLinks} from './navigation.styles';
import {signOutUser} from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../store/user/user.selector";
import {selectIsCartOpen} from "../../store/cart/cart.selector";

const Navigation = () => {
	const currentUser = useSelector(selectCurrentUser);
	const isCartOpen = useSelector(selectIsCartOpen);

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