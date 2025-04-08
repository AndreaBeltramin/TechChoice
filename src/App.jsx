import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import { GlobalProvider } from "./context/GlobalContext";

import Homepage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import LikedProductsPage from "./pages/LikedProductsPage";
import CompareProductsPage from "./CompareProductsPage";

function App() {
	return (
		<GlobalProvider>
			<BrowserRouter>
				<Routes>
					<Route Component={DefaultLayout}>
						<Route path="/" Component={Homepage} />
						<Route path="/products/:id" Component={DetailPage} />
						<Route path="/compareProducts" Component={CompareProductsPage} />
						<Route path="/likedProducts" Component={LikedProductsPage} />
					</Route>
				</Routes>
			</BrowserRouter>
		</GlobalProvider>
	);
}

export default App;
