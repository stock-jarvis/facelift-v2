import { useMemo, useState } from 'react'
import { Select, Modal, ModalProps, notification } from 'antd'
import { DefaultOptionType, SelectProps } from 'antd/es/select'
import { useQuery } from '@tanstack/react-query'
import { useSimulatorParamsStore } from '../../store/simulator-params-store'
import { convertValuesToDefaultOptions } from 'src/common/utils/conversion-utils'
import InstrumentService from 'src/api/instruments'
import dayjs from 'dayjs'
import useIsLoading from 'src/common/hooks/is-loading'

type InstrumentSelectionModalProps = Pick<ModalProps, 'open' | 'onCancel'>

const InstrumentSelectionModal: React.FC<InstrumentSelectionModalProps> = ({
	open,
	onCancel,
}) => {
	const { data, isLoading: fetchingInstrumentList } = useQuery({
		queryKey: ['instruments'],
		// TODO: we only have data till 2022, adding hard coded date for now
		queryFn: () => InstrumentService.getInstrument(new Date('11-03-2022')),
		staleTime: 1800 * 1000,
	})
	const {
		isLoading: validatingTradeDate,
		startLoading,
		stopLoading,
	} = useIsLoading()

	const { addSelectedInstrument, selectedInstruments, date } =
		useSimulatorParamsStore()

	const [selectedInstrument, setSelectedInstrument] = useState<string>()

	const instrumentOptions: DefaultOptionType[] = useMemo(
		() =>
			convertValuesToDefaultOptions(
				data?.InstrumentList.filter(
					(instrument) => !selectedInstruments.includes(instrument)
				) ?? []
			),
		[selectedInstruments, data?.InstrumentList]
	)

	const validateTradingDate = async (instrument: string) => {
		startLoading()
		const tradingDatesRes =
			await InstrumentService.getTradingDatesByInstrument(instrument)
		const tradingDates = tradingDatesRes?.dates ?? []

		const isValid = tradingDates.find((tradeDate) =>
			date.isSame(dayjs(tradeDate * 1000), 'day')
		)

		stopLoading()
		return !!isValid
	}

	const handleChange: SelectProps<string>['onChange'] = (value) =>
		setSelectedInstrument(value)

	const handleClickOk: ModalProps['onOk'] = async (event) => {
		const isSupportedDate = await validateTradingDate(selectedInstrument || '')

		if (!isSupportedDate) {
			notification.error({
				message: 'This instrument is not available for selected trading date.',
			})
		} else {
			if (selectedInstrument) {
				addSelectedInstrument(selectedInstrument)
			}
			onCancel?.(event)
		}
	}

	return (
		<Modal
			title="Select Instrument"
			open={open}
			onOk={handleClickOk}
			onCancel={onCancel}
			confirmLoading={validatingTradeDate}
			styles={{
				body: {
					padding: '16px',
				},
			}}
		>
			<Select
				loading={fetchingInstrumentList}
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
