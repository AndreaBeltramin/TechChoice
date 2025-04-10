import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

export default function ComparisonCard({ prop }) {
	const { handleClick, isProductLiked } = useContext(GlobalContext);
	return (
		<div className="card h-100 ">
			<div className="row">
				<div className="col-11">
					<h5 className="card-title mt-2">
						{prop.title}, {prop.brand}
					</h5>
					<h6 className="card-subtitle text-body-secondary">
						{prop.release_year}, <strong>{prop.price} euro</strong>
					</h6>
					<div className="mt-3">
						<Link to={`/products/${prop.id}`}>
							<button className="btn btn-primary mb-2">
								Vai alla scheda completa
							</button>
						</Link>
					</div>
				</div>
				<div className="col">
					{
						<span
							className="heart mt-2 me-2"
							onClick={() => handleClick(prop.id)}
						>
							<FontAwesomeIcon
								icon={isProductLiked(prop.id) ? solidHeart : regularHeart}
								className="fa-xl"
							/>
						</span>
					}
				</div>
			</div>

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
		</div>
	);
}
