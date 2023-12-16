import { useMemo, useState } from 'react'
import { Select, Modal, ModalProps } from 'antd'
import { DefaultOptionType, SelectProps } from 'antd/es/select'

import { useSimulatorParamsStore } from '../../store/simulator-params-store'
import { convertValuesToDefaultOptions } from 'src/common/utils/conversion-utils'

type InstrumentSelectionModalProps = Pick<ModalProps, 'open' | 'onCancel'>

const InstrumentSelectionModal: React.FC<InstrumentSelectionModalProps> = ({
	open,
	onCancel,
}) => {
	const { addSelectedInstrument, selectedInstruments } =
		useSimulatorParamsStore()

	const [selectedInstrument, setSelectedInstrument] = useState<string>()

	// TODO: Wire it up with API
	const instrumentOptions: DefaultOptionType[] = useMemo(
		() =>
			convertValuesToDefaultOptions(
				['ITC', 'Jindal Steel', 'Asian Paints'].filter(
					(instrument) => !selectedInstruments.includes(instrument)
				)
			),
		[selectedInstruments]
	)

	const handleChange: SelectProps<string>['onChange'] = (value) =>
		setSelectedInstrument(value)

	const handleClickOk: ModalProps['onOk'] = (event) => {
		if (selectedInstrument) {
			addSelectedInstrument(selectedInstrument)
		}
		onCancel?.(event)
	}

	return (
		<Modal
			title="Select Instrument"
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
				value={selectedInstrument}
				options={instrumentOptions}
				placeholder="Select instrument"
				onChange={handleChange}
				style={{
					width: '100%',
				}}
			/>
		</Modal>
	)
}

export default InstrumentSelectionModal
