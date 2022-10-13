import CategoryItem from "../component-item/category-item.component";
import './directory.component.scss';

const Directory = ({categories}) => {
	return (
		<div className='directory-container'>
			{categories.map((category) => {
				return (
					<CategoryItem key={category.id} category={category}/>
				)
			})}
		</div>
	)
}

export default Directory;