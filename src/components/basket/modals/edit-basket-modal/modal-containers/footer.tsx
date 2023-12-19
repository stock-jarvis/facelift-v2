import { Flex, Button, theme, Typography, Input, Space, Tooltip } from 'antd'

import { useBasketStore } from 'src/components/basket/store/basket-store'
import { BasketDataProps } from 'src/components/basket/types/types'
interface FooterPorps {
	atm: string
	basket: BasketDataProps[]
	posType: string
	basketTrade: string
	basketRepeat: string
	basketName: string | undefined
	identifier: number | undefined
}

const Footer = ({
	atm,
	basket,
	posType,
	basketName,
	identifier,
	basketTrade,
	basketRepeat,
}: FooterPorps) => {
	console.log(basketTrade, basketRepeat, atm, posType)
	const { token } = theme.useToken()
	const { timeError, toggleTimeErrorModalOpen, setEmptyBasketError } =
		useBasketStore()

	const handleSaveBasketClick = () => {
		if (basket.length > 0) {
			if (timeError) {
				toggleTimeErrorModalOpen(true)
			}
		} else {
			setEmptyBasketError(true)
		}
	}

	return (
		<Flex
			style={{
				padding: token.paddingSM,
				width: '100%',
				borderTop: '1px solid #F0F0F0',
			}}
			justify="center"
			align="center"
		>
			<Flex
				className="max-md:flex-col max-md:items-start max-md:gap-4 justify-between"
				align="center"
				justify="space-between"
				style={{
					width: '90%',
					boxShadow: '1px 2px 3px rgba(0, 0, 0, 0.25)',
					padding: token.paddingLG,
					borderRadius: token.borderRadiusLG,
					backgroundColor: '#F1F8FF',
				}}
			>
				<Space
					className="max-md:w-[100%]"
					style={{
						width: '150px',
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
						{basketName}
						{identifier ? (identifier > 0 ? ` - ${identifier}` : '') : ''}
					</Typography.Text>
				</Space>
				<Tooltip title="Click to save basket">
					<Button
						className="max-md:w-[100%]"
						style={{
							backgroundColor: token.colorPrimary,
							fontWeight: token.fontWeightStrong,
						}}
						type="primary"
						size="large"
						onClick={handleSaveBasketClick}
					>
						Save Basket
					</Button>
				</Tooltip>
			</Flex>
		</Flex>
	)
}

export default Footer
