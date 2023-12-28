import { Select } from 'antd'
import { OptionObject } from 'src/components/basket/types/types'
import { SelectProps } from 'antd'
interface ExpirySelectorProps {
	expiryOptions: OptionObject[]
	expiryValue: string | undefined
	handleExpiryChange: (val: string) => void
}
const ExpirySelector: React.FC<ExpirySelectorProps> = ({
	expiryOptions,
	expiryValue,
	handleExpiryChange,
}) => {
	const onHandleExpiryChange: SelectProps['onChange'] = (val: string) => {
		handleExpiryChange(val)
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
