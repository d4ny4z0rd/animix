import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import PropTypes from "prop-types";

const Airing = ({ rendered }) => {
	const { airingAnime, isSearch, searchResults } = useGlobalContext();

	const conditionalRender = () => {
		if (!isSearch && rendered === "airing") {
			return airingAnime?.map((anime) => {
				return (
					<Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
						<img
							src={anime.images.jpg.large_image_url}
							alt=""
							className="h-full w-full object-cover rounded-lg"
						/>
					</Link>
				);
			});
		} else {
			return searchResults?.map((anime) => {
				return (
					<Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
						<img src={anime.images.jpg.large_image_url} alt="" />
					</Link>
				);
			});
		}
	};

	return (
		<div>
			<div className="grid gap-10 grid-cols-5 m-10">{conditionalRender()}</div>
		</div>
	);
};

Airing.propTypes = {
	rendered: PropTypes.string,
};

export default Airing;
