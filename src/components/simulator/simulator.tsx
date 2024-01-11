import { Flex, theme, Layout, Typography } from 'antd'

import LeftContent from './components/left-content'
import RightContent from './components/right-content'
import ParamSelection from './components/param-selection'
import { useToggle } from 'src/common/utils/state-utils'
import { useGetInstrumentsListQuery } from 'src/api/simulator/simulator'
import { useGetAIOCQuery } from 'src/api/simulator/simulator'
import { useSimulatorParamsStore } from './store/simulator-params-store'
import { AIOCContext } from './context/aioc-context'
import { InstrumentsContext } from './context/instruments-context'

const { Sider } = Layout

const Simulator = () => {
	const { token } = theme.useToken()
	const [collapsed, toggleCollapsed] = useToggle(false)
	const { date, time, exchange, activeInstrument } = useSimulatorParamsStore()

	const getInstrumentsListResponse = useGetInstrumentsListQuery({
		variables: {
			date,
		},
	})

	const getAIOCResponse = useGetAIOCQuery({
		variables: {
			date,
			time,
			exchange,
			instrument: activeInstrument,
			// TODO: Wire up expiries
			expiries: ['180321', '250321', '010421'],
		},
	})

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

			<InstrumentsContext.Provider
				value={{
					isError: getInstrumentsListResponse.isError,
					isLoading: getInstrumentsListResponse.isLoading,
					instruments: getInstrumentsListResponse.data?.instrumentList ?? [],
				}}
			>
				<AIOCContext.Provider
					value={{
						isError: getAIOCResponse.isError,
						isLoading: getAIOCResponse.isLoading,
						futures: getAIOCResponse.data?.futures ?? {},
						expiryList: getAIOCResponse.data?.expiryList ?? [],
						optionChain: getAIOCResponse.data?.optionChain ?? {},
					}}
				>
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
				</AIOCContext.Provider>
			</InstrumentsContext.Provider>
		</Flex>
	)
}

export default Simulator
