export function convertJsonToBase64(jsonData: any): string {
	const jsonString = JSON.stringify(jsonData)
	const base64String = btoa(jsonString)
	return base64String
}
