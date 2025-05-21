import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";
import Heart from "./Heart";
import React from "react";

function Card({ prop }) {
	const { backgroundColorBadge } = useContext(GlobalContext);
	return (
		<div className="card homepage-card h-100">
			<div className="row align-items-center">
				<div className="col-6 text-start ">
					<span
						className={`badge text-bg-light mt-2 ms-2 p-2 ${backgroundColorBadge(
							prop.category
						)}`}
					>
						{prop.category}
					</span>
				</div>
				<div className="col-6 text-end">
					{/* icona del cuore */}
					<Heart id={prop.id} />
				</div>
				<div className="col-12">
					{/* link per aprire la pagina di dettaglio del singolo prodotto */}
					<Link className="card-body" to={`/products/${prop.id}`}>
						<h5 className="card-title">{prop.title}</h5>
						{prop.image && (
							<img src={prop.image} alt="img" className="img-fluid w-50 p-2" />
						)}
					</Link>
				</div>
			</div>
		</div>
	);
}

export default React.memo(Card);
