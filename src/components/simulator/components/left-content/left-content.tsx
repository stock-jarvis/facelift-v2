import { Tabs, TabsProps, notification } from 'antd'
import { useSimulatorParamsStore } from '../../store/simulator-params-store'
import { useMemo } from 'react'
import TabContent from './tab-content'
import { useToggle } from 'src/common/utils/state-utils'
import InstrumentSelectionModal from './instrument-selection-modal'

import './styles/antd-styles-override.css'
import { MAX_INSTRUMENTS_ALLOWED } from 'src/common/constants'

type Tab = NonNullable<TabsProps['items']>[number]

const LeftContent = () => {
	const [notificationAPI, notificationContextHolder] =
		notification.useNotification()

	const {
		selectedInstruments,
		activeInstrument,
		setActiveInstrument,
		removeSelectedInstrument,
	} = useSimulatorParamsStore()

	const [isInstrumentSelectionModalOpen, toggleInstrumentSelectionModalOpen] =
		useToggle()

	const items = useMemo(
		() =>
			selectedInstruments.map(
				(instrument, index) =>
					({
						key: instrument,
						label: instrument,
						children: <TabContent instrument={instrument} />,
						/** First option is not closable */
						closable: index !== 0,
					}) as Tab
			),
		[selectedInstruments]
	)

	const handleAddTab = () => toggleInstrumentSelectionModalOpen()

	const handleRemoveTab = (targetKey: string) =>
		removeSelectedInstrument(targetKey)

	const handleEditTabs: TabsProps['onEdit'] = (targetKey, action) => {
		if (action === 'add') {
			if (selectedInstruments.length < MAX_INSTRUMENTS_ALLOWED) {
				handleAddTab()
			} else {
				notificationAPI.info({
					message: 'Cannot select more instruments',
					description: `Only ${MAX_INSTRUMENTS_ALLOWED} instruments are supported. Please remove an instrument to add more.`,
				})
			}
		} else if (action === 'remove') {
			handleRemoveTab(targetKey as string)
		}
	}

	return (
		<>
			{notificationContextHolder}

			<Tabs
				type="editable-card"
				items={items}
				activeKey={activeInstrument}
				onEdit={handleEditTabs}
				onChange={setActiveInstrument}
			/>

			{isInstrumentSelectionModalOpen && (
				<InstrumentSelectionModal
					open={isInstrumentSelectionModalOpen}
					onCancel={toggleInstrumentSelectionModalOpen}
				/>
			)}
		</>
	)
}

export default LeftContent
