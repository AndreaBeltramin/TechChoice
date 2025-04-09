import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function DetailPage() {
	const { id } = useParams();
	const { products } = useContext(GlobalContext);

	const [selectedProduct, setSelectedProduct] = useState("");
	console.log(selectedProduct);
	let selectedSmartphone;
	selectedSmartphone = products.find((p) => p.title === selectedProduct);
	console.log(selectedSmartphone);

	// const [isChecked, setIsChecked] = useState(false);
	// function isProductChecked() {
	// 	if (isChecked) {
	// 		setIsChecked(false);
	// 		console.log("Il prodotto non è selezionato");
	// 		setOpenSidebar(true);
	// 	} else {
	// 		setIsChecked(true);
	// 		console.log("Il prodotto è selezionato");
	// 	}
	// }

	const productDetail = products.find((p) => p.id === parseInt(id));
	return (
		<div className="container mt-4">
			<section>
				<h1>{productDetail.title}</h1>
				<div className="row">
					<div className="col-4">
						<img src={productDetail.image} alt={productDetail.title} />
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
			<section>
				<h3>Caratteristiche tecniche: </h3>
				<table className="table">
					<tbody>
						<tr>
							<th scope="row">Tipo di prodotto</th>
							<td>{productDetail.category}</td>
						</tr>
						<tr>
							<th scope="row">Sistema operativo</th>
							<td>{productDetail.operating_system}</td>
						</tr>
						<tr>
							<th scope="row">Capacità di memoria</th>
							<td>{productDetail.storage}</td>
						</tr>
						<tr>
							<th scope="row">Anno di uscita</th>
							<td>{productDetail.release_year}</td>
						</tr>
						<tr>
							<th scope="row">Display</th>
							<td>{productDetail.display}</td>
						</tr>
						<tr>
							<th scope="row">Camera</th>
							<td>{productDetail.cameras}</td>
						</tr>
						<tr>
							<th scope="row">Porta di ricarica</th>
							<td>{productDetail.port}</td>
						</tr>
					</tbody>
				</table>
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
					<h5 className="offcanvas-title" id="offcanvasConfrontoLabel">
						Seleziona un altro {productDetail.category} per fare il confronto
					</h5>
					<button
						type="button"
						className="btn-close"
						data-bs-dismiss="offcanvas"
						aria-label="Close"
					></button>
				</div>
				<div className="offcanvas-body">
					<div className="row d-flex flex-direction-column">
						<div className="col text-center">{productDetail.title}</div>
						<div className="col">
							<img src={productDetail.image} alt={productDetail.title} />
						</div>
					</div>
					<div className="d-flex justify-content-center">
						<select
							value={selectedProduct}
							onChange={(e) => {
								setSelectedProduct(e.target.value);
							}}
							className="p-2 "
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
						<div className="row d-flex flex-direction-column mt-4">
							<div className="col text-center">{selectedSmartphone.title}</div>
							<div className="col">
								<img
									src={selectedSmartphone.image}
									alt={selectedSmartphone.title}
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
							<button className="btn btn-primary mt-4 " type="button">
								Vai al confronto
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
