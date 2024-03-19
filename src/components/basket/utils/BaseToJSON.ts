// src/components/basket/utils/BaseToJSON.ts
export function base64ToJSON(base64String: any) {
	const jsonString = atob(base64String)
	const jsonObject = JSON.parse(jsonString)
	return jsonObject
}
