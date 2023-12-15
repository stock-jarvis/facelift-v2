import { Flex, Button, theme, Typography, Input, Space } from 'antd'

const Footer = () => {
	const { token } = theme.useToken()
	return (
		<Flex
			className="w-full border-t-[1px] p-[10px]"
			justify="center"
			align="center"
		>
			<Flex
				className="w-[90%] max-md:flex-col max-md:items-start max-md:gap-4 justify-between items-center"
				style={{
					boxShadow: '1px 2px 3px rgba(0, 0, 0, 0.25)',
					padding: token.paddingLG,
					borderRadius: token.borderRadiusLG,
					backgroundColor: '#F1F8FF',
				}}
			>
				<Space
					className="w-[150px] max-md:w-[100%]"
					style={{
						padding: `${token.paddingXXS}px ${token.paddingContentHorizontalSM}px`,
						border: '2px solid',
						borderRadius: token.borderRadiusLG,
						borderColor: token.colorBgTextHover,
					}}
				>
					<Input
						type="primary"
						placeholder="Spread"
						style={{
							backgroundColor: '#F1F8FF',
							fontSize: token.fontSizeHeading5,
							outline: 'none',
							border: 'none',
						}}
					/>
					%
				</Space>

				<Space
					className="max-md:w-full max-md:flex max-md:justify-center"
					style={{
						padding: `${token.paddingXXS}px ${token.paddingContentHorizontalSM}px`,
					}}
				>
					<Typography.Text
						style={{
							fontSize: token.fontSizeHeading4,
							fontWeight: token.fontWeightStrong,
						}}
					>
						Apple
					</Typography.Text>
				</Space>
				<Button
					className="max-md:w-[100%]"
					style={{ backgroundColor: token.colorPrimary }}
					type="primary"
					size="large"
				>
					Save Basket
				</Button>
			</Flex>
		</Flex>
	)
}

export default Footer
