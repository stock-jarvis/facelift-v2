import { useMemo, useState } from 'react'
import { range, toInt } from 'radash'
import { Button, Flex, Select, SelectProps, Space, Tooltip, theme } from 'antd'

import {
	ForwardOutlined,
	BackwardOutlined,
	CaretRightOutlined,
} from '@ant-design/icons'
import { PiSun, PiSunHorizon } from 'react-icons/pi'

import { convertValuesToDefaultOptions } from 'src/common/utils/conversion-utils'

const timeUnits = ['Sec', 'Min', 'Hour', 'Day'] as const

type TimeUnit = (typeof timeUnits)[number]

const TimeMachine = () => {
	const { token } = theme.useToken()

	const [selectedValue, setSelectedValue] = useState(1)
	const [selectedTimeUnit, setSelectedTimeUnit] = useState<TimeUnit>('Sec')

	const valueOptions = useMemo(
		() => convertValuesToDefaultOptions([...range(1, 10)]),
		[]
	)

	const timeUnitOptions = useMemo(
		// @ts-expect-error timeUnits is TimeUnit[] type and the function expects array of string or number
		// TimeUnit[] is ultimately a string array.
		() => convertValuesToDefaultOptions(timeUnits),
		[]
	)

	const handleValueChange: SelectProps['onChange'] = (value) =>
		setSelectedValue(toInt(value)!)

	const handleTimeUnitChange: SelectProps['onChange'] = (value) =>
		setSelectedTimeUnit(value as TimeUnit)

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
					size="middle"
					style={{
						border: `0.5px solid ${token.colorBorder}`,
						borderRadius: token.borderRadius,
						padding: `${token.paddingXXS}px ${token.paddingContentHorizontalSM}px`,
					}}
				>
					<Select
						value={selectedValue}
						options={valueOptions}
						bordered={false}
						onChange={handleValueChange}
					/>

					<Select
						value={selectedTimeUnit}
						options={timeUnitOptions}
						bordered={false}
						onChange={handleTimeUnitChange}
					/>

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
