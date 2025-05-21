import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Loader() {
	return (
		<div className="spinner-container">
			<h1>
				Caricamento dati <FontAwesomeIcon icon={faRotateRight} spin />
			</h1>
		</div>
	);
}
