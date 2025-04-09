import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

export default function Card({ prop }) {
	const { products, handleClick, isProductLiked } = useContext(GlobalContext);
	return (
		<div className="card border-black">
			<h5 className="card-title mt-2">
				{prop.title}, {prop.brand}
			</h5>
			<h6 className="card-subtitle text-body-secondary">
				{prop.release_year}, {prop.price} euro
			</h6>
			{
				<span className="heart mt-2 me-2" onClick={() => handleClick(prop.id)}>
					<FontAwesomeIcon
						icon={isProductLiked(prop.id) ? solidHeart : regularHeart}
						className="fa-xl"
					/>
				</span>
			}
			<Link className="card-body" to={`/products/${prop.id}`}>
				<img src={prop.image} alt={prop.title} />
			</Link>
		</div>
	);
}
