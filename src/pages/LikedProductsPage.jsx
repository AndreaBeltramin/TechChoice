import { GlobalContext } from "../context/GlobalContext";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import Card from "../components/Card";

export default function LikedProductsPage() {
	const { likedProducts } = useContext(GlobalContext);

	return (
		<div className="container mt-4">
			<h2>
				La lista dei tuoi prodotti preferiti{" "}
				{<FontAwesomeIcon icon={solidHeart} className="text-danger" />}
			</h2>
			{likedProducts.length > 0 ? (
				<div className="row row-cols-3">
					{likedProducts.map((p) => (
						<div key={p.id} className="col g-4 text-center">
							<Card prop={p} />
						</div>
					))}
				</div>
			) : (
				<div>
					<h3>Ancora nessun elemento salvato</h3>
					<p>
						Torna alla Home per iniziare a salvare i tuoi prodotti preferiti
					</p>
				</div>
			)}
		</div>
	);
}
