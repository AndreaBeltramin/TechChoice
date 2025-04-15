import { Link } from "react-router-dom";
import Heart from "./Heart";
import Description from "./Description";

export default function ComparisonCard({ prop }) {
	return (
		<div className="card ">
			<div className="row mb-2">
				<div className="col-6 text-start ">
					<span className="badge text-bg-light mt-2 ms-2">{prop.category}</span>
				</div>
				<div className="col-6 text-end">
					{/* icona del cuore */}
					<Heart id={prop.id} />
				</div>
				<div className="col-12">
					<h5 className="card-title mt-2">
						{prop.title}, {prop.brand}
					</h5>
					<h6 className="card-subtitle text-body-secondary">
						{prop.release_year}, <strong>{prop.price} euro</strong>
					</h6>
				</div>
			</div>

			<Link to={`/products/${prop.id}`}>
				<div className="card-body">
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
