import { useState, useEffect } from 'react'
import { Space, Flex, theme, Typography } from 'antd'
interface ToggleProps {
	toogle1: string
	toogle2: string
	setToogleValue: (val: string) => void
}
const Toggle = ({ toogle1, toogle2, setToogleValue }: ToggleProps) => {
	const { token } = theme.useToken()
	const [toogleValue, setValue] = useState('')

	useEffect(() => {
		if (!toogleValue) {
			setValue(toogle1)
			setToogleValue(toogle1)
		}
	}, [toogle1, toogleValue, setToogleValue])

	const onToogleChange = (value: string) => {
		if (toogleValue !== value) {
			setValue(value)
			setToogleValue(value)
		}
	}

	return (
		<Flex
			flex="1"
			justify="center"
			style={{
				background: token.colorBgBase,
				boxShadow: '1px 2px 3px rgba(0, 0, 0, 0.25)',
				borderRadius: token.borderRadiusLG,
				cursor: 'pointer',
			}}
			gap="middle"
		>
			<Flex
				onClick={() => onToogleChange(toogle1)}
				flex={1}
				justify="center"
				style={{
					backgroundColor:
						toogleValue === toogle1 ? token.colorPrimary : token.colorBgBase,
					padding: token.paddingXS,

					borderRadius: token.borderRadiusLG,
				}}
			>
				<Space>
					<Typography.Text
						style={{
							color: toogleValue === toogle1 ? 'white' : 'black',
							fontSize: token.fontSizeHeading5,
							fontWeight: token.fontWeightStrong,
						}}
					>
						{toogle1}
					</Typography.Text>
				</Space>
			</Flex>
			<Flex
				onClick={() => onToogleChange(toogle2)}
				flex={1}
				justify="center"
				style={{
					backgroundColor:
						toogleValue === toogle2 ? token.colorPrimary : token.colorBgBase,
					padding: token.paddingXS,

					borderRadius: token.borderRadiusLG,
				}}
			>
				<Space>
					<Typography.Text
						style={{
							color: toogleValue === toogle2 ? 'white' : 'black',
							fontSize: token.fontSizeHeading5,
							fontWeight: token.fontWeightStrong,
						}}
					>
						{toogle2}
					</Typography.Text>
				</Space>
			</Flex>
		</Flex>
	)
}

export default Toggle
