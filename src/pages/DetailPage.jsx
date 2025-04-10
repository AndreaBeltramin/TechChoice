import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Card from "../components/Card";

export default function DetailPage() {
	const { id } = useParams();
	const { products, showProduct, product } = useContext(GlobalContext);
	console.log(product);

	const [selectedProduct, setSelectedProduct] = useState("");
	console.log(selectedProduct);
	let selectedSmartphone;
	selectedSmartphone = products.find((p) => p.title === selectedProduct);
	console.log(selectedSmartphone);

	// const productDetail = products.find((p) => p.id === parseInt(id));
	const productDetail = product;

	useEffect(() => {
		showProduct(id);
	}, []);

	return (
		<div className="container my-4">
			{/* sezione immagine e descrizione */}
			<section>
				<div className="row">
					<div className="col-4 text-center">
						<Card prop={productDetail} />
					</div>
					<div className="col-8">
						{productDetail.description && (
							<div>
								<h3>Breve descrizione del prodotto: </h3>{" "}
								{productDetail.description}
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
						<span>{productDetail.category}</span>
					</div>
					<div className="my-1">
						<span className="h5">Sistema operativo: </span>
						<span>{productDetail.operating_system}</span>
					</div>
					<div className="my-1">
						<span className="h5">Capacità di memoria: </span>
						<span>{productDetail.storage}</span>
					</div>
					<div className="my-1">
						<span className="h5">Anno di uscita: </span>
						<span>{productDetail.release_year}</span>
					</div>
					<div className="my-1">
						<span className="h5">Display: </span>
						<span>{productDetail.display}</span>
					</div>
					<div className="my-1">
						<span className="h5">Camera: </span>
						<span>{productDetail.cameras}</span>
					</div>
					<div className="my-1">
						<span className="h5">Porta di ricarica: </span>
						<span>{productDetail.port}</span>
					</div>
				</div>
			</section>

			<a
				className="btn btn-primary"
				data-bs-toggle="offcanvas"
				href="#offcanvasConfronto"
				role="button"
				aria-controls="offcanvasConfronto"
			>
				Confronta
			</a>

			<div
				className="offcanvas offcanvas-end"
				tabIndex="-1"
				id="offcanvasConfronto"
				aria-labelledby="offcanvasConfrontoLabel"
			>
				<div className="offcanvas-header">
					<span className="offcanvas-title" id="offcanvasConfrontoLabel">
						Seleziona un altro {productDetail.category} per fare il confronto
					</span>
					<button
						type="button"
						className="btn-close"
						data-bs-dismiss="offcanvas"
						aria-label="Close"
					></button>
				</div>
				<div className="offcanvas-body">
					<div className="row canvas-row">
						<div className="col text-center mb-2">{productDetail.title}</div>
						<div className="col d-flex justify-content-center">
							<img
								src={productDetail.image}
								alt={productDetail.title}
								className="w-75"
							/>
						</div>
					</div>
					<div className="d-flex justify-content-center">
						<select
							value={selectedProduct}
							onChange={(e) => {
								setSelectedProduct(e.target.value);
							}}
							className="p-2 mt-2"
						>
							<option defaultValue="Seleziona uno smartphone">
								Seleziona uno smartphone
							</option>
							{products.map((p) => (
								<option key={p.id}>{p.title}</option>
							))}
						</select>
					</div>

					{selectedSmartphone !== undefined ? (
						<div className="row canvas-row mt-4">
							<div className="col text-center">{selectedSmartphone.title}</div>
							<div className="col d-flex justify-content-center">
								<img
									src={selectedSmartphone.image}
									alt={selectedSmartphone.title}
									className="w-75"
								/>
							</div>
						</div>
					) : (
						""
					)}

					<div className="d-flex justify-content-center">
						<Link
							to="/compareProducts"
							state={{ product1: productDetail, product2: selectedSmartphone }}
						>
							<button className="btn btn-primary mt-2 " type="button">
								Vai al confronto
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
