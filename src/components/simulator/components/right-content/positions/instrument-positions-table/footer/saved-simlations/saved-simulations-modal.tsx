import {
	Flex,
	Modal,
	ModalProps,
	Statistic,
	Table,
	TableProps as AntdTableProps,
	theme,
} from 'antd'
import { TextProps } from 'antd/es/typography/Text'
import { Dayjs } from 'dayjs'
import { useMemo } from 'react'
import { TradeAction } from 'src/common/enums'
import {
	renderDayjsDate,
	renderDayjsTime,
	renderTradeAction,
} from 'src/common/utils/render-utils'

const statistics: Array<{
	key: string
	title: string
	type?: TextProps['type']
	// TODO: Remove after demo
	value: number
}> = [
	{
		key: 'totalTrades',
		title: 'Total Trades',
		value: 100,
	},
	{
		key: 'overallProfit',
		title: 'Overall Profit',
		type: 'success',
		value: 20000,
	},
	{
		key: 'averageDayProfit',
		title: 'Average Day Profit',
		type: 'warning',
		value: 89,
	},
	{
		key: 'maxProfit',
		title: 'Max Profit',
		type: 'success',
		value: 250,
	},
	{
		key: 'maxLoss',
		title: 'Max Loss',
		type: 'warning',
		value: 20,
	},
	{
		key: 'winPercent',
		title: 'Win % (Trades)',
		type: 'success',
		value: 60,
	},
	{
		key: 'lossPercent',
		title: 'Loss % (Trades)',
		type: 'danger',
		value: 40,
	},
	{
		key: 'avgMonthlyProfit',
		title: 'Avg Monthly Profit',
		type: 'success',
		value: 3000,
	},
	{
		key: 'avgProfitInWinTrades',
		title: 'Avg Profit in Win Trades',
		type: 'success',
		value: 200,
	},
	{
		key: 'avgLossInLossTrades',
		title: 'Avg Loss in Loss Trades',
		type: 'danger',
		value: 30,
	},
	{
		key: 'mdd',
		title: 'Max Drawdown (MDD)',
		type: 'danger',
		value: 25.6,
	},
	{
		key: 'mddDays',
		title: 'MDD Days (Recovery Period)',
		type: 'warning',
		value: 4,
	},
	{
		key: 'returnToMDDRatio',
		title: 'Return to MDD Ratio',
		type: 'secondary',
		value: 4.2,
	},
	{
		key: 'expectancy',
		title: 'Expectancy',
		value: 6.5,
	},
]

export type SavedSimulationTrade = {
	tradeAction: TradeAction
	lots: number
	entryDate: Dayjs
	entryTime: Dayjs
	instrument: string
	expiry: Dayjs
	entryPrice: number
	exitPrice: number
	profitAndLoss: number
}

type TableProps = AntdTableProps<SavedSimulationTrade>

type SavedSimulationsModalProps = {
	onCancel: ModalProps['onCancel']
}

const SavedSimulationsModal: React.FC<SavedSimulationsModalProps> = ({
	onCancel,
}) => {
	const { token } = theme.useToken()

	const colorByType: Record<NonNullable<TextProps['type']>, string> = useMemo(
		() => ({
			warning: token.colorWarning,
			success: token.colorSuccess,
			danger: token.colorErrorText,
			secondary: token.colorTextSecondary,
		}),
		[token]
	)

	const columns: TableProps['columns'] = [
		{
			key: 'tradeAction',
			dataIndex: 'tradeAction',
			render: renderTradeAction,
		},
		{
			key: 'lots',
			title: 'Lots',
			dataIndex: 'lots',
		},
		{
			key: 'entryDate',
			title: 'Entry Date',
			dataIndex: 'entryDate',
			render: renderDayjsDate,
		},
		{
			key: 'entryTime',
			title: 'Entry Time',
			dataIndex: 'entryTime',
			render: renderDayjsTime,
		},
		{
			key: 'instrument',
			title: 'Instrument',
			dataIndex: 'instrument',
		},
		{
			key: 'expiry',
			title: 'Expiry',
			dataIndex: 'expiry',
			render: renderDayjsDate,
		},
		{
			key: 'entryPrice',
			title: 'Entry Price',
			dataIndex: 'entryPrice',
		},
		{
			key: 'exitPrice',
			title: 'Exit Price',
			dataIndex: 'exitPrice',
		},
		{
			key: 'profitAndLoss',
			title: 'P&L',
			dataIndex: 'profitAndLoss',
		},
	]

	return (
		<Modal
			title="Saved Simulations"
			width="85vw"
			open={true}
			onCancel={onCancel}
		>
			<Flex
				style={{
					padding: `${token.padding}px`,
				}}
				vertical
			>
				<Flex wrap="wrap" gap={token.marginXL} justify="space-between">
					{statistics.map(({ key, title, type, value }) => (
						<Flex key={key} flex="0 0 10%">
							<Statistic
								title={title}
								valueStyle={{
									color: type
										? colorByType[type] ?? token.colorPrimaryText
										: token.colorPrimaryText,
								}}
								// TODO: Wire up
								value={value}
							/>
						</Flex>
					))}
				</Flex>

				<Table
					// TODO: Wire up
					dataSource={[]}
					columns={columns}
					pagination={false}
					scroll={{ y: 'calc(100vh - 500px)' }}
				/>
			</Flex>
		</Modal>
	)
}

export default SavedSimulationsModal
