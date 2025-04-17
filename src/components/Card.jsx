import { Link } from "react-router-dom";
import Heart from "./Heart";

function backgroundColor(category) {
	if (category === "Laptop") {
		return "laptop";
	} else if (category === "Tablet") {
		return "tablet";
	} else if (category === "Smartphone") {
		return "smartphone";
	} else return "bg-white";
}

export default function Card({ prop }) {
	return (
		<div className="card homepage-card h-100">
			<div className="row align-items-center">
				<div className="col-6 text-start ">
					<span
						className={`badge text-bg-light mt-2 ms-2 p-2 ${backgroundColor(
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
					</Link>
				</div>
			</div>
		</div>
	);
}
