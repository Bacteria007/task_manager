export const formatDate = (createdAt) => {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);

    // Calculate the difference in milliseconds between the current date and the created date
    const difference = currentDate.getTime() - createdDate.getTime();

    // Calculate the difference in days, months, and years
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
        return years === 1 ? "1 year ago" : `${years} years ago`;
    } else if (months > 0) {
        return months === 1 ? "1 month ago" : `${months} months ago`;
    } else if (days > 0) {
        return days === 1 ? "1 day ago" : `${days} days ago`;
    } else {
        // Format the date as "dd-mm-yyyy"
        const options = {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        };
        return createdDate.toLocaleDateString('en-US', options);
    }
};
