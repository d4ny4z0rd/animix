import { Link, useParams } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import { useEffect, useState } from "react";

const Gallery = () => {
	const { getAnimePictures, pictures } = useGlobalContext();
	const { id } = useParams();

	//state
	const [index, setIndex] = useState(0);

	const handleImageClick = (i) => {
		setIndex(i);
	};

	useEffect(() => {
		getAnimePictures(id);
	}, [id]);

	return (
		<div>
			<div className="text-blue-500 mx-[2rem] my-[1rem]">
				<Link to={"/"}> &#8592; Back</Link>
			</div>
			<div className="flex justify-center my-[2rem] bg-green-100 mx-[50rem] p-[2rem] rounded-lg">
				<img
					src={pictures[index]?.jpg.image_url}
					alt=""
					className="rounded-lg h-[25rem]"
				/>
			</div>
			<div className="flex flex-wrap gap-4 mx-[5rem] justify-center bg-green-100 p-[3rem] rounded-lg my-[4rem]">
				{pictures?.map((picture, i) => {
					return (
						<div
							className="image-con"
							onClick={() => {
								handleImageClick(i);
							}}
							key={i}>
							<img
								className="h-[10rem] w-[7rem] rounded-lg cursor-pointer"
								src={picture?.jpg.image_url}
								style={{
									border:
										i === index ? "3px solid #27AE60" : "3px solid #e5e7eb",
									filter: i === index ? "grayscale(0)" : "grayscale(60%)",
									transform: i === index ? "scale(1.1)" : "scale(1)",
									transition: "all .3s ease-in-out",
								}}
								alt=""
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Gallery;
