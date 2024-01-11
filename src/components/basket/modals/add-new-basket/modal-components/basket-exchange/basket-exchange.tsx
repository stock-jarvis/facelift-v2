import { Select, SelectProps } from 'antd'
import { exchangeType } from '../../../../constants/data'
import { Exchange } from 'src/common/enums'
export interface ExchangeSelectorProps {
	exchangeValue: Exchange
	handleTradeChange: (val: Exchange) => void
}

const TradeSelector: React.FC<ExchangeSelectorProps> = ({
	handleTradeChange,
	exchangeValue,
}) => {
	const handleTradeClick: SelectProps<Exchange>['onChange'] = (val) => {
		handleTradeChange(val)
	}

	const exchangeSelectorProps: SelectProps = {
		value: exchangeValue,
		options: exchangeType,
		onChange: handleTradeClick,
		style: { width: 'fit-content' },
	}

	return <Select {...exchangeSelectorProps} />
}

export default TradeSelector
