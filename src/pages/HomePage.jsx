import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Card from "../components/Card";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Homepage() {
	const {
		products,
		setSearchedProducts,
		searchProduct,
		categories,
		selectedCategory,
		filterProducts,
		noResults,
		selectedOrder,
		setSelectedOrder,
		sortedProducts,
		resetResearch,
	} = useContext(GlobalContext);

	useEffect(() => {
		setSearchedProducts(products);
	}, [products]);

	// se non ci sono prodotti mostro un messaggio appropriato di caricamento
	if (products.length === 0) {
		return (
			<div className="spinner-container">
				<h1>
					Caricamento dati <FontAwesomeIcon icon={faRotateRight} spin />
				</h1>
			</div>
		);
	}

	return (
		<div className="container-md mt-4 homepage">
			<div className="title">
				<h1>Scopri i migliori prodotti tecnologici del momento!</h1>
				<h3>Ti aiuteremo a scegliere quello perfetto per te</h3>
			</div>
			<div className="d-md-flex">
				{/* input di ricerca */}
				<input
					className="mt-2 me-2 input-home"
					type="text"
					placeholder="Cerca per nome..."
					aria-label="Search"
					onChange={(e) => searchProduct(e.target.value)}
				/>
				{/* select per filtrare per categoria */}
				<select
					className="mt-2 me-2 input-home"
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
					className="mt-2 input-home"
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
			{/* bottone per resettare la lista  */}
			<div className="mt-2">
				<button className="btn btn-secondary mt-2" onClick={resetResearch}>
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
