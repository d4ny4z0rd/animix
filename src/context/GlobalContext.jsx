import React, { createContext, useContext, useReducer, useState } from "react";
import PropTypes from "prop-types";

const GlobalContext = createContext();

const baseUrl = "https://api.jikan.moe/v4";

//actions
const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME";
const GET_PICTURES = "GET_PICTURES";

//reducer
const reducer = (state, action) => {
	switch (action.type) {
		case LOADING:
			return { ...state, loading: true };
		case GET_POPULAR_ANIME:
			return { ...state, popularAnime: action.payload, loading: false };
		case SEARCH:
			return { ...state, searchResults: action.payload, loading: false };
		case GET_UPCOMING_ANIME:
			return { ...state, upcomingAnime: action.payload, loading: false };
		case GET_AIRING_ANIME:
			return { ...state, airingAnime: action.payload, loading: false };
		case GET_PICTURES:
			return { ...state, pictures: action.payload, loading: false };
		default:
			return state;
	}
};

export const GlobalContextProvider = ({ children }) => {
	//intial state
	const intialState = {
		popularAnime: [],
		upcomingAnime: [],
		airingAnime: [],
		pictures: [],
		isSearch: false,
		searchResults: [],
		loading: false,
		page: 1,
	};

	const [state, dispatch] = useReducer(reducer, intialState);
	const [search, setSearch] = React.useState("");
	const [page, setPage] = useState(1);

	//handle change
	const handleChange = (e) => {
		setSearch(e.target.value);
		if (e.target.value === "") {
			state.isSearch = false;
		}
	};

	//handle submit
	const handleSubmit = (e) => {
		e.preventDefault();
		if (search) {
			searchAnime(search);
			state.isSearch = true;
		} else {
			state.isSearch = false;
			alert("Please enter a search term");
		}
	};

	//fetch popular anime
	const getPopularAnime = async () => {
		dispatch({ type: LOADING });
		const response = await fetch(
			`${baseUrl}/top/anime?page=${page}&filter=bypopularity`
		);
		const data = await response.json();
		console.log(data);
		dispatch({ type: GET_POPULAR_ANIME, payload: data.data });
	};

	//fetch upcoming anime
	const getUpcomingAnime = async () => {
		dispatch({ type: LOADING });
		const response = await fetch(
			`${baseUrl}/top/anime?page=${page}&filter=upcoming`
		);
		const data = await response.json();
		dispatch({ type: GET_UPCOMING_ANIME, payload: data.data });
		setPage(page);
	};

	//fetch airing anime
	const getAiringAnime = async () => {
		dispatch({ type: LOADING });
		const response = await fetch(
			`${baseUrl}/top/anime?page=${page}&filter=airing`
		);
		const data = await response.json();
		dispatch({ type: GET_AIRING_ANIME, payload: data.data });
		setPage(page);
	};

	//search anime
	const searchAnime = async (anime) => {
		dispatch({ type: LOADING });
		const response = await fetch(
			`https://api.jikan.moe/v4/anime?q=${anime}&order_by=popularity&sort=asc&sfw`
		);
		const data = await response.json();
		dispatch({ type: SEARCH, payload: data.data });
	};

	//get anime pictures
	const getAnimePictures = async (id) => {
		dispatch({ type: LOADING });
		const response = await fetch(
			`https://api.jikan.moe/v4/characters/${id}/pictures`
		);
		const data = await response.json();
		dispatch({ type: GET_PICTURES, payload: data.data });
	};

	//handle setPage
	const handleSetPage = async () => {
		setPage(page + 1);
		console.log(page);
	};

	//initial render
	React.useEffect(() => {
		getPopularAnime();
		getAiringAnime();
		getUpcomingAnime();
	}, [page]);

	return (
		<GlobalContext.Provider
			value={{
				...state,
				handleChange,
				handleSubmit,
				searchAnime,
				search,
				getPopularAnime,
				getUpcomingAnime,
				getAiringAnime,
				getAnimePictures,
				page,
				handleSetPage,
				setPage,
			}}>
			{children}
		</GlobalContext.Provider>
	);
};

GlobalContextProvider.propTypes = {
	children: PropTypes.element,
};

export const useGlobalContext = () => {
	return useContext(GlobalContext);
};
