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
import { useEffect, useMemo, useState } from 'react'
import { GetBasketReport } from 'src/api/AuthService'
import { TradeAction } from 'src/common/enums'
import {
	renderDayjsDate,
	renderDayjsTime,
	renderTradeAction,
} from 'src/common/utils/render-utils'
import { base64ToJSON } from '../utils/BaseToJSON'

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

type ReportBasketModalProps = {
	onCancel: ModalProps['onCancel']
}

const ReportBasketModal: React.FC<ReportBasketModalProps> = ({
	onCancel,
	bid,
}) => {
	const { token } = theme.useToken()
	const [data, setData] = useState()

	useEffect(() => {
		getData()
	}, [])

	async function getData() {
		const d = await GetBasketReport(bid)
		setData(base64ToJSON(d.report))
	}

	const [positionData, setPositionData] = useState([])
	useEffect(() => {
		console.log({ data })
		setPositionData(data?.PositionData)
	}, [data])

	const colorByType: Record<NonNullable<TextProps['type']>, string> = useMemo(
		() => ({
			warning: token.colorWarning,
			success: token.colorSuccess,
			danger: token.colorErrorText,
			secondary: token.colorTextSecondary,
		}),
		[token]
	)

	// const columns: TableProps['columns'] = [
	// 	{
	// 		key: 'tradeAction',
	// 		dataIndex: 'tradeAction',
	// 		render: renderTradeAction,
	// 	},
	// 	{
	// 		key: 'lots',
	// 		title: 'Lots',
	// 		dataIndex: 'lots',
	// 	},
	// 	{
	// 		key: 'entryDate',
	// 		title: 'Entry Date',
	// 		dataIndex: 'entryDate',
	// 		render: renderDayjsDate,
	// 	},
	// 	{
	// 		key: 'entryTime',
	// 		title: 'Entry Time',
	// 		dataIndex: 'entryTime',
	// 		render: renderDayjsTime,
	// 	},
	// 	{
	// 		key: 'instrument',
	// 		title: 'Instrument',
	// 		dataIndex: 'instrument',
	// 	},
	// 	{
	// 		key: 'expiry',
	// 		title: 'Expiry',
	// 		dataIndex: 'expiry',
	// 		render: renderDayjsDate,
	// 	},
	// 	{
	// 		key: 'entryPrice',
	// 		title: 'Entry Price',
	// 		dataIndex: 'entryPrice',
	// 	},
	// 	{
	// 		key: 'exitPrice',
	// 		title: 'Exit Price',
	// 		dataIndex: 'exitPrice',
	// 	},
	// 	{
	// 		key: 'profitAndLoss',
	// 		title: 'P&L',
	// 		dataIndex: 'profitAndLoss',
	// 	},
	// ]

	const columns: TableProps['columns'] = [
		// Existing columns
		{
			key: 'Date',
			title: 'Date',
			dataIndex: 'Date',
			// render: (text) => new Date(text * 1000).toUTCString(),
			render: (text) => {
				const date = new Date(text * 1000)
				const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
				return date.toLocaleDateString('en-GB', options) // Adjust 'en-GB' based on your locale
			},
		},
		{
			key: 'Expiry',
			title: 'Expiry',
			dataIndex: 'Expiry',
			render: (text) => {
				const date = new Date(text * 1000)
				const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
				return date.toLocaleDateString('en-GB', options) // Adjust 'en-GB' based on your locale
			},
		},
		{
			key: 'Strike',
			title: 'Strike',
			dataIndex: 'Strike',
		},
		{
			key: 'Opt_Type',
			title: 'Opt_Type',
			dataIndex: 'Opt_Type',
		},
		{
			key: 'Trigger',
			title: 'Trigger',
			dataIndex: 'Trigger',
		},
		{
			key: 'Etime',
			title: 'Entry time',
			dataIndex: 'Etime',
			render: (text) => {
				const time = new Date(text * 1000)
				return time.toLocaleTimeString('en-US', { hour12: false }) // Adjust 'en-US' based on your locale
			},
		},
		{
			key: 'Entry',
			title: 'Entry',
			dataIndex: 'Entry',
		},
		{
			key: 'Xtime',
			title: 'Exit time',
			dataIndex: 'Xtime',
			render: (text) => {
				const time = new Date(text * 1000)
				return time.toLocaleTimeString('en-US', { hour12: false }) // Adjust 'en-US' based on your locale
			},
		},
		{
			key: 'Exit',
			title: 'Exit',
			dataIndex: 'Exit',
		},
		{
			key: 'Result',
			title: 'Result',
			dataIndex: 'Result',
		},
	]

	const statisticsWithMetadata = [
		// ...statistics,
		{
			key: 'TotalProfit',
			title: 'Total Profit',
			value: data?.MetaData?.TotalProfit.toFixed(2),
			type: 'success',
		},
		{
			key: 'AverageDailyProfit',
			title: 'Average Daily Profit',
			value: data?.MetaData?.AverageDailyProfit.toFixed(2),
			type: 'warning',
		},
		{
			key: 'AverageMonthlyProfit',
			title: 'Average Monthly Profit',
			value: data?.MetaData?.AverageMonthlyProfit.toFixed(2),
			type: 'success',
		},
		{
			key: 'AverageYearlyProfit',
			title: 'Average yearly Profit',
			value: data?.MetaData?.AverageYearlyProfit.toFixed(2),
			type: 'success',
		},
		{
			key: 'WinP',
			title: 'Winning Percentage',
			value: data?.MetaData?.WinP.toFixed(2),
			type: 'success',
		},
		{
			key: 'LossP',
			title: 'Winning Percentage',
			value: data?.MetaData?.LossP.toFixed(2),
			type: 'danger',
		},
		{
			key: 'AvgProfitWinDays',
			title: 'Avg Profit Win Days',
			value: data?.MetaData?.AvgProfitWinDays.toFixed(2),
			type: 'success',
		},
		{
			key: 'AvgLossLossDays',
			title: 'Avg Profit Loss Days',
			value: data?.MetaData?.AvgLossLossDays.toFixed(2),
			type: 'danger',
		},
		{
			key: 'MaxDrawDown',
			title: 'Max Draw Down',
			value: data?.MetaData?.MaxDrawDown.toFixed(2),
			type: 'success',
		},
		{
			key: 'MaxRecoveryTime',
			title: 'Max Recovery Time',
			value: data?.MetaData?.MaxRecoveryTime.toFixed(2),
			type: 'danger',
		},
		{
			key: 'RTMDDR',
			title: 'RTMDDR',
			value: data?.MetaData?.RTMDDR.toFixed(2),
			type: 'warning',
		},
		{
			key: 'MaxWinStreak',
			title: 'MaxWinStreak',
			value: data?.MetaData?.MaxWinStreak.toFixed(2),
			type: 'success',
		},
		{
			key: 'MaxLossStreak',
			title: 'MaxLossStreak',
			value: data?.MetaData?.MaxLossStreak.toFixed(2),
			type: 'danger',
		},
		{
			key: 'Expectancy',
			title: 'Expectancy',
			value: data?.MetaData?.Expectancy.toFixed(2),
			type: 'secondary',
		},
		// Add similar entries for other metadata keys
	]
	return (
		<Modal title="Basket Report" width="85vw" open={true} onCancel={onCancel}>
			<Flex
				style={{
					padding: `${token.padding}px`,
				}}
				vertical
			>
				<Flex wrap="wrap" gap={token.marginXL} justify="space-between">
					{statisticsWithMetadata.map(({ key, title, type, value }) => (
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
					dataSource={positionData}
					columns={columns}
					pagination={false}
					scroll={{ y: 'calc(100vh - 500px)' }}
				/>
			</Flex>
		</Modal>
	)
}

export default ReportBasketModal
