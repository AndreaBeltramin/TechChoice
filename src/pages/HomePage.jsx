import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useState, useRef } from "react";
import Card from "../components/Card";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const apiUrl = "http://localhost:3001";

export default function Homepage() {
	const { products } = useContext(GlobalContext);
	const [searchedProducts, setSearchedProducts] = useState([]);
	const [noResults, setNoResults] = useState(false);

	// query che inserisce l'utente
	const [query, setQuery] = useState("");

	// select della categoria del prodotto
	const [selectedCategory, setSelectedCategory] = useState(
		"Seleziona categoria"
	);
	// console.log(selectedCategory);

	// select dell'ordine delle card
	const [selectedOrder, setSelectedOrder] = useState("Ordina per...");

	useEffect(() => {
		setSearchedProducts(products);
	}, [products]);

	// se non ci sono prodotti mostro un messaggio appropriato
	if (products.length === 0) {
		return (
			<div className="spinner-container">
				<h1>
					Caricamento dati <FontAwesomeIcon icon={faRotateRight} spin />
				</h1>
			</div>
		);
	}

	// funzione per prendere tutte le categorie dai prodotti
	const allCategories = products.map((p) => p.category);
	let categories = [];
	allCategories.forEach((category) => {
		if (!categories.includes(category)) {
			categories.push(category);
		}
	});
	// console.log(categories);

	// funzione per cercare i prodotti
	async function searchProduct(e) {
		// mi recupero il valore inserito dall'utente
		setQuery(e.target.value);
		const currentQuery = e.target.value.toLowerCase();
		// console.log(currentQuery);

		// se c'è la query dell'utente ma la categoria non è selezionata
		if (currentQuery && selectedCategory === "Seleziona categoria") {
			const response = await fetch(`${apiUrl}/products?search=${currentQuery}`);
			const data = await response.json();
			// console.log(data);
			setSearchedProducts(data);
			setNoResults(data.length === 0);
		} else if (
			// se c'è la query dell'utente ma è selezionata anche una categoria
			currentQuery &&
			selectedCategory !== "Seleziona categoria"
		) {
			const response = await fetch(
				`${apiUrl}/products?search=${currentQuery}&category=${selectedCategory}`
			);
			const data = await response.json();
			// console.log(data);
			setSearchedProducts(data);
			setNoResults(data.length === 0);
		} else if (!currentQuery && selectedCategory !== "Seleziona categoria") {
			// se non c'è una query e non c'è una categoria selezionata
			const response = await fetch(
				`${apiUrl}/products?category=${selectedCategory}`
			);
			const data = await response.json();
			setSearchedProducts(data);
			setNoResults(data.length === 0);
		} else {
			// se la query è vuota e la categoria non è selezionata quindi è 'Seleziona categoria'
			setSearchedProducts(products);
			setNoResults(false);
		}
	}
	// console.log(searchedProducts);

	// filtraggio prodotti per categoria
	async function filterProducts(e) {
		setSelectedCategory(e.target.value);
		const currentCategory = e.target.value;
		// non c'è una query dell'utente
		if (currentCategory === "Seleziona categoria" && !query) {
			const response = await fetch(
				`${apiUrl}/products?search=${query?.toLowerCase()}`
			);
			const data = await response.json();
			// console.log(data);
			setSearchedProducts(data);
			setNoResults(data.length === 0);
		} else if (!query) {
			const response = await fetch(
				`${apiUrl}/products?category=${currentCategory}`
			);
			const data = await response.json();
			// console.log(data);
			setSearchedProducts(data);
			setNoResults(data.length === 0);
		} else if (
			// se la categoria è uguale a seleziona categoria
			currentCategory === "Seleziona categoria"
		) {
			const response = await fetch(`${apiUrl}/products?search=${query}`);
			const data = await response.json();
			// console.log(data);
			setSearchedProducts(data);
			setNoResults(data.length === 0);
		} else if (
			// se c'è la query e c'è una categoria selezionata
			query?.trim() &&
			currentCategory !== "Seleziona categoria"
		) {
			const response = await fetch(
				`${apiUrl}/products?search=${query?.toLowerCase()}&category=${currentCategory}`
			);
			const data = await response.json();
			// console.log(data);
			setSearchedProducts(data);
			setNoResults(data.length === 0);
		}
	}

	// funzione per resettare la ricerca
	function resetResearch() {
		// setto la lista di prodotti iniziale
		setSearchedProducts(products);
		setNoResults(false);
		setQuery("");
		// resetto anche la select della categoria
		setSelectedCategory("Seleziona categoria");
	}

	// condizione per decidere cosa mostrare a schermo
	// se non ci sono risultati mostro [], sennò mostro i prodotti trovati
	const productsToDisplay = noResults ? [] : searchedProducts;

	// ordino i prodotti filtrati secondo le varie opzioni
	const sortedProducts = [...productsToDisplay].sort((a, b) => {
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
		return 0; // se l'ordine non corrisponde a nessuna opzione
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
					value={query}
					onChange={searchProduct}
				/>
				{/* select per filtrare per categoria */}
				<select
					className="mt-2 me-2 input"
					value={selectedCategory}
					onChange={filterProducts}
				>
					<option defaultValue="Seleziona categoria">
						Seleziona categoria
					</option>
					{categories.map((category) => (
						<option key={category} value={category}>
							{" "}
							{category}{" "}
						</option>
					))}
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
				{/* <button className="btn btn-primary" onClick={searchProduct}>
					Cerca
				</button> */}
				<button className="btn btn-primary mt-2" onClick={resetResearch}>
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
