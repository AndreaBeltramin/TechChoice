import { useState, useEffect } from "react";

export default function useProducts() {
	const apiUrl = "http://localhost:3001";
	const [products, setProducts] = useState([]);
	const [product, setProduct] = useState("");

	//stato per controllare i prodotti con il like
	const [likedProducts, setLikedProducts] = useState([]);

	const [searchedProducts, setSearchedProducts] = useState([]);
	const [noResults, setNoResults] = useState(false);
	// query che inserisce l'utente
	const [query, setQuery] = useState("");
	// select della categoria del prodotto
	const [selectedCategory, setSelectedCategory] = useState(
		"Seleziona categoria"
	);
	// select dell'ordine delle card
	const [selectedOrder, setSelectedOrder] = useState("Ordina per...");

	useEffect(() => {
		fetchProducts();
	}, []);

	// fetch per ottenere la lista di tutti i prodotti
	async function fetchProducts() {
		try {
			const response = await fetch(`${apiUrl}/products`);
			const data = await response.json();
			setProducts(data);
		} catch (error) {
			console.error("Errore nel recupero dei prodotti: ", error);
		}
	}

	// fetch per otttenere un singolo prodotto
	async function showProduct(id) {
		try {
			const response = await fetch(`${apiUrl}/products/${id}`);
			const data = await response.json();
			setProduct(data.product);
		} catch (error) {
			console.error("Errore nel recupero dei prodotti: ", error);
		}
	}

	// fetch per recuperare tutti i dati di un prodotto partendo dal suo ID
	async function fetchDetailProduct(productId) {
		try {
			const response = await fetch(
				`http://localhost:3001/products/${productId}`
			);
			const data = await response.json();
			// console.log(data.product);
			return data.product;
		} catch (error) {
			console.error(error);
		}
	}

	// aggiunta prodotti ai preferiti
	function handleClick(productId) {
		// trovo il prodotto partendo dall'id
		const productClicked = products.find((p) => p.id === productId);
		// console.log(productClicked);

		// controllo se il prodotto cliccato è incluso nell'array di prodotti con il mi piace
		const isLiked = likedProducts.includes(productClicked);

		// se non era già incluso nell'array
		if (!isLiked) {
			// aggiungo il prodotto cliccato all'array di prodotti col mi piace
			setLikedProducts([...likedProducts, productClicked]);
		} else {
			// altrimenti filtro l'array dei prodotti con il mi piace togliendo il prodotto cliccato
			setLikedProducts(likedProducts.filter((p) => p.id !== productId));
		}
	}

	// funzione per controllare se un prodotto cliccato è nella lista dei prodotti col mi piace
	function isProductLiked(id) {
		const productLiked = products.find((p) => p.id === id);
		// controllo se è incluso nell'array dei prodotti col mi piace
		return likedProducts.includes(productLiked);
	}

	// funzione per recuperare i dati dell'oggetto dal titolo
	const findProductByTitle = (title) => {
		return products.find((p) => p.title === title);
	};

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

	// condizione per decidere quali prodotti riordinare e mostrare a schermo
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

	return {
		products,
		setProducts,
		product,
		setProduct,
		showProduct,
		handleClick,
		likedProducts,
		isProductLiked,
		findProductByTitle,
		fetchDetailProduct,
		categories,
		selectedCategory,
		setSelectedCategory,
		query,
		setQuery,
		searchedProducts,
		setSearchedProducts,
		noResults,
		setNoResults,
		selectedOrder,
		setSelectedOrder,
		sortedProducts,
		searchProduct,
		filterProducts,
		resetResearch,
	};
}
