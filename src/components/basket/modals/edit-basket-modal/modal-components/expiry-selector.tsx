import { Flex, Typography, theme, Select } from 'antd'
import { OptionObject } from 'src/components/basket/types/types'
import { SelectProps } from 'antd'
interface ExpirySelectorProps {
	handleExpiryChange: (val: string) => void
	expiryOptions: OptionObject[]
	expiryValue: string
}
const ExpirySelector = ({
	expiryOptions,
	expiryValue,
	handleExpiryChange,
}: ExpirySelectorProps) => {
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
