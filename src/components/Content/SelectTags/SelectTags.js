import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as TagDel } from '../../../assets/img/icons/icon-create-post/icon_tag_del.svg';
import styles from './PostCreationForm.module.scss';

const SelectTags = ({ selectedCountries, availableCountries, onCountryClick }) => {
	const [isAvailableVisible, setAvailableVisible] = useState(false);
	const selectRef = useRef(null);

	const handleCountryClick = (country) => {
		onCountryClick(country);
	};

	const handleDocumentClick = (event) => {
		if (selectRef.current && !selectRef.current.contains(event.target)) {
			if (!event.target.classList.contains(styles.tag)) {
				// Click was outside the select_country and not on the tag, hide select_country_available
				setAvailableVisible(false);
			}
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleDocumentClick);

		return () => {
			document.removeEventListener('click', handleDocumentClick);
		};
	}, []);

	const toggleAvailableVisibility = () => {
		setAvailableVisible(!isAvailableVisible);
	};

	return (
		<div
			className={styles.select_country}
			ref={selectRef}>
			<span className={styles.select_title}>Країна</span>
			<div
				className={`${styles.select_country_selected} ${
					isAvailableVisible && styles.select_country_selected_active
				}`}
				onClick={toggleAvailableVisibility}>
				{selectedCountries.map((country) => (
					<div
						className={styles.tag}
						key={country.id}
						onClick={() => handleCountryClick(country)}>
						{country.name}
						<TagDel />
					</div>
				))}
			</div>
			{isAvailableVisible && (
				<div className={styles.select_country_available}>
					{availableCountries.map((country) => (
						<div
							className={styles.tag}
							key={country.id}
							onClick={() => handleCountryClick(country)}>
							{country.name}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default SelectTags;
