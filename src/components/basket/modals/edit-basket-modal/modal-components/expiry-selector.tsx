import { Select } from 'antd'

import { SelectProps } from 'antd'
import { DefaultOptionType } from 'antd/es/select'

interface ExpirySelectorProps<U> {
	expiryOptions: DefaultOptionType[]
	expiryValue: string
	handleExpiryChange: (val: string, type: U) => void
}
const ExpirySelector = <U,>({
	expiryOptions,
	expiryValue,

	handleExpiryChange,
}: ExpirySelectorProps<U>) => {
	const handleExpiryChanged: SelectProps['onChange'] = (val: string) => {
		handleExpiryChange(val, 'expiry' as U)
	}

	return (
		<Select
			value={expiryValue}
			onChange={handleExpiryChanged}
			style={{ width: '140px' }}
			size="large"
			options={expiryOptions}
		/>
	)
}

export default ExpirySelector
