import { useEffect, useState } from 'react';
import axios from '../config/axios/axios';
import SearchSection from '../components/SearchSection/SearchSection';
import Footer from '../components/Footer/Footer';
import MainSection from '../components/MainSection/MainSection';
import { URL_GET_POSTS, URL_SEARCH_POSTS } from '../config/API_url';

export default function HomePage() {
	const [posts, setPosts] = useState([]);
	const [countPosts, setCountPosts] = useState(0);
	const [searchTerm, setSearchTerm] = useState(null);
	const [isSearch, setIsSearch] = useState(false);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);

	const handleSearch = async (newSearchTerm) => {
		setSearchTerm(newSearchTerm);
		setPage(1); //Resetting the page number when changing the search query
	};

	console.log('countpost', countPosts);

	useEffect(() => {
		const fetcFilterPosts = async () => {
			try {
				setIsLoading(true);
				const params = {
					page_size: 5,
					page: page,
				};

				if (searchTerm.query) {
					params.query = searchTerm.query;
				}

				if (searchTerm.countryId && searchTerm.countryId.length > 0) {
					params.country_ids = `[${searchTerm.countryId}]`;
				}

				if (searchTerm.profCategoriesId && searchTerm.profCategoriesId.length > 0) {
					params.category_ids = `[${searchTerm.profCategoriesId}]`;
				}

				const data = await axios.get(URL_SEARCH_POSTS, { params });
				setPosts([]);
				setCountPosts(data.count);
				setIsSearch(true);
				setIsLoading(false);
				setPosts((prevPosts) => [...prevPosts, ...data.results]);
			} catch (error) {
				setIsLoading(false);
				return error.message;
			}
		};

		if (searchTerm) {
			fetcFilterPosts();
		} else {
			const fetchAllPosts = async () => {
				try {
					setIsLoading(true);
					const data = await axios.get(URL_GET_POSTS, {
						params: {
							page_size: 5,
							page: page,
						},
					});
					// setCountPosts(0);
					// setPosts([]);
					setCountPosts(data.count);
					setIsSearch(false);
					setIsLoading(false);
					setPosts((prevPosts) => [...prevPosts, ...data.results]);
				} catch (error) {
					setIsLoading(false);
					return error.message;
				}
			};

			fetchAllPosts();
		}
	}, [page, searchTerm]);

	const handleNextPage = () => {
		setPage((prevPage) => prevPage + 1);
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
			<div style={{ flex: '1 0 auto' }}>
				<SearchSection onSearch={handleSearch} />
				<MainSection
					posts={posts}
					onNextPage={handleNextPage}
					countPosts={countPosts}
					isSearch={isSearch}
					isLoading={isLoading}
				/>
			</div>

			<Footer />
		</div>
	);
}
