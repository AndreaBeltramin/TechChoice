export default function Description({ prop }) {
	return (
		<div>
			{/* sezione caratteristiche generali  */}
			<div className="general-spec">
				<h3 className="mt-4 ">Caratteristiche generali</h3>
				<table className="table table-striped ">
					<tbody>
						<tr>
							<th scope="row">Nome: </th>
							<td>{prop.title}</td>
						</tr>
						<tr>
							<th scope="row">Marca: </th>
							<td>{prop.brand}</td>
						</tr>
						<tr>
							<th scope="row">Tipo di prodotto: </th>
							<td>{prop.category}</td>
						</tr>
						<tr>
							<th scope="row">Anno di uscita: </th>
							<td>{prop.release_year}</td>
						</tr>
						<tr>
							<th scope="row">Dimensioni: </th>
							<td>{prop.dimensions}</td>
						</tr>
						<tr>
							<th scope="row">Peso: </th>
							<td>{prop.weight}</td>
						</tr>
						<tr>
							<th scope="row">Sistema operativo: </th>
							<td>{prop.operating_system}</td>
						</tr>
						<tr>
							<th scope="row">Materiali: </th>
							<td>{prop.materials}</td>
						</tr>
						<tr>
							<th scope="row">Sim: </th>
							<td>{prop.sim}</td>
						</tr>
					</tbody>
				</table>
			</div>

			{/* sezione caratteristiche specifiche  */}
			<div className="spec-spec">
				<h3 className="mt-4 ">Caratteristiche specifiche</h3>
				<table className="table table-striped">
					<tbody>
						<tr>
							<th scope="row">Display: </th>
							<td>{prop.display}</td>
						</tr>
						<tr>
							<th scope="row">Chip: </th>
							<td>{prop.chip}</td>
						</tr>
						<tr>
							<th scope="row">Capacità di memoria: </th>
							<td>{prop.storage}</td>
						</tr>
						<tr>
							<th scope="row">Batteria: </th>
							<td>{prop.battery}</td>
						</tr>
						<tr>
							<th scope="row">Camera: </th>
							<td>{prop.cameras}</td>
						</tr>
						<tr>
							<th scope="row">Porta di ricarica: </th>
							<td>{prop.port}</td>
						</tr>
						<tr>
							<th scope="row">Bluetooth: </th>
							<td>{prop.bluetooth}</td>
						</tr>
						<tr>
							<th scope="row">Connettività: </th>
							<td>{prop.network_connectivity}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}
