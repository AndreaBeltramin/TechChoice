import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Homepage() {
	const { products } = useContext(GlobalContext);
	const [searchedProducts, setSearchedProducts] = useState([]);
	const [noResults, setNoResults] = useState(false);

	//query che inserisce l'utente
	const queryRef = useRef();

	//select dell'ordine delle card
	const [selectedOrder, setSelectedOrder] = useState("Ordina per...");

	useEffect(() => {
		setSearchedProducts(products);
	}, [products]);

	//se non ci sono prodotti mostro un messaggio appropriato
	if (products.length === 0) {
		return (
			<div className="spinner-container">
				<h1>
					Caricamento dati <FontAwesomeIcon icon={faRotateRight} spin />
				</h1>
			</div>
		);
	}

	// funzione per cercare i prodotti
	function searchProduct() {
		// mi recupero il valore inserito dall'utente
		const searchValue = queryRef.current.value.toLowerCase().trim();
		if (searchValue === "") {
			return;
		} else {
			const findedProducts = products.filter((p) =>
				p.title.toLowerCase().includes(searchValue)
			);

			// se l'array di prodotti cercati è vuoto
			if (findedProducts.length === 0) {
				// setto i prodotti con [] e setto lo stato per far comparire un messaggio adeguato a true
				setSearchedProducts([]);
				setNoResults(true);
			} else {
				// setto i prodotti con l'array di prodotti trovati
				setSearchedProducts(findedProducts);
				// e setto lo stato per far comparire un messaggio adeguato a false
				setNoResults(false);
			}
			// resetto il campo dell'input
			// queryRef.current.value = "";
		}
	}
	// console.log(searchedProducts);

	// filtraggio prodotti per categoria
	function filterProducts(event) {
		const categorySelected = event.target.value;
		// console.log(categorySelected);

		const filteredProducts = searchedProducts.filter((p) => {
			const isCategoryMatch =
				categorySelected === "Seleziona una categoria" ||
				p.category === categorySelected;
			return isCategoryMatch;
		});
		// console.log(filteredProducts);

		// se l'array di prodotti filtrati è vuoto
		if (filteredProducts.length === 0) {
			// setto a true lo stato per far comparire un messaggio adeguato
			setNoResults(true);
		} else {
			// setto i prodotti trovati con l'array di prodotti filtrati
			setSearchedProducts(filteredProducts);
			// e setto a false lo stato per far comparire un messaggio adeguato
			setNoResults(false);
		}
	}

	// funzione per resettare la ricerca
	function resetResearch() {
		// setto la lista di prodotti iniziale
		setSearchedProducts(products);
		setNoResults(false);
	}

	// condizione per decidere cosa mostrare a schermo
	// se non ci sono risultati mostro [], sennò mostro i prodotti trovati
	const productsToDisplay = noResults ? [] : searchedProducts;

	// ordino i prodotti filtrati secondo le varie opzioni
	const sortedProducts = productsToDisplay.sort((a, b) => {
		if (
			selectedOrder === "Ordine Alfabetico A-z" ||
			selectedOrder === "Ordina per..."
		) {
			return a.title.localeCompare(b.title);
		} else if (selectedOrder === "Ordine Alfabetico Z-a") {
			return b.title.localeCompare(a.title);
		} else if (selectedOrder === "Ordine per Categoria A-z") {
			return a.category.localeCompare(b.category);
		} else if (selectedOrder === "Ordine per Categoria Z-a") {
			return b.category.localeCompare(a.category);
		}
	});

	return (
		<div className="container-md mt-4 mb-5">
			<div className="title">
				<h1>Scopri i migliori prodotti tecnologici del momento!</h1>
				<h3>Ti aiuteremo a scegliere quello perfetto per te</h3>
			</div>
			<div className="d-md-flex">
				{/* input di ricerca */}
				<input
					className="mt-2 me-2 input"
					type="text"
					placeholder="Cerca per nome..."
					aria-label="Search"
					ref={queryRef}
					onClick={() => (queryRef.current.value = "")}
				/>
				{/* select per filtrare per categoria */}
				<select
					className="mt-2 me-2 input"
					onChange={() => filterProducts(event)}
				>
					<option defaultValue="Seleziona una categoria">
						Seleziona categoria
					</option>
					<option value="Smartphone">Smartphone</option>
					<option value="Tablet">Tablet</option>
					<option value="Computer">Computer</option>
				</select>
				{/* select per ordinare i prodotti */}
				<select
					className="mt-2 input"
					value={selectedOrder}
					onChange={(e) => setSelectedOrder(e.target.value)}
				>
					<option defaultValue="Ordina per...">Ordina per...</option>
					<option value="Ordine Alfabetico A-z">Ordine Alfabetico A-z</option>
					<option value="Ordine Alfabetico Z-a"> Ordine Alfabetico Z-a</option>
					<option value="Ordine per Categoria A-z">
						Ordine per Categoria A-z
					</option>
					<option value="Ordine per Categoria Z-a">
						{" "}
						Ordine per Categoria Z-a
					</option>
				</select>
			</div>
			{/* bottone per avviare la ricerca e resettare la lista  */}
			<div className="mt-2">
				<button className="btn btn-primary" onClick={searchProduct}>
					Cerca
				</button>
				<button className="btn btn-primary ms-2" onClick={resetResearch}>
					Torna alla lista intera
				</button>
			</div>

			{/* mostro i prodotti filtrati*/}
			{noResults ? (
				// se non ci sono risultati della ricerca
				<div className="container mt-4">
					<h2>Nessun risultato trovato!</h2>
					<h3>Prova a cercare un altro prodotto o cambia categoria</h3>
				</div>
			) : (
				// se ci sono risultati dalla ricerca
				<div className="row row-cols-2 row-cols-lg-3 d-flex">
					{sortedProducts.map((p) => (
						<div key={p.id} className="col g-4 text-center">
							<Card prop={p} />
						</div>
					))}
				</div>
			)}
		</div>
	);
}
