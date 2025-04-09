import { NavLink } from "react-router-dom";

export default function Header() {
	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<div className="navbar-brand">
					<img src="./logo1.svg" alt="logo" className="logo" />
				</div>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<NavLink to="/" className="nav-link" aria-current="page" href="#">
								Home
							</NavLink>
						</li>

						<li className="nav-item">
							<NavLink to="/likedProducts" className="nav-link" href="#">
								Prodotti preferiti
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/compareProducts" className="nav-link" href="#">
								Confronta i prodotti
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
