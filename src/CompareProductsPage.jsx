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
	const { products, findProductByTitle, fetchDetailProduct } =
		useContext(GlobalContext);

	const [firstProductData, setFirstProductData] = useState(null || product1);
	const [secondProductData, setSecondProductData] = useState(null || product2);
	const [thirdProductData, setThirdProductData] = useState(null || product3);

	const [show, setShow] = useState(false);
	const [isClicked, setIsClicked] = useState(false);

	// funzione per recuperare il terzo prodottto dalla selezione dell'utente e ricercare il prodotto dal titolo
	const handleFirstProduct = async (event) => {
		try {
			const selectedProduct = findProductByTitle(event.target.value);
			// console.log(selectedProduct);
			// se non c'è un prodotto selezionato fermo
			if (!selectedProduct) return;
			//se c'è un prodotto recupero tutti i suoi dati
			const firstProduct = await fetchDetailProduct(selectedProduct.id);
			// console.log(thirdProduct);
			setFirstProductData(firstProduct);
		} catch (error) {
			console.error(error);
			setFirstProductData(null);
		}
	};

	// funzione per recuperare il secondo prodotto dalla selezione dell'utente e ricercare il prodotto dal titolo
	const handleSecondProduct = async (event) => {
		try {
			const selectedProduct = findProductByTitle(event.target.value);
			// console.log(selectedProduct);
			// se non c'è un prodotto selezionato mi fermo
			if (!selectedProduct) return;
			//se c'è un prodotto recupero tutti i suoi dati
			const secondProduct = await fetchDetailProduct(selectedProduct.id);
			setSecondProductData(secondProduct);
		} catch (error) {
			console.error(error);
			setSecondProductData(null);
		}
	};

	// funzione per recuperare il terzo prodottto dalla selezione dell'utente e ricercare il prodotto dal titolo
	const handleThirdProduct = async (event) => {
		try {
			const selectedProduct = findProductByTitle(event.target.value);
			// console.log(selectedProduct);
			// se non c'è un prodotto selezionato fermo
			if (!selectedProduct) return;
			//se c'è un prodotto recupero tutti i suoi dati
			const thirdProduct = await fetchDetailProduct(selectedProduct.id);
			// console.log(thirdProduct);
			setThirdProductData(thirdProduct);
		} catch (error) {
			console.error(error);
			setThirdProductData(null);
		}
	};

	return (
		<div className="container-md my-4">
			<div>
				<h1>Comparazione prodotti</h1>
				<h3>Seleziona fino a tre prodotti per confrontarli</h3>
			</div>
			<div
				className={`row mt-3 ${
					isClicked == true ? "row-cols-3" : "row-cols-2"
				}`}
			>
				<div className="col">
					{/* select primo prodotto */}
					<select className="me-2 input" onChange={handleFirstProduct}>
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

				<div className="col">
					{/* select secondo prodotto */}
					<div className="d-flex justify-content-between">
						<select className=" input" onChange={handleSecondProduct}>
							<option defaultValue="Seleziona un prodotto">
								{product2 ? product2.title : "Seleziona un prodotto"}
							</option>
							{products.map((p) => (
								<option key={p.id}>{p.title}</option>
							))}
						</select>
						{secondProductData && (
							<button
								className={`btn btn-outline-secondary input ${
									isClicked ? "d-none" : ""
								}`}
								onClick={() => {
									setIsClicked(true);
									setShow(true);
								}}
							>
								Vuoi selezionare un altro dispositivo?
							</button>
						)}
					</div>
					{/* secondo prodotto */}
					<div className="mt-4 text-center">
						{secondProductData && <ComparisonCard prop={secondProductData} />}
					</div>
				</div>

				{show && (
					<div className="col">
						{/* select terzo prodotto  */}
						<select className="input" onChange={handleThirdProduct}>
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
				)}
			</div>
		</div>
	);
}
