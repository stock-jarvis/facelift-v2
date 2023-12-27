import {
	Flex,
	Switch,
	Typography,
	theme,
	Descriptions,
	DescriptionsProps,
} from 'antd'
import Toggle from '../modal-components/toggle'
import { useState } from 'react'
import { SavedBasketsObject } from 'src/components/basket/types/types'

interface TradeProps {
	basketData: SavedBasketsObject
	setBasketData: (val: SavedBasketsObject) => void
}
const TradeSecion: React.FC<TradeProps> = ({
	basketData,
	setBasketData,
}: TradeProps) => {
	const { token } = theme.useToken()
	const [repeatCondition, setRepeatCondition] = useState<boolean>(
		basketData.exitCondition.repeat === 'Condition'
	)
	const [repeatTrade, setRepeatTrade] = useState<boolean>(
		basketData.exitCondition.repeat === 'Trade'
	)
	const [tradeValue, setTradeValue] = useState<string>(
		basketData.exitCondition.type
	)

	const handleTradeChange = () => {
		if (repeatTrade) {
			setRepeatTrade(false)
			setBasketData({
				...basketData,
				exitCondition: {
					...basketData.exitCondition,
					repeat: 'NA',
				},
			})
		} else if (!repeatTrade && repeatCondition) {
			setRepeatCondition(false)
			setRepeatTrade(true)
			setBasketData({
				...basketData,
				exitCondition: {
					...basketData.exitCondition,
					repeat: 'Trade',
				},
			})
		} else if (!repeatTrade) {
			setRepeatTrade(true)
			setBasketData({
				...basketData,
				name: 'Apple',
				exitCondition: {
					...basketData.exitCondition,
					repeat: 'Trade',
				},
			})
		}
	}

	const handleTypeChange = (val: string) => {
		setTradeValue(val)
		setBasketData({
			...basketData,
			exitCondition: {
				...basketData.exitCondition,
				type: val,
			},
		})
	}

	const handleConditionChange = () => {
		if (repeatCondition) {
			setRepeatCondition(false)
			setBasketData({
				...basketData,
				exitCondition: {
					...basketData.exitCondition,
					repeat: 'NA',
				},
			})
		} else if (!repeatCondition && repeatTrade) {
			setRepeatTrade(false)
			setRepeatCondition(true)
			setBasketData({
				...basketData,
				exitCondition: {
					...basketData.exitCondition,
					repeat: 'Condition',
				},
			})
		} else if (!repeatCondition) {
			setRepeatCondition(true)
			setBasketData({
				...basketData,
				exitCondition: {
					...basketData.exitCondition,
					repeat: 'Condition',
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
						<Toggle
							label1="Exit legs individually"
							label2="Exit legs to all square"
							toogle1="SQOL"
							toogle2="SQAL"
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
