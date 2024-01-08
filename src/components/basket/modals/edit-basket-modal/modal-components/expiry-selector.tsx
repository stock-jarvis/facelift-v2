import { Select } from 'antd'
import { OptionObject } from 'src/components/basket/types/types'
import { SelectProps } from 'antd'

interface ExpirySelectorProps<U> {
	expiryOptions: OptionObject[]
	expiryValue: string | undefined
	keyType: U
	handleExpiryChange: (val: string, type: U) => void
}
const ExpirySelector = <U,>({
	expiryOptions,
	expiryValue,
	keyType,
	handleExpiryChange,
}: ExpirySelectorProps<U>) => {
	const onHandleExpiryChange: SelectProps['onChange'] = (val: string) => {
		handleExpiryChange(val, keyType)
	}

	return (
		<Select
			value={expiryValue}
			onChange={onHandleExpiryChange}
			style={{ width: '140px' }}
			size="large"
			options={expiryOptions}
		/>
	)
}

export default ExpirySelector
