import { Select, SelectProps } from 'antd'

import { Exchange } from 'src/common/enums'
import { useSimulatorParamsStore } from '../../store/simulator-params-store'
import { useMemo } from 'react'
import { convertValuesToDefaultOptions } from 'src/common/utils/conversion-utils'
import { DefaultOptionType } from 'antd/es/select'

type ExchangeSelectProps = SelectProps<Exchange, DefaultOptionType>

const ExchangeSelection = () => {
	const { exchange, setExchange } = useSimulatorParamsStore()

	const exchangeOptions = useMemo(
		() => convertValuesToDefaultOptions(Object.values(Exchange)),
		[]
	)

	const handleChangeExchange: ExchangeSelectProps['onChange'] = (
		selectedExchange
	) => setExchange(selectedExchange)

	return (
		<Select
			value={exchange}
			options={exchangeOptions}
			onChange={handleChangeExchange}
		/>
	)
}

export default ExchangeSelection
