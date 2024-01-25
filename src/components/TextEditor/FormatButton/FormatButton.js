// import type { FC } from "react";
// import { IconButton } from '../../Button';
// import type { IconType } from "../../Icon/IconType";
// import './FormatButton.module.scss';

import styles from './FormatButton.module.scss';

// type TProps = {
//   isActive?: boolean;
//   onToggle: (style: string) => void;
//   size?: string;
//   style: string;
//   typeIcon: IconType | string;
// };

export const FormatButton = ({ isActive, onToggle, style, typeIcon }) => {
	return (
		<div
			className={styles.format_button}
			onMouseDown={(event) => {
				event.preventDefault();
				onToggle?.(style);
			}}>
			{/* <IconButton
				className={styles.btn_icon}
				isActive={isActive}
				typeIcon={typeIcon}
			/> */}
			<button
				className={styles.btn_icon}
				isActive={isActive}
				typeIcon={typeIcon}></button>
		</div>
	);
};
