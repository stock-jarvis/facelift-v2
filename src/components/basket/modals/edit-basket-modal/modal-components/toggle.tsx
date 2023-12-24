import { useState, useEffect } from 'react'
import { theme, Typography, Segmented, SegmentedProps } from 'antd'
import { SegmentedValue } from 'antd/es/segmented'
interface ToggleProps {
	label1: string
	label2: string
	toogle1: string
	toogle2: string
	setToogleValue: (val: string) => void
}

const Toggle: React.FC<ToggleProps> = ({
	label1,
	label2,
	toogle1,
	toogle2,
	setToogleValue,
}) => {
	const { token } = theme.useToken()
	const [toogleValue, setValue] = useState('')

	useEffect(() => {
		if (!toogleValue) {
			setValue(toogle1)
			setToogleValue(toogle1)
		}
	}, [toogle1, toogleValue, setToogleValue])

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
		/>
	)
}

export default Toggle
