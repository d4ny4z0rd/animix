import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnimeItem from "./components/AnimeItem";
import HomePage from "./components/HomePage";
import Gallery from "./components/Gallery";

function App() {
	return (
		<>
			<h1 className="text-blue-500 text-4xl m-[2rem] font-bold">Animix</h1>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/anime/:id" element={<AnimeItem />} />
					<Route path="/character/:id" element={<Gallery />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
