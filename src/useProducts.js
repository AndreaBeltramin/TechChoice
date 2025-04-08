import { useState, useEffect } from "react";

export default function useProducts() {
	const [products, setProducts] = useState([]);
	const apiUrl = "http://localhost:3001";

	useEffect(() => {
		fetchProducts();
	}, []);

	async function fetchProducts() {
		try {
			const response = await fetch(`${apiUrl}/products`);
			const data = await response.json();
			setProducts(data);
		} catch (error) {
			console.error("Errore nel recupero dei prodotti: ", error);
		}
	}

	return { products, setProducts };
}
