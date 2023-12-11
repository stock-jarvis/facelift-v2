import { useEffect, useMemo, useState } from 'react'
import { Select, Modal, ModalProps, Tag } from 'antd'
import { DefaultOptionType, SelectProps } from 'antd/es/select'

import { useSimulatorParamsStore } from '../store/simulator-params-store'
import { convertValuesToDefaultOptions } from 'src/common/utils/conversion-utils'

type InstrumentSelectionModalProps = Pick<ModalProps, 'open' | 'onCancel'>

const InstrumentSelectionModal: React.FC<InstrumentSelectionModalProps> = ({
	open,
	onCancel,
}) => {
	const { selectedInstruments, setSelectedInstruments } =
		useSimulatorParamsStore()

	/** Holds the instrument selection until clicked OK */
	const [selectedInstrumentOptions, setSelectedInstrumentOptions] = useState<
		string[]
	>([])

	// TODO: Wire it up with API
	const instrumentOptions: DefaultOptionType[] = useMemo(
		() =>
			convertValuesToDefaultOptions(['ITC', 'Jindal Steel', 'Asian Paints']),
		[]
	)

	/** Only changes the local state */
	const handleChange: SelectProps['onChange'] = (values: string[]) => {
		setSelectedInstrumentOptions(values)
	}

	/** Sets the selected instruments in the global store */
	const handleClickOk = () => setSelectedInstruments(selectedInstrumentOptions)

	/** Set the previously selected options in the dropdown */
	useEffect(() => {
		setSelectedInstrumentOptions(selectedInstruments)
	}, [selectedInstruments])

	return (
		<Modal
			title="Select Instruments"
			width="40vw"
			open={open}
			onOk={handleClickOk}
			onCancel={onCancel}
			styles={{
				body: {
					padding: '16px',
				},
			}}
		>
			<Select
				mode="multiple"
				value={selectedInstrumentOptions}
				options={instrumentOptions}
				placeholder="Select instruments"
				onChange={handleChange}
				style={{
					width: '100%',
				}}
				tagRender={(props) => <Tag>{props.value}</Tag>}
			/>
		</Modal>
	)
}

export default InstrumentSelectionModal
