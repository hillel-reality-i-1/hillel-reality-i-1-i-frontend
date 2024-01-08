import { useEffect, useState } from 'react';
import axios from '../config/axios/axios';
import SearchSection from '../components/SearchSection/SearchSection';
import Footer from '../components/Footer/Footer';
import MainSection from '../components/MainSection/MainSection';

export default function HomePage() {
	const [posts, setPosts] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [page, setPage] = useState(1);

	const handleSearch = (newSearchTerm) => {
		// setSearchTerm(newSearchTerm);
		// setPage(1); //Resetting the page number when changing the search query
	};

	const handleNextPage = () => {
		console.log('Next');
		setPage((prevPage) => prevPage + 1);
	};
	// console.log('searchTerm', searchTerm);

	// console.log(posts);

	useEffect(() => {
		const fetchAllPosts = async () => {
			try {
				const data = await axios.get('/api/v1/content/posts/', {
					params: {
						page_size: 3,
						page: page,
					},
				});
				// console.log('dsata', data);
				setPosts(data.results);
			} catch (error) {
				return error.message;
			}
		};

		fetchAllPosts();
	}, [page]);

	return (
		<>
			<SearchSection onSearch={handleSearch} />
			<MainSection
				posts={posts}
				onNextPage={handleNextPage}
			/>
			<Footer />
		</>
	);
}
