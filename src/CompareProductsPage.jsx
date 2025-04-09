import { useLocation } from "react-router-dom";
import Card from "./components/Card";

export default function CompareProductsPage() {
	const location = useLocation();
	const { product1, product2 } = location.state || {};

	if (!product1 || !product2) {
		return <h2>Manca uno dei due prodotti da confrontare</h2>;
	}
	return (
		<div className="container mt-4 mb-4">
			<h1>Compara piu prodotti tra loro</h1>
			<div className="row row-cols-2 mt-4 g-3 text-center">
				<div className="col">
					<Card prop={product1} />
				</div>
				<div className="col">
					<Card prop={product2} />
				</div>
			</div>
		</div>
	);
}
