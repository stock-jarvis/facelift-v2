import { useState, useEffect } from 'react'
import { theme, Typography, Segmented, SegmentedProps } from 'antd'
import { SegmentedValue } from 'antd/es/segmented'
interface ToggleProps<T> {
	label1: string
	label2: string
	toogle1: T
	toogle2: T
	value: T
	setToogleValue: (val: T) => void
}

const Toggle = <T,>({
	label1,
	label2,
	toogle1,
	toogle2,
	value,
	setToogleValue,
}: ToggleProps<T>) => {
	const { token } = theme.useToken()
	const [toogleValue, setValue] = useState<T>()

	useEffect(() => {
		if (!toogleValue) {
			setValue(value)
			setToogleValue(value)
		}
	}, [value, toogleValue, setToogleValue])

	const SegmentedItems = [
		{
			size: 'large',
			label: (
				<Typography.Text
					style={{
						fontSize: token.fontSizeHeading5,
						color: toogleValue === toogle1 ? token.colorPrimary : '#000',
					}}
				>
					{label1}
				</Typography.Text>
			),
			value: toogle1 as SegmentedValue,
		},

		{
			label: (
				<Typography.Text
					style={{
						fontSize: token.fontSizeHeading5,
						color: toogleValue === toogle2 ? token.colorPrimary : '#000',
					}}
				>
					{label2}
				</Typography.Text>
			),
			value: toogle2 as SegmentedValue,
		},
	]

	const handleSegmentsChanged: SegmentedProps['onChange'] = (
		tagVal: SegmentedValue
	) => {
		if (toogleValue !== tagVal.toLocaleString()) {
			setValue(tagVal as T)
			setToogleValue(tagVal as T)
		}
	}

	return (
		<Segmented
			size="large"
			onChange={handleSegmentsChanged}
			options={SegmentedItems}
			style={{
				backgroundColor: token.colorBgContainerDisabled,
			}}
			className="w-fit"
			value={toogleValue as SegmentedValue}
		/>
	)
}

export default Toggle
