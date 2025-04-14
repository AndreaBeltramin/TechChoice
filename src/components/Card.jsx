import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

export default function Card({ prop }) {
	const { products, handleClick, isProductLiked } = useContext(GlobalContext);

	return (
		<div className="card homepage-card h-100">
			<div className="row align-items-center">
				<div className="col-6 text-start ">
					<span className="badge text-bg-light mt-2 ms-2">{prop.category}</span>
				</div>
				<div className="col-6 text-end">
					{/* icona del cuore */}
					<FontAwesomeIcon
						//se il prodotto ha il mi piace faccio vedere il cuore pieno sennò il cuore vuoto
						icon={isProductLiked(prop.id) ? solidHeart : regularHeart}
						onClick={() => handleClick(prop.id)}
						className="fa-xl heart mt-2 me-2"
					/>
				</div>
				<div className="col-12">
					{/* link per aprire la pagina di dettaglio del singolo prodotto */}
					<Link className="card-body" to={`/products/${prop.id}`}>
						<h5 className="card-title">{prop.title}</h5>
					</Link>
				</div>
			</div>
		</div>
	);
}
