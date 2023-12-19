import { Flex, Switch, Typography, theme } from 'antd'
import Toggle from '../modal-components/toggle'
import { useEffect, useState } from 'react'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

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
		if (toggleValue === 'Square off one Leg') {
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

	return (
		<Flex flex={1} justify="center" align="center" vertical className="gap-10">
			<div className="w-[80%] ">
				<Toggle
					toogle1="Square off one Leg"
					toogle2="Square of All Legs"
					setToogleValue={(value: string) => {
						setMove(false)
						setToggleValue(value)
					}}
				/>
			</div>
			{!trade ? (
				<Flex gap="middle">
					<Switch
						onChange={() => setMove(!move)}
						style={{
							borderColor: token.colorPrimary,
							boxShadow: '3px 3px 3px 3px rgba(0, 0, 0, 0.25)',
							fill: 'black',
							colorInterpolation: 'linearRGB',
						}}
						autoFocus={true}
						checkedChildren={<CheckOutlined />}
						unCheckedChildren={
							<CloseOutlined style={{ color: token.colorPrimary }} />
						}
					/>
					<Typography.Text
						style={{
							fontSize: token.fontSizeLG,
							fontWeight: token.fontWeightStrong,
						}}
					>
						Move Sl to cost
					</Typography.Text>
				</Flex>
			) : (
				<Flex gap="middle">
					<Flex gap="middle">
						<Switch
							value={repeatTrade}
							onChange={handleTradeChange}
							style={{
								borderColor: token.colorPrimary,
								boxShadow: '3px 3px 3px 3px rgba(0, 0, 0, 0.25)',
								fill: 'black',
								colorInterpolation: 'linearRGB',
							}}
							autoFocus={true}
							checkedChildren={<CheckOutlined />}
							unCheckedChildren={
								<CloseOutlined style={{ color: token.colorPrimary }} />
							}
						/>
						<Typography.Text
							style={{
								fontSize: token.fontSizeLG,
								fontWeight: token.fontWeightStrong,
							}}
						>
							Repeat Trade
						</Typography.Text>
					</Flex>
					<Flex gap="middle">
						<Switch
							value={repeatCondition}
							onChange={handleConditionChange}
							style={{
								borderColor: token.colorPrimary,
								boxShadow: '3px 3px 3px 3px rgba(0, 0, 0, 0.25)',
								fill: 'black',
								colorInterpolation: 'linearRGB',
							}}
							autoFocus={true}
							checkedChildren={<CheckOutlined />}
							unCheckedChildren={
								<CloseOutlined style={{ color: token.colorPrimary }} />
							}
						/>
						<Typography.Text
							style={{
								fontSize: token.fontSizeLG,
								fontWeight: token.fontWeightStrong,
							}}
						>
							Repeat Condition
						</Typography.Text>
					</Flex>
				</Flex>
			)}
		</Flex>
	)
}

export default TradeSecion
