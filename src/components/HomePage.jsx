import { useState } from "react";
import Popular from "./Popular.jsx";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import Upcoming from "./Upcoming.jsx";
import Airing from "./Airing.jsx";

const HomePage = () => {
	const {
		handleSubmit,
		search,
		handleChange,
		getUpcomingAnime,
		getAiringAnime,
	} = useGlobalContext();

	const [rendered, setRendered] = useState("popular");

	const switchComponent = () => {
		switch (rendered) {
			case "popular":
				return <Popular rendered={rendered} />;
			case "airing":
				return <Airing rendered={rendered} />;
			case "upcoming":
				return <Upcoming rendered={rendered} />;
			default:
				return <Popular rendered={rendered} />;
		}
	};

	return (
		<>
			<div className="">
				<header className="">
					<div className="flex justify-center gap-10 my-[4rem]">
						<div>
							<button
								className={
									rendered === "popular"
										? `bg-blue-200 rounded-md py-[0.3rem] px-[0.7rem]`
										: `hover:bg-gray-200 rounded-md py-[0.3rem] px-[0.7rem]`
								}
								onClick={() => setRendered("popular")}>
								Popular
								<i className="fa-solid fa-fire mx-1"></i>
							</button>
						</div>
						<form onSubmit={handleSubmit}>
							<input
								type="text"
								placeholder="Search Anime"
								value={search}
								onChange={handleChange}
								className="rounded-md py-[0.3rem] px-[0.7rem] mx-[1rem]"
							/>
							<button
								type="Submit"
								className="bg-black text-white rounded-md py-[0.3rem] px-[0.7rem]">
								<i className="fa-solid fa-magnifying-glass"></i>
							</button>
						</form>
						<div>
							<button
								className={
									rendered === "airing"
										? `bg-blue-200 rounded-md py-[0.3rem] px-[0.7rem]`
										: `hover:bg-gray-200 rounded-md py-[0.3rem] px-[0.7rem]`
								}
								onClick={() => {
									setRendered("airing");
									getAiringAnime();
								}}>
								Airing
							</button>
						</div>
						<div>
							<button
								className={
									rendered === "upcoming"
										? `bg-blue-200 rounded-md py-[0.3rem] px-[0.7rem]`
										: `hover:bg-gray-200 rounded-md py-[0.3rem] px-[0.7rem]`
								}
								onClick={() => {
									setRendered("upcoming");
									getUpcomingAnime();
								}}>
								Upcoming
							</button>
						</div>
					</div>
				</header>
				{switchComponent()}
			</div>
		</>
	);
};

export default HomePage;
