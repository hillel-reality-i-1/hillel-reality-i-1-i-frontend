import { useCallback, useRef } from 'react';

import { GoogleMap } from '@react-google-maps/api';

import styles from './Map.module.scss';
import { defaultTheme } from './Theme';

const containerStyle = {
	width: '100%',
	height: '240px',
	borderRadius: '24px',
};
// const containerStyle = {
// 	width: window.innerWidth <= 768 ? '100%' : '364px',
// 	height: window.innerWidth <= 768 ? '300px' : '240px',
// 	borderRadius: window.innerWidth <= 768 ? '0' : '24px',
// };

const defaultOptions = {
	panControl: true,
	zomControl: true,
	mapTypeControl: false,
	scaleControl: false,
	streetViewControl: false,
	rotateControl: false,
	clickableIcons: false,
	keyboardShortcuts: false,
	scrollwheel: true,
	disableDoubleClickZoom: false,
	fullscreenControl: true,
	zoomControl: false,
	styles: defaultTheme,
};

const Map = ({ center }) => {
	const mapRef = useRef(undefined);

	const onLoad = useCallback(function callback(map) {
		mapRef.current = map;
	}, []);

	const onUnmount = useCallback(function callback(map) {
		mapRef.current = undefined;
	}, []);

	return (
		<div className={styles.container}>
			<h4 className={styles.map_title}>U-Map</h4>
			<div className={styles.map_wrapper}>
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={center}
					zoom={12}
					onLoad={onLoad}
					onUnmount={onUnmount}
					options={defaultOptions}>
					<></>
				</GoogleMap>
			</div>
		</div>
	);
};

export default Map;
