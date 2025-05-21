import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";
import Heart from "./Heart";
import Description from "./Description";
import React from "react";

function ComparisonCard({ prop }) {
	const { backgroundColorBadge } = useContext(GlobalContext);
	// console.log("Rendering Card:", prop.id);
	return (
		<div className="card ">
			<div className="row mb-2">
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
				<div className="col-12 titolo-card">
					<h5 className="card-title mt-2">
						{prop.title}, {prop.brand}
					</h5>
					<h6 className="card-subtitle text-body-secondary">
						{prop.release_year}, <strong>{prop.price} euro</strong>
					</h6>
				</div>
			</div>

			<Link to={`/products/${prop.id}`}>
				<div className="card-body h-100">
					<div className="image-product">
						<img src={prop.image} alt={prop.title} className="img-fluid" />
					</div>
					<div>
						<Description prop={prop} />
					</div>
				</div>
			</Link>
		</div>
	);
}
export default React.memo(ComparisonCard);
