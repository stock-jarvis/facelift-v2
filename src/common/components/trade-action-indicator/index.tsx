import { Typography } from 'antd'
import { TradeAction } from 'src/common/enums'

type TradeActionIndicatorProps = {
	tradeAction: TradeAction
}

const TradeActionIndicator: React.FC<TradeActionIndicatorProps> = ({
	tradeAction,
}) => (
	<Typography.Text
		type={tradeAction === TradeAction.Buy ? 'success' : 'warning'}
	>
		{tradeAction}
	</Typography.Text>
)

export default TradeActionIndicator
