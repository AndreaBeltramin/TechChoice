import { Link } from "react-router-dom";
import Heart from "./Heart";

export default function ComparisonCard({ prop }) {
	return (
		<div className="card h-100">
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
				<div>
					<img src={prop.image} alt={prop.title} className="img-fluid" />
				</div>

				<div className="card-body text-start">
					<ul>
						<li>
							<strong>Display:</strong> {prop.display}
						</li>
						<li>
							<strong>Cameras:</strong> {prop.cameras}
						</li>
						<li>
							<strong>Storage:</strong> {prop.storage}
						</li>
						<li>
							<strong>Chip:</strong> {prop.chip}
						</li>
						<li>
							<strong>Sim:</strong> {prop.sim}
						</li>
						<li>
							<strong>Bluetooth:</strong> {prop.bluetooth}
						</li>
						<li>
							<strong>Port:</strong> {prop.port}
						</li>
						<li>
							<strong>Network Connectivity:</strong> {prop.network_connectivity}
						</li>
						<li>
							<strong>Batteria:</strong> {prop.battery}
						</li>
						<li>
							<strong>Peso:</strong> {prop.weight}
						</li>
						<li>
							<strong>Dimensioni:</strong> {prop.dimensions}
						</li>
						<li>
							<strong>Sistema operativo:</strong> {prop.operating_system}
						</li>
					</ul>
				</div>
			</Link>
		</div>
	);
}
