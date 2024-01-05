import { Flex, Statistic, theme } from 'antd'
import InstrumentPositionsTable from './instrument-positions-table'
import { TextProps } from 'antd/es/typography/Text'
import { useMemo } from 'react'

const statistics: Array<{
	key: string
	title: string
	type?: TextProps['type']
	// TODO: Remove after demo
	value: number
}> = [
	{
		key: 'profitAndLoss',
		title: 'Profit & Loss',
		type: 'success',
		value: 20000,
	},
	{
		key: 'netCredit',
		title: 'Net Credit',
		value: 10000,
	},
	{
		key: 'breakeven',
		title: 'Breakeven',
		value: 1250,
	},
	{
		key: 'delta',
		title: 'Delta',
		value: 2000,
	},
]

const Positions = () => {
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

	return (
		<Flex
			className="w-full h-full"
			style={{
				padding: token.paddingMD,
			}}
			vertical
		>
			<Flex wrap="wrap" gap={token.marginXL} justify="space-between">
				{statistics.map(({ key, title, type, value }) => (
					<Flex key={key}>
						<Statistic
							title={title}
							valueStyle={{
								color: type
									? colorByType[type] ?? token.colorTextSecondary
									: token.colorTextSecondary,
							}}
							// TODO: Wire up
							value={value}
						/>
					</Flex>
				))}
			</Flex>
			<InstrumentPositionsTable />
		</Flex>
	)
}

export default Positions
