export type API_Option = {
	strikePrice: number

	ceLTP: number
	ceLTQ: number
	ceOI: number
	ceLTT?: string

	peLTP: number
	peLTQ: number
	peOI: number
	peLTT?: string
}

export type API_OptionsByExpiry = Record<string, API_Option[]>

export type OptionsApiReponse = {
	data: API_OptionsByExpiry[]
}
