import { Flex, Typography, theme } from 'antd'
const Instrument = () => {
	const { token } = theme.useToken()

	return (
		<Flex
			style={{
				width: 'fit-content',

				borderRadius: token.borderRadiusLG,
				padding: token.paddingSM,
				boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.25) inset',
			}}
			vertical
			align="center"
		>
			<Typography.Text style={{ fontWeight: token.fontWeightStrong }}>
				Instrument
			</Typography.Text>

			<Flex align="center" className="h-full">
				<Typography.Text
					style={{ paddingTop: token.paddingSM, fontWeight: 'bold' }}
				>
					BANK NIFTY
				</Typography.Text>
			</Flex>
		</Flex>
	)
}

export default Instrument
