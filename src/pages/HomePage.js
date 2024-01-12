import { useEffect, useState } from 'react';
import axios from '../config/axios/axios';
import SearchSection from '../components/SearchSection/SearchSection';
import Footer from '../components/Footer/Footer';
import MainSection from '../components/MainSection/MainSection';
import { URL_GET_POSTS } from '../config/API_url';

export default function HomePage() {
	const [posts, setPosts] = useState([]);
	const [countPosts, setCountPosts] = useState(0);
	// const [searchTerm, setSearchTerm] = useState('');
	const [page, setPage] = useState(1);

	const handleSearch = (newSearchTerm) => {
		// setSearchTerm(newSearchTerm);
		// setPage(1); //Resetting the page number when changing the search query
	};

	useEffect(() => {
		const fetchAllPosts = async () => {
			try {
				const data = await axios.get(URL_GET_POSTS, {
					params: {
						page_size: 3,
						page: page,
					},
				});

				setCountPosts(data.count);
				// console.log('dsata', data);
				setPosts((prevPosts) => [...prevPosts, ...data.results]);
			} catch (error) {
				return error.message;
			}
		};

		fetchAllPosts();
	}, [page]);

	const handleNextPage = () => {
		setPage((prevPage) => prevPage + 1);
	};

	// console.log(posts);

	return (
		<>
			<SearchSection onSearch={handleSearch} />
			<MainSection
				posts={posts}
				onNextPage={handleNextPage}
				countPosts={countPosts}
			/>
			<Footer />
		</>
	);
}
