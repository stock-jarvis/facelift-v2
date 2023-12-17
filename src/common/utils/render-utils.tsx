import TradeActionIndicator from '../components/trade-action-indicator'
import { TradeAction } from '../enums'

export const renderTradeAction = (tradeAction: TradeAction) => (
	<TradeActionIndicator tradeAction={tradeAction} />
)
