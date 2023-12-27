import { useState, useEffect } from 'react'
import { theme, Typography, Segmented, SegmentedProps } from 'antd'
import { SegmentedValue } from 'antd/es/segmented'
interface ToggleProps {
	label1: string
	label2: string
	toogle1: string
	toogle2: string
	value: string
	setToogleValue: (val: string) => void
}

const Toggle: React.FC<ToggleProps> = ({
	label1,
	label2,
	toogle1,
	toogle2,
	value,
	setToogleValue,
}) => {
	const { token } = theme.useToken()
	const [toogleValue, setValue] = useState('')

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
			value: toogle1,
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
			value: toogle2,
		},
	]

	const handleSegmentsChanged: SegmentedProps['onChange'] = (
		tagVal: SegmentedValue
	) => {
		//console.log(tagVal)
		if (toogleValue !== tagVal.toLocaleString()) {
			setValue(tagVal.toLocaleString())
			setToogleValue(tagVal.toLocaleString())
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
			value={toogleValue}
		/>
	)
}

export default Toggle
