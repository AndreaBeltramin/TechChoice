import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Heart from "../components/Heart";

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
		<div className="container-md my-4">
			{/* link per tornare alla home */}
			<Link to="/">
				<button className="btn btn-primary mb-4">
					&#8592; Torna alla Home
				</button>{" "}
			</Link>
			{/* bottone di confronto */}
			<button
				className="btn btn-primary mb-4 ms-2"
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
							<img src={product.image} alt={product.title} />
						</div>

						<div className="text-center mt-2">
							<h2>{product.price?.toFixed(2)}€</h2>
						</div>
					</div>
					<div className="col-12 col-lg-7">
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
			<section className="d-xl-flex justify-content-evenly">
				{/* sezione caratteristiche generali */}
				<div className="me-4">
					<h3 className="mt-4 ">Caratteristiche generali</h3>
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

					<table className="table table-striped ">
						<tbody>
							<tr>
								<th scope="row">Nome: </th>
								<td>{product.title}</td>
							</tr>
							<tr>
								<th scope="row">Marca: </th>
								<td>{product.brand}</td>
							</tr>
							<tr>
								<th scope="row">Tipo di prodotto: </th>
								<td>{product.category}</td>
							</tr>
							<tr>
								<th scope="row">Anno di uscita: </th>
								<td>{product.release_year}</td>
							</tr>
							<tr>
								<th scope="row">Dimensioni: </th>
								<td>{product.dimensions}</td>
							</tr>
							<tr>
								<th scope="row">Peso: </th>
								<td>{product.weight}</td>
							</tr>
							<tr>
								<th scope="row">Sistema operativo: </th>
								<td>{product.operating_system}</td>
							</tr>
							<tr>
								<th scope="row">Materiali: </th>
								<td>{product.materials}</td>
							</tr>
							<tr>
								<th scope="row">Sim: </th>
								<td>{product.sim}</td>
							</tr>
						</tbody>
					</table>
				</div>

				{/* sezione caratteristiche specifiche */}
				<div>
					<h3 className="mt-4 ">Caratteristiche specifiche</h3>
					<table className="table table-striped">
						<tbody>
							<tr>
								<th scope="row">Display: </th>
								<td>{product.display}</td>
							</tr>
							<tr>
								<th scope="row">Chip: </th>
								<td>{product.chip}</td>
							</tr>
							<tr>
								<th scope="row">Capacità di memoria: </th>
								<td>{product.storage}</td>
							</tr>
							<tr>
								<th scope="row">Batteria: </th>
								<td>{product.battery}</td>
							</tr>
							<tr>
								<th scope="row">Camera: </th>
								<td>{product.cameras}</td>
							</tr>
							<tr>
								<th scope="row">Porta di ricarica: </th>
								<td>{product.port}</td>
							</tr>
							<tr>
								<th scope="row">Bluetooth: </th>
								<td>{product.bluetooth}</td>
							</tr>
							<tr>
								<th scope="row">Connettività: </th>
								<td>{product.network_connectivity}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>

			{/* sezione selezione confronto  */}
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
								<option defaultValue="Seleziona un dispositivo">
									Seleziona {product.category.toLowerCase()}
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
