import { useLocation } from "react-router-dom";
import ComparisonCard from "./components/ComparisonCard";
import { useContext, useRef, useState } from "react";
import { GlobalContext } from "./context/GlobalContext";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function CompareProductsPage() {
	useEffect(() => {
		document.body.style.overflow = "auto";
		scrollToFirstProduct();
	}, []);

	const location = useLocation();
	const { product1, product2, product3 } = location.state || {};
	const { products, findProductByTitle, showProduct } =
		useContext(GlobalContext);

	const [firstProductData, setFirstProductData] = useState(null || product1);
	const [secondProductData, setSecondProductData] = useState(null || product2);
	const [thirdProductData, setThirdProductData] = useState(null || product3);

	const [show, setShow] = useState(false);
	const [isClicked, setIsClicked] = useState(false);

	const firstProductRef = useRef(null);
	function scrollToFirstProduct() {
		firstProductRef.current?.scrollIntoView({ behavior: "smooth" });
	}

	// funzione per recuperare il terzo prodottto dalla selezione dell'utente e ricercare il prodotto dal titolo
	const handleFirstProduct = async (event) => {
		try {
			const selectedProduct = findProductByTitle(event.target.value);
			// console.log(selectedProduct);
			// se non c'è un prodotto selezionato fermo
			if (!selectedProduct) return;
			//se c'è un prodotto recupero tutti i suoi dati
			const firstProduct = await showProduct(selectedProduct.id);
			setFirstProductData(firstProduct);
		} catch (error) {
			console.error(error);
			setFirstProductData(null);
		}
	};

	const secondProductRef = useRef(null);
	function scrollToSecondProduct() {
		secondProductRef.current?.scrollIntoView({ behavior: "smooth" });
	}

	useEffect(() => {
		if (firstProductData) {
			scrollToSecondProduct();
		}
	}, [firstProductData]);

	// funzione per recuperare il secondo prodotto dalla selezione dell'utente e ricercare il prodotto dal titolo
	const handleSecondProduct = async (event) => {
		try {
			const selectedProduct = findProductByTitle(event.target.value);
			// console.log(selectedProduct);
			// se non c'è un prodotto selezionato mi fermo
			if (!selectedProduct) return;
			//se c'è un prodotto recupero tutti i suoi dati
			const secondProduct = await showProduct(selectedProduct.id);
			setSecondProductData(secondProduct);
		} catch (error) {
			console.error(error);
			setSecondProductData(null);
		}
	};

	const thirdProductRef = useRef(null);
	function scrollToThirdProduct() {
		thirdProductRef.current?.scrollIntoView({ behavior: "smooth" });
	}

	useEffect(() => {
		if (show) {
			scrollToThirdProduct();
		}
	}, [show]);

	// funzione per recuperare il terzo prodottto dalla selezione dell'utente e ricercare il prodotto dal titolo
	const handleThirdProduct = async (event) => {
		try {
			const selectedProduct = findProductByTitle(event.target.value);
			// console.log(selectedProduct);
			// se non c'è un prodotto selezionato fermo
			if (!selectedProduct) return;
			//se c'è un prodotto recupero tutti i suoi dati
			const thirdProduct = await showProduct(selectedProduct.id);
			// console.log(thirdProduct);
			setThirdProductData(thirdProduct);
		} catch (error) {
			console.error(error);
			setThirdProductData(null);
		}
	};

	function handleClick() {
		setIsClicked(true);
		setShow(true);
		scrollToThirdProduct();
	}

	return (
		<div className="container-md my-4">
			<div ref={firstProductRef}>
				<h1>Comparazione prodotti</h1>
				<h3>Seleziona fino a tre prodotti per confrontarli</h3>
			</div>
			<div
				className={`row mt-3 row-cols-1 ${
					isClicked == true || product3 ? "row-cols-lg-3" : "row-cols-lg-2"
				}`}
			>
				<div className="col">
					{/* select primo prodotto */}
					<select className="me-2 mt-2 input" onChange={handleFirstProduct}>
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

				{!product3 ? (
					<>
						<div className="col">
							{/* select secondo prodotto */}
							<div className="d-flex justify-content-between">
								<select
									className="input mt-2"
									onChange={handleSecondProduct}
									disabled={!firstProductData}
									ref={secondProductRef}
								>
									<option defaultValue="Seleziona secondo prodotto">
										{product2 ? product2.title : "Seleziona secondo prodotto"}
									</option>
									{products.map((p) => (
										<option key={p.id}>{p.title}</option>
									))}
								</select>
								{secondProductData && (
									<button
										className={`btn btn-outline-secondary input-compare-products mt-2 ${
											isClicked ? "d-none" : ""
										}`}
										onClick={handleClick}
									>
										{window.innerWidth < 1440 ? (
											<FontAwesomeIcon icon={faPlus} />
										) : (
											"Vuoi selezionare un altro dispositivo?"
										)}
									</button>
								)}
							</div>
							{/* secondo prodotto */}
							<div className="mt-4 text-center">
								{secondProductData && (
									<ComparisonCard prop={secondProductData} />
								)}
							</div>
						</div>
						{show && (
							<div className="col">
								{/* select terzo prodotto  */}
								<select
									className="input mt-2"
									onChange={handleThirdProduct}
									ref={thirdProductRef}
								>
									<option defaultValue="Seleziona terzo prodotto">
										{product3 ? product3.title : "Seleziona terzo prodotto"}
									</option>
									{products.map((p) => (
										<option key={p.id}>{p.title}</option>
									))}
								</select>
								{/* terzo prodotto */}
								<div className="mt-4 text-center">
									{thirdProductData && (
										<ComparisonCard prop={thirdProductData} />
									)}
								</div>
								<div className="mt-4 text-center">
									<button
										className="btn btn-primary"
										onClick={scrollToFirstProduct}
									>
										Torna su
									</button>
								</div>
							</div>
						)}
					</>
				) : (
					<>
						<div className="col">
							{/* select secondo prodotto */}
							<div>
								<select
									className="input mt-2"
									onChange={handleSecondProduct}
									ref={secondProductRef}
								>
									<option defaultValue="Seleziona secondo prodotto">
										{product2 ? product2.title : "Seleziona secondo prodotto"}
									</option>
									{products.map((p) => (
										<option key={p.id}>{p.title}</option>
									))}
								</select>
							</div>
							{/* secondo prodotto */}
							<div className="mt-4 text-center">
								{secondProductData && (
									<ComparisonCard prop={secondProductData} />
								)}
							</div>
						</div>
						<div className="col" ref={thirdProductRef}>
							{/* select terzo prodotto  */}
							<select className="input mt-2" onChange={handleThirdProduct}>
								<option defaultValue="Seleziona terzo prodotto">
									{product3 ? product3.title : "Seleziona terzo prodotto"}
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
					</>
				)}
			</div>
		</div>
	);
}
