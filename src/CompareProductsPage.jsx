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
	const { product1, product2, product3 } = location.state || {};
	const { products, showProduct } = useContext(GlobalContext);

	const [firstProductData, setFirstProductData] = useState(null || product1);
	const [secondProductData, setSecondProductData] = useState(null || product2);
	const [thirdProductData, setThirdProductData] = useState(null || product3);

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

	// fetch per recuperare tutti i dati di un prodotto partendo dal suo ID
	async function fetchThirdProduct(productId) {
		try {
			const response = await fetch(
				`http://localhost:3001/products/${productId}`
			);
			const data = await response.json();
			// console.log(data.product);
			// setto i dati del terzo prodotto coi dati recuperati
			setThirdProductData(data.product);
		} catch (error) {
			console.error(error);
			setThirdProductData(null);
		}
	}

	const handleThirdProduct = (event) => {
		const thirdProduct = findProductByTitle(event.target.value || product1);
		// console.log(firstProduct);

		// se un prodotto è selezionato recupero tutti i suoi dati
		if (thirdProduct) {
			fetchThirdProduct(thirdProduct.id);
		} else {
			setThirdProductData(null);
		}
	};

	return (
		<div className="container mt-4 mb-5">
			<h1>Comparazione prodotti</h1>
			<h3>Seleziona due prodotti per confrontarli</h3>
			<div className="row justify-content-between">
				<div className="col">
					{/* select primo prodotto */}
					<select className="mt-2 me-2 input" onChange={handleFirstProduct}>
						<option defaultValue="Seleziona un prodotto">
							{product1 ? product1.title : "Seleziona un prodotto"}
						</option>
						{products.map((p) => (
							<option key={p.id}>{p.title}</option>
						))}
					</select>
					{/* primo prodotto */}
					<div className="mt-4 text-center">
						{firstProductData && <ComparisonCard prop={firstProductData} />}
					</div>
				</div>

				<div className="col ">
					{/* select secondo prodotto */}
					<select className="mt-2 input" onChange={handleSecondProduct}>
						<option defaultValue="Seleziona un prodotto">
							{product2 ? product2.title : "Seleziona un prodotto"}
						</option>
						{products.map((p) => (
							<option key={p.id}>{p.title}</option>
						))}
					</select>
					{/* secondo prodotto */}
					<div className="mt-4 text-center">
						{secondProductData && <ComparisonCard prop={secondProductData} />}
					</div>
				</div>

				<div className="col ">
					{/* select terzo prodotto */}
					<select className="mt-2 input" onChange={handleThirdProduct}>
						<option defaultValue="Seleziona un prodotto">
							{product3 ? product3.title : "Seleziona un prodotto"}
						</option>
						{products.map((p) => (
							<option key={p.id}>{p.title}</option>
						))}
					</select>
					{/* terzo prodotto */}
					<div className="mt-4 text-center">
						{thirdProductData && <ComparisonCard prop={thirdProductData} />}
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
