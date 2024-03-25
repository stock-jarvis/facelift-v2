import { Button, Typography } from 'antd'
import { OptionContractType, TradeAction } from 'src/common/enums'
import { renderPriceWithLastTradedTime } from 'src/common/utils/render-utils'
import { DerivativesTableDataSource } from './derivatives-table'

type addPositionCallback = (
	tradeAction: TradeAction,
	contractType: OptionContractType
) => void

const renderCellWithBuySellOpt = (
	value: number,
	lastTraded: number,
	addPosition: (tradeAction: TradeAction) => void
) => (
	<div className="group">
		<div className="hidden group-hover:block absolute bg-[rgba(0,0,0,0.05)] inset-0">
			<div className="flex items-center h-full gap-1 pl-2">
				<Button
					size="small"
					type="primary"
					icon={'B'}
					onClick={() => addPosition(TradeAction.Buy)}
				/>
				<Button
					size="small"
					type="primary"
					danger
					icon={'S'}
					onClick={() => addPosition(TradeAction.Sell)}
				/>
			</div>
		</div>
		<Typography.Text>
			{value} {renderPriceWithLastTradedTime(lastTraded)}
		</Typography.Text>
	</div>
)

export const renderPutCell = (
	data: DerivativesTableDataSource,
	addPosition: addPositionCallback
) =>
	renderCellWithBuySellOpt(data.put_ltp, data.put_llt, (tradeAction) =>
		addPosition(tradeAction, OptionContractType.PE)
	)

export const renderCallCell = (
	data: DerivativesTableDataSource,
	addPosition: addPositionCallback
) =>
	renderCellWithBuySellOpt(data.put_ltp, data.put_llt, (tradeAction) =>
		addPosition(tradeAction, OptionContractType.CE)
	)
