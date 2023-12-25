import {
	Flex,
	Switch,
	Typography,
	theme,
	Descriptions,
	DescriptionsProps,
} from 'antd'
import Toggle from '../modal-components/toggle'
import { useEffect, useState } from 'react'

interface TradeProps {
	toggleValue: string
	move: boolean
	setMove: (val: boolean) => void
	setRepeat: (val: string) => void
	setToggleValue: (val: string) => void
}
const TradeSecion = ({
	toggleValue,
	move,
	setRepeat,
	setMove,
	setToggleValue,
}: TradeProps) => {
	const { token } = theme.useToken()
	const [trade, setTrade] = useState<boolean>(false)
	const [repeatCondition, setRepeatCondition] = useState<boolean>(false)
	const [repeatTrade, setRepeatTrade] = useState<boolean>(false)

	useEffect(() => {
		if (toggleValue === 'SQOL') {
			setTrade(false)
		} else {
			setTrade(true)
		}
	}, [toggleValue])

	useEffect(() => {
		if (repeatTrade) {
			setRepeat('Trade')
		} else if (repeatCondition) {
			setRepeat('Condition')
		} else {
			setRepeat('NA')
		}
	}, [setRepeat, repeatCondition, repeatTrade])

	const handleTradeChange = () => {
		if (repeatTrade) {
			setRepeatTrade(false)
		} else if (!repeatTrade && repeatCondition) {
			setRepeatCondition(false)
			setRepeatTrade(true)
		} else if (!repeatTrade) {
			setRepeatTrade(true)
		}
	}

	const handleConditionChange = () => {
		if (repeatCondition) {
			setRepeatCondition(false)
		} else if (!repeatCondition && repeatTrade) {
			setRepeatTrade(false)
			setRepeatCondition(true)
		} else if (!repeatCondition) {
			setRepeatCondition(true)
		}
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
							setToogleValue={(value: string) => {
								setMove(false)
								setRepeat('NA')
								setRepeatTrade(false)
								setRepeatCondition(false)
								setToggleValue(value)
							}}
						/>
					</Flex>
					<Flex flex="1" justify="center">
						{!trade ? (
							<Flex gap="middle" align="center">
								<Switch size="small" onChange={() => setMove(!move)} />
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
