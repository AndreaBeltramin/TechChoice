import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
	return (
		<footer className="container-fluid footer">
			<div className="row p-3">
				<div className="col">
					<span>Contattaci su:</span>
					<div className="mt-2">
						<FontAwesomeIcon
							icon={faInstagram}
							size="xl"
							className="me-2"
							style={{ color: "#ffffff", cursor: "pointer" }}
						/>
						<FontAwesomeIcon
							icon={faFacebook}
							size="xl"
							className="me-2"
							style={{ color: "#ffffff", cursor: "pointer" }}
						/>
						<FontAwesomeIcon
							icon={faXTwitter}
							size="xl"
							className="me-2"
							style={{ color: "#ffffff", cursor: "pointer" }}
						/>
						<FontAwesomeIcon
							icon={faYoutube}
							size="xl"
							className="me-2"
							style={{ color: "#ffffff", cursor: "pointer" }}
						/>
					</div>
				</div>
				<div className="col text-end">
					<span>App TechChoice</span>
					<div className="mt-2">
						<img
							src="https://cms-images.mmst.eu/hzxov1nxpus5/6LRuYtAP7U7r4gDeUFXQpj/6e88066d482f613582d985373988e870/AppleStoreEn.svg?q=80"
							alt="Download Apple"
							className="ms-2"
							style={{ cursor: "pointer" }}
						/>

						<img
							src="https://cms-images.mmst.eu/hzxov1nxpus5/Nke1b40tgIZ4cEd81r4SZ/184507693030fe65d6e02d313c972aeb/GoogleAppStoreEn.svg?q=80"
							alt="Download Android"
							className="ms-2"
							style={{ cursor: "pointer" }}
						/>
						<img
							src="https://cms-images.mmst.eu/hzxov1nxpus5/3oCFHx948DJl9ycybkil7R/0fb00f5450ccdf2320219901500ea658/HuaweiAppStoreEn.svg?q=80"
							alt="Download Huawei"
							className="ms-2"
							style={{ cursor: "pointer" }}
						/>
					</div>
				</div>
			</div>
		</footer>
	);
}
