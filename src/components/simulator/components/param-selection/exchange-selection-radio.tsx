// TODO: Remove if dropdown is used for exchange selection

import { Radio, RadioGroupProps } from 'antd'

import { Exchange } from 'src/common/enums'
import { useSimulatorParamsStore } from '../../store/simulator-params-store'

const ExchangeSelection = () => {
	const { exchange, setExchange } = useSimulatorParamsStore()

	const handleChangeExchange: RadioGroupProps['onChange'] = (event) =>
		setExchange(event.target.value)

	return (
		<Radio.Group
			value={exchange}
			buttonStyle="solid"
			onChange={handleChangeExchange}
		>
			{Object.values(Exchange).map((exchange) => (
				<Radio.Button key={exchange} value={exchange}>
					{exchange.toUpperCase()}
				</Radio.Button>
			))}
		</Radio.Group>
	)
}

export default ExchangeSelection
