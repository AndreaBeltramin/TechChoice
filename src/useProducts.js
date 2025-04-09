import { useState, useEffect } from "react";

export default function useProducts() {
	const apiUrl = "http://localhost:3001";
	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetchProducts();
	}, []);

	//fetch per ottenere la lista di tutti i prodotti
	async function fetchProducts() {
		try {
			const response = await fetch(`${apiUrl}/products`);
			const data = await response.json();
			setProducts(data);
		} catch (error) {
			console.error("Errore nel recupero dei prodotti: ", error);
		}
	}

	//stato per controllare i prodotti con il like
	const [likedProducts, setLikedProducts] = useState([]);

	//aggiunta prodotti ai preferiti
	function handleClick(productId) {
		//trovo il prodotto partendo dall'id
		const productClicked = products.find((p) => p.id === productId);
		console.log(productClicked);

		//controllo se il prodotto cliccato è incluso nell'array di prodotti con il mi piace
		const isLiked = likedProducts.includes(productClicked);

		//se non era già incluso nell'array
		if (!isLiked) {
			//aggiungo il prodotto cliccato all'array di prodotti col mi piace
			setLikedProducts([...likedProducts, productClicked]);
		} else {
			//altrimenti filtro l'array dei prodotti con il mi piace togliendo il prodotto cliccato
			setLikedProducts(likedProducts.filter((p) => p.id !== productId));
		}
	}
	console.log(likedProducts);
	//funzione per controllare se un prodotto cliccato è nella lista dei prodotti col mi piace
	function isProductLiked(id) {
		const productLiked = products.find((p) => p.id === id);
		//controllo se è incluso nell'array dei prodotti col mi piace
		return likedProducts.includes(productLiked);
	}
	return {
		products,
		setProducts,
		handleClick,
		likedProducts,
		isProductLiked,
	};
}
