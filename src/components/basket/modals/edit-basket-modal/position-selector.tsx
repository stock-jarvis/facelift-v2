import { Flex, Radio, theme } from 'antd'
import { useState, useEffect } from 'react'
import { OptionObject } from '../../types/types'
interface OptionsProps {
	onOptionChange: (value: OptionObject) => void
	options: OptionObject[]
}

const PositionSelector = ({ onOptionChange, options }: OptionsProps) => {
	const { token } = theme.useToken()
	const [option, setOption] = useState<OptionObject>({
		id: -1,
		value: '',
		label: '',
	})
	const RadioStyles = {
		fontSize: token.fontSizeLG,
		fontWeight: token.fontWeightStrong,
	}
	useEffect(() => {
		if (option.id === -1) {
			setOption(options[0])
		}
	}, [setOption, option, options])
	const radioOptionChanged = (value: OptionObject) => {
		setOption(value)
		onOptionChange(value)
	}

	return (
		<Flex
			flex={1}
			style={{
				width: '100%',
				background: token.colorBgBase,
				boxShadow: '1px 2px 3px rgba(0, 0, 0, 0.25)',
				borderRadius: token.borderRadiusLG,
			}}
		>
			<Radio.Group
				value={option.value}
				className="flex flex-1 justify-around"
				style={{ padding: token.paddingSM }}
			>
				{options &&
					options.length &&
					options.map((option) => (
						<Radio
							key={option.id}
							value={option.value}
							style={RadioStyles}
							onChange={() => radioOptionChanged(option)}
						>
							{option.label}
						</Radio>
					))}
			</Radio.Group>
		</Flex>
	)
}

export default PositionSelector
