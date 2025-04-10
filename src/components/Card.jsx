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
			<div className="row">
				<div className="col-11">
					<h5 className="card-title mt-2">
						{prop.title}, {prop.brand}
					</h5>
					<h6 className="card-subtitle text-body-secondary">
						{prop.release_year}, <strong>{prop.price} euro</strong>
					</h6>
				</div>
				<div className="col">
					{/* icona del cuore */}
					{
						<span
							className="heart mt-2 me-2"
							onClick={() => handleClick(prop.id)}
						>
							<FontAwesomeIcon
								//se il prodotto ha il mi piace faccio vedere il cuore pieno sennò il cuore vuoto
								icon={isProductLiked(prop.id) ? solidHeart : regularHeart}
								className="fa-xl"
							/>
						</span>
					}
				</div>
			</div>

			{/* link per aprire la pagina di dettaglio del singolo prodotto */}
			<Link className="card-body" to={`/products/${prop.id}`}>
				<img src={prop.image} alt={prop.title} className="img-fluid" />
			</Link>
		</div>
	);
}
