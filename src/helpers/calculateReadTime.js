// function for determining reading time
export const calculateReadTime = (content) => {
	const averageWordsPerMinute = 200;
	const wordCount = content.split(/\s+/).length;
	const readTimeMinutes = Math.ceil(wordCount / averageWordsPerMinute);

	return readTimeMinutes;
};
