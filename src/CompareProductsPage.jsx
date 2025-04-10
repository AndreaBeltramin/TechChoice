import { useLocation } from "react-router-dom";
import ComparisonCard from "./components/ComparisonCard";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "./context/GlobalContext";
import { useEffect } from "react";

export default function CompareProductsPage() {
	useEffect(() => {
		document.body.style.overflow = "auto";
	}, []);

	const location = useLocation();
	const { product1, product2 } = location.state || {};
	const { products } = useContext(GlobalContext);

	const [firstSelectedProduct, setFirstSelectedProduct] = useState(
		"Seleziona un prodotto"
	);
	const [secondSelectedProduct, setSecondSelectedProduct] = useState(
		"Seleziona un prodotto"
	);
	console.log(firstSelectedProduct);
	console.log(secondSelectedProduct);
	let firstSmartphone;
	firstSmartphone = products.find((p) => p.title === firstSelectedProduct);
	console.log(firstSmartphone);
	let secondSmartphone;
	secondSmartphone = products.find((p) => p.title === secondSelectedProduct);
	console.log(secondSmartphone);

	if (!product1 || !product2) {
		return (
			<div className="container mt-4 mb-4">
				{product1 ? (
					<>
						<h2>
							Manca uno dei due prodotti da confrontare! Torna indietro e
							seleziona un altro prodotto.
						</h2>

						<Link to={`/products/${product1.id}`}>
							<button className="btn btn-primary">
								Torna alla pagina precedente
							</button>
						</Link>
					</>
				) : (
					<>
						<h2 className="mb-4">
							Seleziona due prodotti per confrontarli o{" "}
							{<Link to="/">torna alla pagina precedente</Link>}
						</h2>
						<div className="row row-cols-2">
							<div className="col">
								<select
									className="p-2"
									value={firstSelectedProduct}
									onChange={(e) => {
										setFirstSelectedProduct(e.target.value);
									}}
								>
									<option defaultValue="Seleziona un prodotto">
										Seleziona un prodotto
									</option>
									{products.map((p) => (
										<option key={p.id}>{p.title}</option>
									))}
								</select>
							</div>
							<div className="col">
								<select
									className="p-2"
									value={secondSelectedProduct}
									onChange={(e) => {
										setSecondSelectedProduct(e.target.value);
									}}
								>
									<option defaultValue="Seleziona un prodotto">
										Seleziona un prodotto
									</option>
									{products.map((p) => (
										<option key={p.id}>{p.title}</option>
									))}
								</select>
							</div>
							<div className=" row mt-4 g-3 text-center">
								<div className="col">
									{firstSmartphone !== undefined ? (
										<ComparisonCard prop={firstSmartphone} />
									) : (
										""
									)}
								</div>
							</div>
							<div className="row mt-4 g-3 text-center">
								<div className="col">
									{secondSmartphone !== undefined ? (
										<ComparisonCard prop={secondSmartphone} />
									) : (
										""
									)}
								</div>
							</div>
						</div>{" "}
					</>
				)}
			</div>
		);
	}
	return (
		<div className="container mt-4 mb-4">
			<h1>Comparazione prodotti</h1>
			<div className="row row-cols-2 mt-4 g-3 text-center">
				<div className="col">
					<ComparisonCard prop={product1} />
				</div>
				<div className="col">
					<ComparisonCard prop={product2} />
				</div>
			</div>
		</div>
	);
}
