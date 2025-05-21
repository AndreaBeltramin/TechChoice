import { useState, useEffect } from "react";
import { debounce } from "lodash";
import { useCallback } from "react";

export default function useProducts() {
	const apiUrl = import.meta.env.VITE_API_URL;
	const [products, setProducts] = useState([]);

	// stato per controllare i prodotti con il like
	const [likedProducts, setLikedProducts] = useState([]);

	// leggo i prodotti salvati nel localStorage
	useEffect(() => {
		const likedProducts = JSON.parse(localStorage.getItem("likedProducts"));
		if (likedProducts) {
			setLikedProducts(likedProducts);
		}
	}, []);

	// salvo i prodotti nel localStorage
	useEffect(() => {
		localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
	}, [likedProducts]);

	// stato per controllare i prodotti cercati
	const [searchedProducts, setSearchedProducts] = useState([]);

	// stato per quando non ci sono risultati
	const [noResults, setNoResults] = useState(false);

	// stato per controllare la query che inserisce l'utente
	const [query, setQuery] = useState("");

	// stato per controllare la select della categoria del prodotto
	const [selectedCategory, setSelectedCategory] = useState(
		"Seleziona categoria"
	);

	// stato per controllare la select dell'ordine delle card
	const [selectedOrder, setSelectedOrder] = useState("Ordina per...");

	useEffect(() => {
		fetchProducts();
	}, []);

	// fetch per ottenere la lista di tutti i prodotti (con proprietà principali : id, name, category, created at)
	async function fetchProducts() {
		try {
			const response = await fetch(`${apiUrl}/products`);
			const data = await response.json();
			setProducts(data);
		} catch (error) {
			console.error("Errore nel recupero dei prodotti: ", error);
		}
	}

	// fetch per otttenere un singolo prodotto con tutte le sue proprietà
	const showProduct = useCallback(
		async (id) => {
			try {
				const response = await fetch(`${apiUrl}/products/${id}`);
				const data = await response.json();
				const product = data.product;
				return product;
			} catch (error) {
				console.error("Errore nel recupero dei prodotti: ", error);
				return null;
			}
		},
		[apiUrl]
	);

	// aggiunta prodotti ai preferiti
	async function handleClick(productId) {
		const productClicked = await showProduct(productId);
		// console.log(productClicked);

		// controllo se il prodotto cliccato è incluso nell'array di prodotti con like
		const isLiked = likedProducts.some((p) => p.id === productId);
		// console.log(isLiked);

		// se era già incluso nell'array
		if (isLiked) {
			// filtro l'array dei prodotti con like togliendo il prodotto cliccato
			setLikedProducts((prev) => prev.filter((p) => p.id !== productId));
		} else {
			// aggiungo il prodotto cliccato all'array di prodotti con like
			setLikedProducts((prev) => [...prev, productClicked]);
			// console.log(likedProducts);
		}
	}

	// funzione per controllare se un prodotto cliccato è nella lista dei prodotti con like
	function isProductLiked(id) {
		// controllo se è incluso nell'array dei prodotti col like
		return likedProducts.some((p) => p.id === id);
	}

	const debouncedSearchInput = debounce(async (inputValue) => {
		// mi recupero il valore inserito dall'utente
		const currentQuery = inputValue.toLowerCase();
		// console.log(currentQuery);
		setQuery(currentQuery);

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
		} else if (
			// se non c'è una query inserita dall'utente ma c'è una categoria selezionata
			!currentQuery &&
			selectedCategory !== "Seleziona categoria"
		) {
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
	}, 500);

	// funzione per cercare i prodotti
	const searchProduct = useCallback(debouncedSearchInput, [
		selectedCategory,
		apiUrl,
		products,
		debouncedSearchInput,
	]);
	// console.log(searchedProducts);

	// filtraggio prodotti per categoria
	async function filterProducts(e) {
		// mi recupero la categoria selezionata
		const currentCategory = e.target.value;
		setSelectedCategory(e.target.value);

		// se la categoria non è selezionata e non c'è una query dell'utente
		if (currentCategory === "Seleziona categoria" && !query) {
			// restituisco tutti i prodotti
			setSearchedProducts(products);
			setNoResults(false);
		}
		// se non c'è una query dell'utente
		else if (!query) {
			// cerco tutti i prodotti della categoria selezionata
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
			// cerco tutti i prodotti secondo la query che mette l'utente
			const response = await fetch(`${apiUrl}/products?search=${query}`);
			const data = await response.json();
			// console.log(data);
			setSearchedProducts(data);
			setNoResults(data.length === 0);
		} else if (
			// se c'è la query e c'è una categoria selezionata
			query &&
			currentCategory !== "Seleziona categoria"
		) {
			// cerco tutti i prodotti con quel nome e di quella categoria
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

	// funzione per prendere tutte le categorie dai prodotti
	const allCategories = products.map((p) => p.category);
	let categories = [];
	allCategories.forEach((category) => {
		if (!categories.includes(category)) {
			categories.push(category);
		}
	});
	// console.log(categories);

	// funzione per cambiare il colore del badge delle card secondo la diversa categoria
	function backgroundColorBadge(category) {
		if (category === "Laptop") {
			return "laptop";
		} else if (category === "Tablet") {
			return "tablet";
		} else if (category === "Smartphone") {
			return "smartphone";
		} else return "bg-white"; // di default
	}

	// funzione per recuperare un prodotto dalla selezione partendo dal suo titolo
	// accetta l'evento della select e uno setState in modo da centralizzare la ricerca dei prodotti
	const handleProductSelection = useCallback(
		async (event, setProductData) => {
			try {
				const selectedProductId = event.target.value;
				// console.log(selectedProductId);

				// se non c'è un prodotto selezionato o è selezionato il valore di default
				if (!selectedProductId) {
					setProductData(null);
					return;
				}
				//se c'è un prodotto recupero tutti i suoi dati
				const productData = await showProduct(selectedProductId);
				setProductData(productData);
			} catch (error) {
				console.error(error);
				setProductData(null);
			}
		},
		[showProduct]
	);

	return {
		products,
		showProduct,
		handleClick,
		likedProducts,
		isProductLiked,
		categories,
		selectedCategory,
		filterProducts,
		searchProduct,
		query,
		searchedProducts,
		setSearchedProducts,
		noResults,
		selectedOrder,
		setSelectedOrder,
		sortedProducts,
		resetResearch,
		backgroundColorBadge,
		handleProductSelection,
	};
}
