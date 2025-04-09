import { createContext } from "react";
import useProducts from "../useProducts";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
	const products = useProducts();

	return (
		<GlobalContext.Provider value={{ ...products }}>
			{children}
		</GlobalContext.Provider>
	);
}
