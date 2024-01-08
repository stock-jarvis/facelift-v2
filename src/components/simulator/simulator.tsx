import { Flex, theme, Layout, Typography } from 'antd'

import LeftContent from './components/left-content'
import RightContent from './components/right-content'
import ParamSelection from './components/param-selection'
import { useToggle } from 'src/common/utils/state-utils'
import { useGetInstrumentsMutation } from 'src/api/simulator/simulator'
import { useEffect } from 'react'

const { Sider } = Layout

const Simulator = () => {
	const { token } = theme.useToken()
	const [collapsed, toggleCollapsed] = useToggle(false)

	const { mutate } = useGetInstrumentsMutation()

	useEffect(() => {
		mutate(
			{ date: '16-03-2020' },
			{
				onSuccess(data) {
					console.log(data)
				},
			}
		)
	}, [])

	return (
		<Flex
			vertical
			className="w-full h-full"
			style={{
				padding: `${token.paddingContentVertical}px ${token.paddingContentHorizontalLG}px`,
			}}
			gap={token.margin}
		>
			<ParamSelection />

			<Layout className="h-full w-full">
				<Sider
					width="30vw"
					theme="light"
					collapsible
					collapsed={collapsed}
					collapsedWidth={token.size}
					onCollapse={toggleCollapsed}
				>
					{collapsed ? (
						<Flex
							className="h-full"
							vertical
							align="center"
							justify="center"
							onClick={toggleCollapsed}
						>
							<Typography.Title
								style={{
									transform: 'rotate(90deg)',
									width: 'max-content',
									color: token.colorTextPlaceholder,
									cursor: 'pointer',
								}}
								level={4}
							>
								Option Chain
							</Typography.Title>
						</Flex>
					) : (
						<LeftContent />
					)}
				</Sider>
				<Layout
					style={{
						backgroundColor: token.colorWhite,
					}}
				>
					<RightContent />
				</Layout>
			</Layout>
		</Flex>
	)
}

export default Simulator
