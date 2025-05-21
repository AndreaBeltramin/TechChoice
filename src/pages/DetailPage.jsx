import { useCallback, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Heart from "../components/Heart";
import Loader from "../components/Loader";
import Description from "../components/Description";

export default function DetailPage() {
	const { id } = useParams();
	const { products, showProduct, handleProductSelection } =
		useContext(GlobalContext);
	// console.log(product);

	// stato per i dati del primo prodotto
	const [product, setProduct] = useState(null);

	// stato per i dati del secondo prodotto
	const [secondProductData, setSecondProductData] = useState(null);

	// stato per i dati del terzo prodotto
	const [thirdProductData, setThirdProductData] = useState(null);

	// funzione per recuperare i dati dei prodotti dal loro id
	const handleProduct = useCallback(
		async (id) => {
			try {
				const productData = await showProduct(id);
				//se c'è un prodotto recupero tutti i suoi dati
				setProduct(productData);
				// console.log(product);
			} catch (error) {
				console.error(error);
				setProduct(null);
			}
		},
		[showProduct]
	);

	// al montaggio del componente recupero i dati del prodotto
	useEffect(() => {
		handleProduct(id);
	}, [id]);

	// se non c'è il prodotto mostro un messaggio appropriato di caricamento
	if (!product) {
		return <Loader />;
	}

	return (
		<div className="container-md mt-4">
			{/* link per tornare alla home */}
			<Link to="/">
				<button className="btn btn-secondary mb-4">
					&#8592; Torna alla Home
				</button>{" "}
			</Link>
			{/* bottone di confronto */}
			<button
				className="btn btn-secondary mb-4 ms-2"
				data-bs-toggle="offcanvas"
				href="#offcanvasConfronto"
				role="button"
				aria-controls="offcanvasConfronto"
			>
				Confronta
			</button>

			{/* sezione immagine e descrizione del prodotto */}
			<section>
				<div className="row">
					<div className="col-12 col-lg-5">
						<div className="d-flex justify-content-center ">
							<h2 className="me-1">
								{product.title} ({product.brand})
							</h2>
							<div>
								{/* icona del cuore */}
								<Heart id={product.id} />
							</div>
						</div>
						<div className="text-center">
							{/* mostro l'immagine del prodotto */}
							<img
								src={product.image}
								alt={product.title}
								className="img-fluid"
							/>
						</div>

						<div className="text-center mt-2">
							<h2>{product.price?.toFixed(2)}€</h2>
						</div>
					</div>
					<div className="col-12 col-lg-7">
						{/* se c'è una descrizione la mostro */}
						{product.description && (
							<div>
								<h3>Breve descrizione del prodotto: </h3>
								<div className="descrizione-prodotto">
									{product.description}
								</div>
							</div>
						)}
					</div>
				</div>
			</section>

			{/* sezione descrizione specifiche */}
			<section>
				<Description prop={product} />
			</section>

			{/* sezione selezione confronto  */}
			<div
				className="offcanvas offcanvas-end"
				tabIndex="-1"
				id="offcanvasConfronto"
				aria-labelledby="offcanvasConfrontoLabel"
			>
				<div className="offcanvas-header">
					<span className="offcanvas-title" id="offcanvasConfrontoLabel">
						Seleziona almeno un altro dispositivo per fare il confronto
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
						<select
							onChange={(e) => handleProductSelection(e, setSecondProductData)}
							className="p-2 mt-2"
							value={secondProductData?.id || ""}
						>
							<option value="">Seleziona un dispositivo</option>
							{/* creo dinamicamente le opzioni riordinando i prodotti in ordine alfabetico e togliendo dalla lista i prodotti già selezionati */}
							{[...products]
								.sort((a, b) => a.title.localeCompare(b.title))
								.filter(
									(p) => p.id !== product?.id && p.id !== thirdProductData?.id
								)
								.map((p) => (
									<option key={p.id} value={p.id}>
										{p.title}
									</option>
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

					{/* selezione per il terzo prodotto */}
					{secondProductData && (
						<>
							<div className={`mt-2 ${thirdProductData ? "d-none" : ""}`}>
								Vuoi aggiungere un altro dispositivo?
							</div>
							<div className="d-flex justify-content-center ">
								<select
									onChange={(e) =>
										handleProductSelection(e, setThirdProductData)
									}
									className="p-2 mt-2"
									value={thirdProductData?.id || ""}
								>
									<option value="">Seleziona un dispositivo</option>
									{/* creo dinamicamente le opzioni riordinando i prodotti in ordine alfabetico e togliendo dalla lista i prodotti già selezionati */}
									{[...products]
										.sort((a, b) => a.title.localeCompare(b.title))
										.filter(
											(p) =>
												p.id !== product?.id && p.id !== secondProductData?.id
										)
										.map((p) => (
											<option key={p.id} value={p.id}>
												{p.title}
											</option>
										))}
								</select>
							</div>
							{thirdProductData && (
								<div className="row canvas-row mt-4">
									<div className="col text-center">
										{thirdProductData.title}
									</div>
									<div className="col d-flex justify-content-center">
										<img
											src={thirdProductData.image}
											alt={thirdProductData.title}
											className="w-75"
										/>
									</div>
								</div>
							)}
						</>
					)}

					{/* bottone per andare alla pagina di confronto  */}
					<div className="d-flex justify-content-center">
						<Link
							to="/compareProducts"
							state={{
								product1: product,
								product2: secondProductData,
								product3: thirdProductData,
							}}
						>
							{secondProductData && (
								<button className="btn btn-secondary mt-2 " type="button">
									Vai al confronto
								</button>
							)}
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
