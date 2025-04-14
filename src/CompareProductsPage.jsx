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
	const { products, showProduct } = useContext(GlobalContext);

	const [firstProductData, setFirstProductData] = useState(null || product1);
	const [secondProductData, setSecondProductData] = useState(null || product2);

	// creo una funzione per recuperare i dati dell'oggetto dal titolo
	const findProductByTitle = (title) => {
		return products.find((p) => p.title === title);
	};

	// fetch per recuperare tutti i dati di un prodotto partendo dal suo ID
	async function fetchFirstProduct(productId) {
		try {
			const response = await fetch(
				`http://localhost:3001/products/${productId}`
			);
			const data = await response.json();
			// console.log(data.product);
			// setto i dati del secondo prodotto coi dati recuperati
			setFirstProductData(data.product);
		} catch (error) {
			console.error(error);
			setFirstProductData(null);
		}
	}

	const handleFirstProduct = (event) => {
		const firstProduct = findProductByTitle(event.target.value || product1);
		// console.log(firstProduct);

		// se un prodotto è selezionato recupero tutti i suoi dati
		if (firstProduct) {
			fetchFirstProduct(firstProduct.id);
		} else {
			setFirstProductData(null);
		}
	};

	// fetch per recuperare tutti i dati di un prodotto partendo dal suo ID
	async function fetchSecondProduct(productId) {
		try {
			const response = await fetch(
				`http://localhost:3001/products/${productId}`
			);
			const data = await response.json();
			// console.log(data.product);
			// setto i dati del secondo prodotto coi dati recuperati
			setSecondProductData(data.product);
		} catch (error) {
			console.error(error);
			setSecondProductData(null);
		}
	}

	const handleSecondProduct = (event) => {
		const secondProduct = findProductByTitle(event.target.value || product2);
		// console.log(firstProduct);

		// se un prodotto è selezionato recupero tutti i suoi dati
		if (secondProduct) {
			fetchSecondProduct(secondProduct.id);
		} else {
			setSecondProductData(null);
		}
	};

	return (
		<div className="container mt-4 mb-4">
			<h1>Comparazione prodotti</h1>
			<h2 className="mb-4">
				Seleziona due prodotti per confrontarli o{" "}
				{<Link to="/">torna alla pagina precedente</Link>}
			</h2>
			<div className="row row-cols-2">
				<div className="col">
					<select className="p-2" onChange={handleFirstProduct}>
						<option defaultValue="Seleziona un prodotto">
							{product1 ? product1.title : "Seleziona un prodotto"}
						</option>
						{products.map((p) => (
							<option key={p.id}>{p.title}</option>
						))}
					</select>
				</div>
				<div className="col">
					<select className="p-2" onChange={handleSecondProduct}>
						<option defaultValue="Seleziona un prodotto">
							{product2 ? product2.title : "Seleziona un prodotto"}
						</option>
						{products.map((p) => (
							<option key={p.id}>{p.title}</option>
						))}
					</select>
				</div>

				<div className=" row mt-4 g-3 text-center">
					<div className="col">
						{firstProductData && <ComparisonCard prop={firstProductData} />}
					</div>
				</div>
				<div className="row mt-4 g-3 text-center">
					<div className="col">
						{secondProductData && <ComparisonCard prop={secondProductData} />}
					</div>
				</div>
			</div>{" "}
			{/* {product1 && !product2 ? (
				<div className="container mt-4 mb-4">
					<h2>Manca uno dei due prodotti da confrontare!</h2>
					<h3>Torna indietro e seleziona un altro prodotto</h3>

					<Link to={`/products/${product1.id}`}>
						<button className="btn btn-primary">
							Torna alla pagina precedente
						</button>
					</Link>
				</div>
			) : (
				<div className="row row-cols-2 mt-4 g-3 text-center">
					<div className="col">
						<ComparisonCard prop={product1} />
					</div>
					<div className="col">
						<ComparisonCard prop={product2} />
					</div>
				</div>
			)} */}
		</div>
	);
}
