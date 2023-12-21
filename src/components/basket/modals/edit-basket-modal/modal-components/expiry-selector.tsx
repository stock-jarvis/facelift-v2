import { Flex, Typography, theme, Select } from 'antd'
import { OptionObject } from 'src/components/basket/types/types'
import { SelectProps } from 'antd'
interface ExpirySelectorProps {
	expiryOptions: OptionObject[]
	expiryValue: string
	handleExpiryChange: (val: string) => void
}
const ExpirySelector: React.FC<ExpirySelectorProps> = ({
	expiryOptions,
	expiryValue,
	handleExpiryChange,
}) => {
	const { token } = theme.useToken()

	const onHandleExpiryChange: SelectProps['onChange'] = (val: string) => {
		handleExpiryChange(val)
	}

	return (
		<Flex
			style={{
				width: 'fit-content',
				borderRadius: token.borderRadiusLG,
				padding: token.paddingSM,
			}}
			vertical
			justify="center"
			align="center"
		>
			<Typography.Text style={{ fontWeight: token.fontWeightStrong }}>
				Expiry
			</Typography.Text>
			<Flex gap={'middle'} align="center">
				<Select
					value={expiryValue}
					onChange={onHandleExpiryChange}
					style={{ width: '200px' }}
					size="large"
					options={expiryOptions}
				/>
			</Flex>
		</Flex>
	)
}

export default ExpirySelector
