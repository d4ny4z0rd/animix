import { Link } from "react-router-dom";

const Backbar = () => {
	return (
		<div className="p-2">
			<Link to={"/"}>
				<i className="fa-solid fa-arrow-left m-2 text-sm text-blue-500"></i>
				<span className="text-blue-500">Back</span>
			</Link>
		</div>
	);
};

export default Backbar;
