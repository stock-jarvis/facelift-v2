import { Flex, Switch, Typography, theme } from 'antd'
import Toggle from '../modal-components/toggle'
import { useEffect, useState } from 'react'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
const TradeSecion = () => {
	const { token } = theme.useToken()
	const [toggleValue, setToggleValue] = useState('Square off one Leg')
	const [trade, setTrade] = useState(false)

	useEffect(() => {
		if (toggleValue === 'Square off one Leg') {
			setTrade(false)
		} else {
			setTrade(true)
		}
	}, [toggleValue])

	return (
		<Flex flex={1} justify="center" align="center" vertical className="gap-10">
			<div className="w-[80%] ">
				<Toggle
					toogle1="Square off one Leg"
					toogle2="Square of All Legs"
					setToogleValue={(value: string) => {
						setToggleValue(value)
					}}
				/>
			</div>
			{!trade ? (
				<Flex gap="middle">
					<Switch
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
