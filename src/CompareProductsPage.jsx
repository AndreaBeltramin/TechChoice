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

	const { products, handleProductSelection } = useContext(GlobalContext);

	const location = useLocation();
	// recupero i prodotti dalla pagina di dettaglio
	const { product1, product2, product3 } = location.state || {};

	// setto gli stati per i prodotti
	const [firstProductData, setFirstProductData] = useState(product1 || null);
	const [secondProductData, setSecondProductData] = useState(product2 || null);
	const [thirdProductData, setThirdProductData] = useState(product3 || null);

	// stato per controllare la comparsa della select del terzo prodotto
	const [show, setShow] = useState(false);
	// stato per controllare se è cliccato il bottone per aggiungere un terzo elemento
	const [isClicked, setIsClicked] = useState(false);

	// funzione per scrollare al primo prodotto
	const firstProductRef = useRef(null);
	function scrollToFirstProduct() {
		firstProductRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	}

	// funzione per scrollare al secondo prodotto
	const secondProductRef = useRef(null);
	function scrollToSecondProduct() {
		secondProductRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	}

	useEffect(() => {
		if (firstProductData) {
			scrollToSecondProduct();
		}
	}, [firstProductData]);

	// funzione per scrollare al terzo prodotto
	const thirdProductRef = useRef(null);
	function scrollToThirdProduct() {
		thirdProductRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	}

	useEffect(() => {
		if (show) {
			scrollToThirdProduct();
		}
	}, [show]);

	function handleClick() {
		setIsClicked(true);
		setShow(true);
		scrollToThirdProduct();
	}

	useEffect(() => {
		if (product3) {
			setIsClicked(true);
			setShow(true);
		} else if (product1 && product2) {
			setIsClicked(false);
			setShow(false);
		}
	}, [product1, product2, product3]);

	return (
		<div className="container-md mt-4">
			{/* titolo  */}
			<div>
				<h1 ref={firstProductRef}>Comparazione prodotti</h1>
				<h3>Seleziona fino a tre prodotti per confrontarli</h3>
			</div>
			<div
				className={`row mt-3 row-cols-1 ${
					isClicked == true || product3 ? "row-cols-lg-3" : "row-cols-lg-2"
				}`}
			>
				{/* select primo prodotto */}
				<div className="col h-100">
					<select
						className="me-2 mt-2 input"
						onChange={(e) => handleProductSelection(e, setFirstProductData)}
						value={firstProductData?.id || ""}
					>
						<option value="">Seleziona un prodotto</option>
						{/* creo dinamicamente le opzioni riordinando i prodotti in ordine alfabetico e togliendo dalla lista i prodotti già selezionati */}
						{[...products]
							.sort((a, b) => a.title.localeCompare(b.title))
							.filter(
								(p) =>
									p.id !== secondProductData?.id &&
									p.id !== thirdProductData?.id
							)
							.map((p) => (
								<option key={p.id} value={p.id}>
									{p.title}
								</option>
							))}
					</select>
					{/* card primo prodotto */}
					<div className="mt-4 text-center">
						{firstProductData && <ComparisonCard prop={firstProductData} />}
					</div>
				</div>

				{/* select secondo prodotto */}
				<div className="col h-100">
					<div
						className="d-flex justify-content-between"
						ref={secondProductRef}
					>
						<select
							className="input mt-2"
							onChange={(e) => handleProductSelection(e, setSecondProductData)}
							value={secondProductData?.id || ""}
							disabled={!firstProductData}
						>
							<option value="">Seleziona secondo prodotto</option>
							{/* creo dinamicamente le opzioni riordinando i prodotti in ordine alfabetico e togliendo dalla lista i prodotti già selezionati */}
							{[...products]
								.sort((a, b) => a.title.localeCompare(b.title))
								.filter(
									(p) =>
										p.id !== firstProductData?.id &&
										p.id !== thirdProductData?.id
								)
								.map((p) => (
									<option key={p.id} value={p.id}>
										{p.title}
									</option>
								))}
						</select>
						{/* bottone per selezionare terzo prodotto */}
						{secondProductData && !thirdProductData && !isClicked && (
							<button
								className="btn btn-outline-secondary input-compare-products mt-2"
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
					{/* card secondo prodotto */}
					<div className="mt-4 text-center">
						{secondProductData && <ComparisonCard prop={secondProductData} />}
					</div>
				</div>

				{(thirdProductData || isClicked) && (
					//  select terzo prodotto
					<div className="col h-100" ref={thirdProductRef}>
						<select
							className="input mt-2"
							onChange={(e) => handleProductSelection(e, setThirdProductData)}
							value={thirdProductData?.id || ""}
							disabled={!secondProductData}
						>
							<option value="">Seleziona terzo prodotto</option>
							{/* creo dinamicamente le opzioni riordinando i prodotti in ordine alfabetico e togliendo dalla lista i prodotti già selezionati */}
							{[...products]
								.sort((a, b) => a.title.localeCompare(b.title))
								.filter(
									(p) =>
										p.id !== firstProductData?.id &&
										p.id !== secondProductData?.id
								)
								.map((p) => (
									<option key={p.id} value={p.id}>
										{p.title}
									</option>
								))}
						</select>
						{/* card terzo prodotto  */}
						<div className="mt-4 text-center">
							{thirdProductData && (
								<>
									<ComparisonCard prop={thirdProductData} />

									<div className="mt-4 text-center d-flex justify-content-end">
										<button
											className="btn btn-secondary"
											onClick={scrollToFirstProduct}
										>
											Torna su
										</button>
									</div>
								</>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
