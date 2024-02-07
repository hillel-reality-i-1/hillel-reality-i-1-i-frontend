export const formatTimeElapsed = (createdDate) => {
	const currentDate = new Date();
	const postDate = new Date(createdDate);
	const timeDifference = currentDate - postDate;

	const seconds = Math.floor(timeDifference / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (days >= 7) {
		return postDate.toLocaleDateString('uk-UK');
	} else if (days >= 1) {
		return `${days} днів тому`;
	} else if (hours >= 1) {
		return `${hours} годин  тому`;
	} else if (minutes >= 1) {
		return `${minutes} хв  тому`;
	} else {
		return 'менше хвилини тому';
	}
};
