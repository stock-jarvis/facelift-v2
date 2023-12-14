import { useMemo, useState } from 'react'
import { range, toInt } from 'radash'
import { Button, Dropdown, Flex, MenuProps, Space, Tooltip, theme } from 'antd'

import {
	DownOutlined,
	ForwardOutlined,
	BackwardOutlined,
	CaretRightOutlined,
} from '@ant-design/icons'
import { PiSun, PiSunHorizon } from 'react-icons/pi'

import { convertValuesToItemType } from 'src/common/utils/conversion-utils'

const timeUnits = ['Min', 'Hour', 'Day'] as const

type TimeUnit = (typeof timeUnits)[number]

const TimeMachine = () => {
	const { token } = theme.useToken()

	const [selectedValue, setSelectedValue] = useState(1)
	const [selectedTimeUnit, setSelectedTimeUnit] = useState<TimeUnit>('Min')

	const valueMenuItems = useMemo(
		() => convertValuesToItemType([...range(1, 10)]),
		[]
	)

	const timeUnitMenuItems = useMemo(
		// @ts-expect-error timeUnits is TimeUnit[] type and the function expects array of string or number
		// TimeUnit[] is ultimately a string array.
		() => convertValuesToItemType(timeUnits),
		[]
	)

	const handleValueMenuItemClick: MenuProps['onClick'] = ({ key }) =>
		setSelectedValue(toInt(key)!)

	const handleTimeUnitMenuItemClick: MenuProps['onClick'] = ({ key }) =>
		setSelectedTimeUnit(key as TimeUnit)

	return (
		<Flex
			justify="center"
			style={{
				padding: `${token.paddingContentVertical}px ${token.paddingContentHorizontalSM}px`,
			}}
		>
			<Space size="large">
				<Button
					type="text"
					shape="circle"
					icon={<BackwardOutlined style={{ fontSize: token.fontSizeXL }} />}
				/>

				<Button
					type="text"
					shape="circle"
					icon={<PiSun style={{ fontSize: token.fontSizeXL }} />}
				/>

				<Space
					size="large"
					style={{
						border: `0.5px solid ${token.colorBorder}`,
						borderRadius: token.borderRadius,
						padding: `${token.paddingXXS}px ${token.paddingContentHorizontalSM}px`,
					}}
				>
					<Dropdown
						menu={{ items: valueMenuItems, onClick: handleValueMenuItemClick }}
					>
						<Space>
							{selectedValue}{' '}
							<DownOutlined style={{ fontSize: token.fontSizeSM }} />
						</Space>
					</Dropdown>

					<Dropdown
						menu={{
							items: timeUnitMenuItems,
							onClick: handleTimeUnitMenuItemClick,
						}}
					>
						<Space>
							{selectedTimeUnit}{' '}
							<DownOutlined style={{ fontSize: token.fontSizeSM }} />
						</Space>
					</Dropdown>

					<Tooltip title="Move time">
						<Button
							shape="circle"
							icon={
								<CaretRightOutlined style={{ fontSize: token.fontSizeSM }} />
							}
							style={{
								width: token.controlHeightSM,
								height: token.controlHeightSM,
								display: 'flex',
								minWidth: token.controlHeightSM,
								alignItems: 'center',
								justifyContent: 'center',
							}}
						/>
					</Tooltip>
				</Space>

				<Button
					type="text"
					shape="circle"
					icon={<PiSunHorizon style={{ fontSize: token.fontSizeXL }} />}
				/>

				<Button
					type="text"
					shape="circle"
					icon={<ForwardOutlined style={{ fontSize: token.fontSizeXL }} />}
				/>
			</Space>
		</Flex>
	)
}

export default TimeMachine
