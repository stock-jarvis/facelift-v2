import { useMemo, useState } from 'react'
import { Select, Modal, ModalProps } from 'antd'
import { DefaultOptionType, SelectProps } from 'antd/es/select'

import { useSimulatorParamsStore } from '../../store/simulator-params-store'
import { convertValuesToDefaultOptions } from 'src/common/utils/conversion-utils'
import { useGetInstrumentsListQuery } from 'src/api/simulator/simulator'

type InstrumentSelectionModalProps = Pick<ModalProps, 'open' | 'onCancel'>

const InstrumentSelectionModal: React.FC<InstrumentSelectionModalProps> = ({
	open,
	onCancel,
}) => {
	const {
		date,
		selectedInstruments,
		setActiveInstrument,
		addSelectedInstrument,
	} = useSimulatorParamsStore()

	const { data } = useGetInstrumentsListQuery({
		variables: {
			date: date,
		},
	})

	console.log(data?.instrumentList)

	const [selectedInstrument, setSelectedInstrument] = useState<string>()

	const instrumentOptions: DefaultOptionType[] = useMemo(
		() =>
			convertValuesToDefaultOptions(
				(data?.instrumentList ?? []).filter(
					(instrument) => !selectedInstruments.includes(instrument)
				)
			),
		[data, selectedInstruments]
	)

	const handleChange: SelectProps<string>['onChange'] = (value) =>
		setSelectedInstrument(value)

	const handleClickOk: ModalProps['onOk'] = (event) => {
		if (selectedInstrument) {
			addSelectedInstrument(selectedInstrument)
			setActiveInstrument(selectedInstrument)
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
