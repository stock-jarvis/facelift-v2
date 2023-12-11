import { DefaultOptionType } from 'antd/es/select'

const convertToDefaultOption = (value: DefaultOptionType['value']) =>
	({
		label: value,
		value,
	}) as DefaultOptionType

export const convertValuesToDefaultOptions = (
	values: DefaultOptionType['value'][]
) => values.map(convertToDefaultOption)
