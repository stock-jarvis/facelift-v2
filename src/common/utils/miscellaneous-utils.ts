export const generateId = () =>
	`${Date.now()}-${Math.ceil(Math.random() * 10000)}`
