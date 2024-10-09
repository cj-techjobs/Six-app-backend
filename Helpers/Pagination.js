const paginate = (query, defaultLimit = 10) => {
	// Get the limit from query or default to 10
	const limit = parseInt(query.limit) || defaultLimit;

	// Get the page number from query or default to 1
	const page = parseInt(query.page) || 1;

	// Calculate skip based on page and limit
	const skip = (page - 1) * limit;

	return {
		limit,
		skip,
		currentPage: page,
	};
};

module.exports = paginate;
