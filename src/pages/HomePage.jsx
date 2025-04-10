import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Homepage() {
	const { products } = useContext(GlobalContext);

	//query che inserisce l'utente
	const [searchQuery, setSearchQuery] = useState("");

	//select della categoria
	const [selectedCategory, setSelectedCategory] = useState(
		"Seleziona una categoria"
	);

	//select dell'ordine delle card
	const [selectedOrder, setSelectedOrder] = useState("Ordina per...");

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

	//filtraggio prodotti
	const filteredProducts = products.filter((p) => {
		const isCategoryMatch =
			selectedCategory === "Seleziona una categoria" ||
			p.category === selectedCategory;
		const isSearchMatch =
			searchQuery.trim() === "" ||
			p.title.toLowerCase().includes(searchQuery.toLowerCase());
		return isCategoryMatch && isSearchMatch;
	});

	//prodotti filtrati e ordinati secondo le varie opzioni
	const sortedProducts = filteredProducts.sort((a, b) => {
		if (
			selectedOrder === "Ordine Alfabetico A-z" ||
			selectedOrder === "Ordina per..."
		) {
			return a.title.localeCompare(b.title);
		} else if (selectedOrder === "Ordine Alfabetico Z-a") {
			return b.title.localeCompare(a.title);
		} else if (selectedOrder === "Ordine di Prezzo Crescente") {
			return a.price - b.price;
		} else if (selectedOrder === "Ordine di Prezzo Decrescente") {
			return b.price - a.price;
		}
	});

	return (
		<div className="container mt-4 mb-5">
			<h1>Scopri i migliori smartphone del momento</h1>
			<h3>Dai un'occhiata ai migliori smartphone del momento!</h3>
			<h3>Ti aiuteremo a scegliere il telefono perfetto per te</h3>
			<Link to="/compareProducts">
				<span className="h3">Vai alla sezione dedicata &#8594;</span>
			</Link>

			<div className="d-flex mt-3">
				<input
					className="me-2"
					type="text"
					placeholder="Cerca per nome..."
					aria-label="Search"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<select
					className="p-2"
					value={selectedCategory}
					onChange={(e) => setSelectedCategory(e.target.value)}
				>
					<option defaultValue="Seleziona una categoria">
						Seleziona una categoria
					</option>
					<option value="Smartphone">Smartphone</option>
					<option value="Tablet">Tablet</option>
					<option value="Computer">Computer</option>
				</select>
				<select
					className="p-2 ms-2"
					value={selectedOrder}
					onChange={(e) => setSelectedOrder(e.target.value)}
				>
					<option defaultValue="Ordina per...">Ordina per...</option>
					<option value="Ordine Alfabetico A-z">Ordine Alfabetico A-z</option>
					<option value="Ordine Alfabetico Z-a"> Ordine Alfabetico Z-a</option>
					<option value="Ordine di Prezzo Crescente">
						Ordine di Prezzo Crescente
					</option>
					<option value="Ordine di Prezzo Decrescente">
						Ordine di Prezzo Decrescente
					</option>
				</select>
			</div>

			{sortedProducts.length > 0 ? (
				//mostro i prodotti filtrati
				<div className="row row-cols-2 row-cols-lg-3 d-flex">
					{sortedProducts.map((p) => (
						<div key={p.id} className="col g-4 text-center">
							<Card prop={p} />
						</div>
					))}
				</div>
			) : (
				//altrimenti mostro un messaggio di errore
				<div className="container mt-4">
					<h2>Nessun risultato trovato!</h2>
					<h3>Prova a cercare un altro prodotto o cambia categoria</h3>
				</div>
			)}
		</div>
	);
}
