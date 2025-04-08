import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useParams, useNavigate } from "react-router-dom";

export default function DetailPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { products } = useContext(GlobalContext);

	const productDetail = products.find((p) => p.id === parseInt(id));
	return (
		<div className="container mt-4">
			<h1>Dettaglio del prodotto {productDetail.title}</h1>
			<p>
				<img src={productDetail.image} alt={productDetail.title} />
			</p>
			<p>{productDetail.release_year}</p>
			<p>{productDetail.price} euro</p>
			<p>{productDetail.dispaly}</p>
			<p>{productDetail.cameras}</p>
			<p>{productDetail.chip}</p>
		</div>
	);
}
