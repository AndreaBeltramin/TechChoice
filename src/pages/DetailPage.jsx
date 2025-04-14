import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

export default function DetailPage() {
	const { id } = useParams();
	const { products, showProduct, product, handleClick, isProductLiked } =
		useContext(GlobalContext);
	// console.log(product);

	// stato per i dati del secondo prodotto
	const [secondProductData, setSecondProductData] = useState(null);

	// al montaggio del componente recupero i dati del prodotto
	useEffect(() => {
		showProduct(id);
	}, []);

	// creo una funzione per recuperare i dati dell'oggetto dal titolo
	const findProductByTitle = (title) => {
		return products.find((p) => p.title === title);
	};

	// fetch per recuperare tutti i dati di un prodotto partendo dal suo ID
	async function fetchSecondProduct(productId) {
		try {
			const response = await fetch(
				`http://localhost:3001/products/${productId}`
			);
			const data = await response.json();
			// console.log(data.product);
			// setto i dati del secondo prodotto coi dati recuperati
			setSecondProductData(data.product);
		} catch (error) {
			console.error(error);
			setSecondProductData(null);
		}
	}

	// funzione per recuperare la selezione dell'utente e ricercare il prodotto dal titolo
	const handleSecondProduct = (event) => {
		const selectedProduct = findProductByTitle(event.target.value);
		// console.log(selectedProduct);

		// se un prodotto è selezionato recupero tutti i suoi dati
		if (selectedProduct) {
			fetchSecondProduct(selectedProduct.id);
		} else {
			setSecondProductData(null);
		}
	};

	return (
		<div className="container my-4">
			{/* link per tornare alla home */}
			<Link to="/">
				<button className="btn btn-primary mb-4">
					&#8592; Torna alla Home
				</button>{" "}
			</Link>

			{/* sezione immagine e descrizione del prodotto */}
			<section>
				<div className="row">
					<div className="col-4 text-center">
						<div className="row">
							<div className="col-10">
								<h3>
									{product.title} ({product.brand})
								</h3>
							</div>
							<div className="col-2">
								{/* icona del cuore */}
								<FontAwesomeIcon
									//se il prodotto ha il mi piace faccio vedere il cuore pieno sennò il cuore vuoto
									icon={isProductLiked(product.id) ? solidHeart : regularHeart}
									className="fa-xl mt-2 me-2 heart"
									onClick={() => handleClick(product.id)}
								/>
							</div>
						</div>
						{/* mostro l'immagine del prodotto */}

						<img src={product.image} alt={product.title} />
					</div>
					<div className="col-8">
						{/* se c'è una descrizione la mostro */}
						{product.description && (
							<div>
								<h3>Breve descrizione del prodotto: </h3> {product.description}
							</div>
						)}
					</div>
				</div>
			</section>

			{/* sezione caratteristiche tecniche */}
			<section>
				<h3 className="mt-4">Caratteristiche tecniche: </h3>
				<div className="my-2">
					{/* {Object.keys(productDetail).map((key) => {
						console.log(key, productDetail[key]);
						if (key === "title" || key === "id" || key === "image") return;
						return (
							<div>
								<span className="fs-5">{key} : </span className="fs-5">
								<p>{productDetail[key]}</p>
							</div>
						);
					})} */}
					<div className="my-1">
						<span className="h5">Tipo di prodotto: </span>
						<span>{product.category}</span>
					</div>
					<div className="my-1">
						<span className="h5">Sistema operativo: </span>
						<span>{product.operating_system}</span>
					</div>
					<div className="my-1">
						<span className="h5">Capacità di memoria: </span>
						<span>{product.storage}</span>
					</div>
					<div className="my-1">
						<span className="h5">Anno di uscita: </span>
						<span>{product.release_year}</span>
					</div>
					<div className="my-1">
						<span className="h5">Display: </span>
						<span>{product.display}</span>
					</div>
					<div className="my-1">
						<span className="h5">Camera: </span>
						<span>{product.cameras}</span>
					</div>
					<div className="my-1">
						<span className="h5">Porta di ricarica: </span>
						<span>{product.port}</span>
					</div>
				</div>
			</section>

			{/* bottone di confronto */}
			<button
				className="btn btn-primary"
				data-bs-toggle="offcanvas"
				href="#offcanvasConfronto"
				role="button"
				aria-controls="offcanvasConfronto"
			>
				Confronta
			</button>

			{product && (
				<div
					className="offcanvas offcanvas-end"
					tabIndex="-1"
					id="offcanvasConfronto"
					aria-labelledby="offcanvasConfrontoLabel"
				>
					<div className="offcanvas-header">
						<span className="offcanvas-title" id="offcanvasConfrontoLabel">
							Seleziona un altro {product.category.toLowerCase()} per fare il
							confronto
						</span>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="offcanvas"
							aria-label="Close"
						></button>
					</div>
					<div className="offcanvas-body">
						{/* mostro il primo prodotto */}
						<div className="row canvas-row">
							<div className="col text-center mb-2">{product.title}</div>
							<div className="col d-flex justify-content-center">
								<img src={product.image} alt={product.title} className="w-75" />
							</div>
						</div>
						{/* selezione per il secondo prodotto */}
						<div className="d-flex justify-content-center">
							<select onChange={handleSecondProduct} className="p-2 mt-2">
								<option defaultValue="Seleziona uno smartphone">
									Seleziona uno smartphone
								</option>
								{products.map((p) => (
									<option key={p.id}>{p.title}</option>
								))}
							</select>
						</div>

						{/* mostro il secondo prodotto  */}
						{secondProductData && (
							<div className="row canvas-row mt-4">
								<div className="col text-center">{secondProductData.title}</div>
								<div className="col d-flex justify-content-center">
									<img
										src={secondProductData.image}
										alt={secondProductData.title}
										className="w-75"
									/>
								</div>
							</div>
						)}
						{/* bottone per andare alla pagina di confronto  */}
						<div className="d-flex justify-content-center">
							<Link
								to="/compareProducts"
								state={{ product1: product, product2: secondProductData }}
							>
								<button className="btn btn-primary mt-2 " type="button">
									Vai al confronto
								</button>
							</Link>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
