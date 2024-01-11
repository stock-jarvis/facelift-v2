import { Tabs, TabsProps, theme, Divider, Flex, Typography } from 'antd'
import SpotBasketSelector from './spot-basket-selector'
import FutureBasketSelector from './future-basket-selector'
import OptionsBasketSelector from './options-basket-selector'
import { SavedPosition } from 'src/components/basket/types/types'
import { useState } from 'react'
import { BasketLegType } from 'src/common/enums'

interface SelectProps {
	instrument: string
	basketInitialData: SavedPosition

	setOptionValue: () => void
	handleAddBasket: (val: BasketLegType) => void
	updatedBasketData: (val: SavedPosition) => void
}

const Selectors: React.FC<SelectProps> = ({
	instrument,
	basketInitialData,
	setOptionValue,
	handleAddBasket,
	updatedBasketData,
}) => {
	const { token } = theme.useToken()
	const [tabValue, setTabValue] = useState<string>('spot')

	const handleTabChange: TabsProps['onChange'] = (e: string) => {
		setOptionValue()
		setTabValue(e)
	}

	const legTabs: TabsProps = {
		type: 'card',
		tabBarGutter: 15,
		className: 'w-full',
		activeKey: tabValue,
		onChange: handleTabChange,
		destroyInactiveTabPane: true,
		tabBarStyle: { width: '400px' },
		style: {
			padding: token.paddingXS,
			borderRadius: token.borderRadiusLG,
		},
	}

	return (
		<Flex flex={1} vertical gap="middle">
			<Divider>
				<Typography.Text
					style={{ fontSize: token.fontSizeLG, color: token.colorPrimary }}
				>
					Legs
				</Typography.Text>
			</Divider>
			<Tabs
				{...legTabs}
				items={[
					{
						label: 'Spot',
						key: 'spot',
						children: (
							<SpotBasketSelector
								basketInitialData={basketInitialData}
								baseInstrumentValue={instrument}
								updatedBasketData={updatedBasketData}
								handleAddBasket={handleAddBasket}
							/>
						),
					},
					{
						label: 'Future',
						key: 'future',
						children: (
							<FutureBasketSelector
								basketInitialData={basketInitialData}
								baseInstrumentValue={instrument}
								updatedBasketData={updatedBasketData}
								handleAddBasket={handleAddBasket}
							/>
						),
					},
					{
						label: 'Options',
						key: 'options',
						children: (
							<OptionsBasketSelector
								basketInitialData={basketInitialData}
								baseInstrumentValue={instrument}
								updatedBasketData={updatedBasketData}
								handleAddBasket={handleAddBasket}
							/>
						),
					},
				]}
			/>
		</Flex>
	)
}
export default Selectors
