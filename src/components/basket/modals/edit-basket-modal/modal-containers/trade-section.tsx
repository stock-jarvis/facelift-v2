import {
	Flex,
	Switch,
	Typography,
	theme,
	Descriptions,
	DescriptionsProps,
} from 'antd'
import Toggle from '../modal-components/toggle'
import { useMemo, useState } from 'react'
import { SavedBasket, RepeatType } from 'src/components/basket/types/types'
import { BasketExitType } from 'src/common/enums'

interface TradeProps {
	basketData: SavedBasket
	setBasketData: (val: SavedBasket) => void
}
const TradeSecion: React.FC<TradeProps> = ({
	basketData,
	setBasketData,
}: TradeProps) => {
	const { token } = theme.useToken()
	const [tradeValue, setTradeValue] = useState<BasketExitType>(
		basketData.exitCondition.type
	)

	const repeatCondition = useMemo(
		() => basketData.exitCondition.repeat === RepeatType.CONDITION,
		[basketData]
	)
	const repeatTrade = useMemo(
		() => basketData.exitCondition.repeat === RepeatType.TRADE,
		[basketData]
	)

	const handleTradeChange = () => {
		if (repeatTrade) {
			setBasketData({
				...basketData,
				exitCondition: {
					...basketData.exitCondition,
					repeat: RepeatType.NA,
				},
			})
		} else if (!repeatTrade && repeatCondition) {
			setBasketData({
				...basketData,
				exitCondition: {
					...basketData.exitCondition,
					repeat: RepeatType.TRADE,
				},
			})
		} else if (!repeatTrade) {
			setBasketData({
				...basketData,
				exitCondition: {
					...basketData.exitCondition,
					repeat: RepeatType.TRADE,
				},
			})
		}
	}

	const handleTypeChange = (val: BasketExitType) => {
		setTradeValue(val)
		setBasketData({
			...basketData,
			exitCondition: {
				...basketData.exitCondition,
				type: val,
				move: false,
				repeat: RepeatType.NA,
			},
		})
	}

	const handleConditionChange = () => {
		if (repeatCondition) {
			setBasketData({
				...basketData,
				exitCondition: {
					...basketData.exitCondition,
					repeat: RepeatType.TRADE,
				},
			})
		} else if (!repeatCondition && repeatTrade) {
			setBasketData({
				...basketData,
				exitCondition: {
					...basketData.exitCondition,
					repeat: RepeatType.CONDITION,
				},
			})
		} else if (!repeatCondition) {
			setBasketData({
				...basketData,
				exitCondition: {
					...basketData.exitCondition,
					repeat: RepeatType.CONDITION,
				},
			})
		}
	}

	const handleMoveChange = () => {
		setBasketData({
			...basketData,
			exitCondition: {
				...basketData.exitCondition,
				move: !basketData.exitCondition.move,
			},
		})
	}

	const toogleItems: DescriptionsProps['items'] = [
		{
			label: (
				<Flex flex="1" justify="center">
					<Typography.Text
						style={{
							fontSize: token.fontSizeLG,
							fontWeight: token.fontWeightStrong,
						}}
					>
						Trade
					</Typography.Text>
				</Flex>
			),
			key: 'trade',
			children: (
				<Flex vertical gap="large">
					<Flex flex="1" justify="center">
						<Toggle<BasketExitType>
							label1="Exit legs individually"
							label2="Exit legs to all square"
							toogle1={BasketExitType.SQOL}
							toogle2={BasketExitType.SQAL}
							value={basketData.exitCondition.type}
							setToogleValue={handleTypeChange}
						/>
					</Flex>
					<Flex flex="1" justify="center">
						{tradeValue === 'SQOL' ? (
							<Flex gap="middle" align="center">
								<Switch
									size="small"
									onChange={handleMoveChange}
									value={basketData.exitCondition.move}
								/>
								<Typography.Text
									style={{
										fontSize: token.fontSizeLG,
									}}
								>
									Move Sl to cost
								</Typography.Text>
							</Flex>
						) : (
							<Flex gap="middle">
								<Flex gap="middle" align="center">
									<Switch
										size="small"
										value={repeatTrade}
										onChange={handleTradeChange}
									/>
									<Typography.Text
										style={{
											fontSize: token.fontSizeLG,
										}}
									>
										Repeat Trade
									</Typography.Text>
								</Flex>
								<Flex gap="middle" align="center">
									<Switch
										size="small"
										value={repeatCondition}
										onChange={handleConditionChange}
									/>
									<Typography.Text
										style={{
											fontSize: token.fontSizeLG,
										}}
									>
										Repeat Condition
									</Typography.Text>
								</Flex>
							</Flex>
						)}
					</Flex>
				</Flex>
			),
		},
	]
	return (
		<Flex flex={1} justify="center" vertical gap="large">
			<Descriptions
				layout="vertical"
				items={toogleItems}
				bordered
				className="w-full"
			/>
		</Flex>
	)
}

export default TradeSecion
