export const parseStringToDate = (dateTimeString) => {
	const [datePart, timePart] = dateTimeString.split(' ')
	const [year, month, day] = datePart.split('-').map(Number)
	const [hours, minutes] = timePart.split(':').map(Number)
	const date = new Date(year, month - 1, day, hours, minutes)

	return date;
}

export const parseDateToString = (date) => {
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')
	const hours = String(date.getHours()).padStart(2, '0')
	const minutes = String(date.getMinutes()).padStart(2, '0')

	return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export const parseToBrFormat = (dateTimeString) => {
	const [datePart, timePart] = dateTimeString.split(' ')
	const [year, month, day] = datePart.split('-')
	const formattedDateTime = `${day}/${month}/${year} ${timePart}`

	return formattedDateTime;
}
