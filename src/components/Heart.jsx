import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

export default function Heart({ id }) {
	const { handleClick, isProductLiked } = useContext(GlobalContext);
	return (
		// icona del cuore
		<FontAwesomeIcon
			//se il prodotto ha il mi piace faccio vedere il cuore pieno sennò il cuore vuoto
			icon={isProductLiked(id) ? solidHeart : regularHeart}
			onClick={() => handleClick(id)}
			className="fa-xl heart mt-2 me-2"
		/>
	);
}
