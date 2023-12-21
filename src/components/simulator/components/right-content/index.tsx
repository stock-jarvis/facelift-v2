import { Flex, Menu, MenuProps } from 'antd'

import './styles/antd-styles-override.css'
import Positions from './positions'
import Greeks from './greeks'
import { useEffect, useMemo, useState } from 'react'
import { useSimulatorParamsStore } from '../../store/simulator-params-store'
import { convertValuesToItemType } from 'src/common/utils/conversion-utils'

enum MenuItem {
	Positions = 'Positions',
	Greeks = 'Greeks',
	'Payoff Charts' = 'Payoff Charts',
	Charts = 'Charts',
}

type MenuContentProps = {
	selectedItemKey: MenuItem
}

const MenuContent: React.FC<MenuContentProps> = ({ selectedItemKey }) => {
	switch (selectedItemKey) {
		case MenuItem.Positions:
			return <Positions />
		case MenuItem.Greeks:
			return <Greeks />
		case MenuItem['Payoff Charts']:
			return <div>Payoff charts under construction</div>
		case MenuItem.Charts:
			return <div>Charts under construction</div>
		default:
			return <div>You are not supposed to be here.</div>
	}
}

const RightContent = () => {
	const { selectedInstruments, setActiveInstrument } = useSimulatorParamsStore()

	const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem>(
		MenuItem.Positions
	)

	const [tabInstrument, setTabInstrument] = useState<string>()

	const items: MenuProps['items'] = useMemo(
		() =>
			[
				{
					key: MenuItem.Positions,
					label: MenuItem.Positions,
				},
				{
					key: MenuItem.Greeks,
					label: MenuItem.Greeks,
					children: convertValuesToItemType(selectedInstruments),
				},
				{
					key: MenuItem['Payoff Charts'],
					label: MenuItem['Payoff Charts'],
					children: convertValuesToItemType(selectedInstruments),
				},
				{
					key: MenuItem.Charts,
					label: MenuItem.Charts,
					children: convertValuesToItemType(selectedInstruments),
				},
			].map((item) => {
				if (tabInstrument && item.key === selectedMenuItem) {
					// @ts-expect-error item label needs to be modified
					item.label = `${item.label} - ${tabInstrument}`
				}
				return item
			}),
		[selectedInstruments, tabInstrument, selectedMenuItem]
	)

	const handleOnClick: MenuProps['onClick'] = (event) => {
		/** Reset tab instrument */
		setTabInstrument(undefined)

		const selectedKeyPath = event.keyPath

		/** Handles logic to select instrument from Tab dropdown */
		if (selectedKeyPath.length > 1) {
			const tabInstrument = selectedKeyPath[0] as string
			const selectedItemKey = selectedKeyPath[1] as MenuItem

			setTabInstrument(tabInstrument)
			setSelectedMenuItem(selectedItemKey as MenuItem)
		} else {
			setSelectedMenuItem(selectedKeyPath[0] as MenuItem)
		}
	}

	useEffect(() => {
		/**
		 * Select the first instrument when selected tab instrument is removed from the selected instruments
		 */
		if (tabInstrument && !selectedInstruments.includes(tabInstrument ?? '')) {
			setTabInstrument(selectedInstruments[0])
		}
		/** tabInstrument dependency is not needed */
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedInstruments])

	/**
	 * Change the active instrument in the simulator when instrument in a tab is changed.
	 */
	useEffect(() => {
		if (tabInstrument) {
			setActiveInstrument(tabInstrument)
		}
	}, [setActiveInstrument, tabInstrument])

	return (
		<Flex className="w-full h-full" vertical>
			<Menu
				items={items}
				mode="horizontal"
				triggerSubMenuAction="click"
				selectedKeys={[selectedMenuItem as string]}
				onClick={handleOnClick}
			/>
			<Flex className="w-full h-full">
				<MenuContent selectedItemKey={selectedMenuItem} />
			</Flex>
		</Flex>
	)
}

export default RightContent
