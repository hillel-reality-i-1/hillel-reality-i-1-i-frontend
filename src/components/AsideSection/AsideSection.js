import { useJsApiLoader } from '@react-google-maps/api';
import CalendarOfEvents from '../CalendarOfEvents/CalendarOfEvents';
import Map from '../Map/Map';

import styles from './AsideSection.module.scss';

const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const defaultCenter = {
	lat: 50.44223817283616,
	lng: 30.521705746028925,
};

const libraries = ['places'];

const AsideSection = () => {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: API_KEY,
		libraries,
	});

	return (
		<aside className={styles.aside}>
			<CalendarOfEvents />
			{isLoaded ? <Map center={defaultCenter} /> : <h2>Loading...</h2>}
		</aside>
	);
};

export default AsideSection;
