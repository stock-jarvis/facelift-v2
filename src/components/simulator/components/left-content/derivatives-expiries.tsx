import { useState, useMemo, useEffect } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Flex, Button, Segmented, Typography } from 'antd'
const { Text } = Typography
import { useSimulatorParamsStore } from '../../store/simulator-params-store'
import {
	convertDDMMYYToDate,
	convertValuesToDefaultOptions,
} from 'src/common/utils/conversion-utils'
import { DefaultOptionType } from 'antd/es/select'
import useGetAIOCData from 'src/api/simulator/hooks/use-get-aioc'

const SHOW_TOTAL_EXPIRIES = 3

interface Props {
	setSelectedExpiry(value: number | undefined): void
}

const DerivatiesExpiries: React.FC<Props> = ({ setSelectedExpiry }) => {
	const { exchange, activeInstrument, date, time } = useSimulatorParamsStore()
	const { data: AIOC } = useGetAIOCData(date, time, exchange, activeInstrument)

	const [showExpiriesFrom, setShowExpiriesFrom] = useState(0)

	useEffect(() => {
		setSelectedExpiry(AIOC?.expList[0])
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [AIOC?.expList])

	const expiries = useMemo(() => {
		return convertValuesToDefaultOptions(AIOC?.expList ?? [], (label) =>
			convertDDMMYYToDate(label)
		)
	}, [AIOC?.expList])

	return (
		<Flex align="center" gap="small" justify="space-between">
			<Button
				disabled={
					showExpiriesFrom == 0 || expiries.length < SHOW_TOTAL_EXPIRIES
				}
				size="small"
				onClick={() => setShowExpiriesFrom((curr) => curr - 1)}
			>
				<LeftOutlined />
			</Button>
			{expiries.length == 0 ? (
				<Text>No expiries available</Text>
			) : (
				<Segmented<DefaultOptionType>
					block
					style={{ flex: 1 }}
					// Display only 3 {SHOW_TOTAL_EXPIRIES} expiries at a time
					options={expiries.slice(
						showExpiriesFrom,
						showExpiriesFrom + SHOW_TOTAL_EXPIRIES
					)}
					onChange={(value) => {
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-expect-error
						setSelectedExpiry(value as number)
					}}
				/>
			)}
			<Button
				disabled={
					showExpiriesFrom === expiries.length - SHOW_TOTAL_EXPIRIES ||
					expiries.length < SHOW_TOTAL_EXPIRIES
				}
				size="small"
				onClick={() => setShowExpiriesFrom((curr) => curr + 1)}
			>
				<RightOutlined />
			</Button>
		</Flex>
	)
}

export default DerivatiesExpiries
