import { ItemType } from 'antd/es/menu/hooks/useItems'
import { DefaultOptionType } from 'antd/es/select'

const convertToItemType = (value: string | number) =>
	({
		key: value,
		label: value,
	}) as ItemType

export const convertValuesToItemType = (values: (string | number)[]) =>
	values.map(convertToItemType)

export const convertToDefaultOption = (value: DefaultOptionType['value']) =>
	({
		label: value,
		value,
	}) as DefaultOptionType

export const convertValuesToDefaultOptions = (
	values: DefaultOptionType['value'][]
) => values.map(convertToDefaultOption)

export const convertNumberToPercentageString = (value: number) => `${value}%`
