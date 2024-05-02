import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const AnimeItem = () => {
	const { id } = useParams();

	//State
	const [anime, setAnime] = useState({});
	const [characters, setCharacters] = useState([]);
	const [showmore, setShowmore] = useState(false);

	//destructure anime
	const {
		title,
		synopsis,
		trailer,
		duration,
		aired,
		season,
		images,
		rank,
		score,
		scored_by,
		popularity,
		status,
		rating,
		source,
	} = anime;

	//get anime based on id
	const getAnime = async (animeId) => {
		const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
		const data = await response.json();
		setAnime(data.data);
	};

	console.log(id);
	console.log(anime);

	//get characters based on id
	const getCharacters = async (animeId) => {
		const response = await fetch(
			`https://api.jikan.moe/v4/anime/${animeId}/characters`
		);
		const data = await response.json();
		console.log(data.data);
		setCharacters(data.data);
	};

	useEffect(() => {
		getAnime(id);
		getCharacters(id);
	}, []);

	console.log(characters);

	return (
		<div>
			<h1 className="text-3xl font-bold mt-[2rem] ml-[4rem]">{title}</h1>
			<div className="mx-16 my-[2rem] bg-red-100 flex flex-col justify-center content-center text-center rounded-lg">
				<div className="flex flex-col sm:flex-row content-center justify-evenly my-[4rem]">
					<div className="border-black content-center">
						<img
							src={images?.jpg.large_image_url}
							alt=""
							className="rounded-md"
						/>
					</div>
					<div className="text-lg flex flex-col gap-8 justify-end content-center sm:text-start text-center">
						<p>
							<span className="font-bold">Aired : </span>
							<span>{aired?.string}</span>
						</p>
						<p>
							<span className="font-bold">Rating : </span>
							<span>{rating}</span>
						</p>
						<p>
							<span className="font-bold">Rank : </span>
							<span>{rank}</span>
						</p>
						<p>
							<span className="font-bold">Score </span>
							<span>{score}</span>
						</p>
						<p>
							<span className="font-bold">Score by : </span>
							<span>{scored_by}</span>
						</p>
						<p>
							<span className="font-bold">Popularity : </span>
							<span>{popularity}</span>
						</p>
						<p>
							<span className="font-bold">Status : </span>
							<span>{status}</span>
						</p>
						<p>
							<span className="font-bold">Source : </span>
							<span>{source}</span>
						</p>
						<p>
							<span className="font-bold">Season : </span>
							<span>{season}</span>
						</p>
						<p>
							<span className="font-bold">Duration : </span>
							<span>{duration}</span>
						</p>
					</div>
				</div>
				<div>
					<p className="my-[4%] mx-[2rem] text-lg">
						{showmore ? synopsis : synopsis?.substring(0, 450) + "..."}
						<button
							className="ml-4 text-blue-600"
							onClick={() => setShowmore(!showmore)}>
							{showmore ? "Show less" : "Show more"}
						</button>
					</p>
				</div>
				<h3 className="text-3xl font-bold">Trailer</h3>
				<div>
					{trailer?.embed_url && (
						<iframe
							className="xl:ml-[28%] lg:ml-[6%] md:ml-[3.5%] my-[3%]"
							src={trailer?.embed_url}
							title={title}
							height={"450"}
							width={"800"}
							allowFullScreen></iframe>
					)}
				</div>
				<div>
					<h3 className="text-3xl font-bold my-[4rem]">Characters</h3>
					<div className="flex flex-wrap gap-8 mx-[5rem] my-[5rem]">
						{characters?.map((character, index) => {
							const { role } = character;
							const { images, name, mal_id } = character.character;
							return (
								<Link
									to={`/character/${mal_id}`}
									key={index}
									className="hover:translate-y-2">
									<div>
										<img
											src={images?.jpg.image_url}
											alt="Character"
											className="h-[20rem] w-[15rem] rounded-lg"
										/>
										<h2 className="text-xl font-semibold my-[1rem]">{name}</h2>
										<p>({role})</p>
									</div>
								</Link>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AnimeItem;
