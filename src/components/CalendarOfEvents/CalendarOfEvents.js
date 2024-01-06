import { useState } from 'react';

import Calendar from 'react-calendar';
import { ReactComponent as ArrowLeft } from '../../assets/img/icons/calendar/Icon_calendar_arrow_left.svg';
import { ReactComponent as ArrowRight } from '../../assets/img/icons/calendar/Icon_calendar_arrow_right.svg';

import 'react-calendar/dist/Calendar.css';
import './Calendar.scss';

import styles from './CalendarOfEvents.module.scss';

const CalendarOfEvents = () => {
	const [value, onChange] = useState(new Date());

	return (
		<div className={styles.container}>
			<h4 className={styles.calendar_title}>Calendar of events</h4>
			<Calendar
				className='Calendar'
				tileClassName='Calendar-DayTile'
				onChange={onChange}
				value={value}
				locale='en'
				nextLabel={<ArrowRight />}
				prevLabel={<ArrowLeft />}
			/>
		</div>
	);
};

export default CalendarOfEvents;
