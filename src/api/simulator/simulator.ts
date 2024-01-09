import { Dayjs } from 'dayjs'
import { HttpStatusCode } from 'axios'
import { QueryFunction, useQuery } from 'react-query'

import axios from '../axios'

import { Exchange } from 'src/common/enums'
import { SimulatorUrl } from './urls'
import { Future, Option } from 'common/types'
import {
	formatDate,
	formatTime,
	convertEpochInSecondsToDayJS,
	convertDateFromServer,
} from 'src/common/utils/date-time-utils'

/************************* Get Instruments List ***************************/
type GetInstrumentsListPayload = {
	date: Dayjs
}

type Server_GetInstrumentsListPayload = {
	date: string
}

type GetInstrumentsListResponse = {
	instrumentList: string[]
}

type Server_GetInstrumentsListResponse = {
	InstrumentList: string[]
}

const translateGetInstrumentsListPayload = (
	getInstrumentsListPayload: GetInstrumentsListPayload
): Server_GetInstrumentsListPayload => ({
	date: formatDate(getInstrumentsListPayload.date),
})

const translateGetInstrumentsListResponse = ({
	InstrumentList,
}: Server_GetInstrumentsListResponse): GetInstrumentsListResponse => ({
	instrumentList: InstrumentList,
})

const getInstrumentsList: QueryFunction<
	GetInstrumentsListResponse | undefined,
	[string, GetInstrumentsListPayload]
> = async (context) => {
	const getInstrumentsListPayload = translateGetInstrumentsListPayload(
		context.queryKey[1]
	)

	const response = await axios.get(SimulatorUrl.GetInstrumentsList, {
		data: getInstrumentsListPayload,
	})

	if (response.status === HttpStatusCode.Ok) {
		return translateGetInstrumentsListResponse(response.data)
	}
}

export const useGetInstrumentsListQuery = ({
	variables,
}: {
	variables: GetInstrumentsListPayload
}) =>
	useQuery({
		queryFn: getInstrumentsList,
		queryKey: [SimulatorUrl.GetInstrumentsList, variables],
	})

/************************* Get AIOC ***************************/
type AIOCPayload = {
	/** DD-MM-YYYY */
	date: Dayjs
	/** HH:mm:ss */
	time: Dayjs
	/** DDMMYY[] */
	expiries?: string[]
	exchange: Exchange
	instrument: string
}

type Server_AIOCPayload = {
	exc: string
	inst: string
	date: string
	time: string
	exps?: string[]
}

export type AIOCResponse = {
	/** {"ddmmyy: Future"} */
	futures: Record<string, Future>
	expiryList: Dayjs[]
	optionChain: Record<string, Option[]>
}

type Server_AIOCResponse = {
	expList: string[]
	Futures: Record<
		string,
		{
			oi: number
			ltp: number
			ltq: number
			/** Epoch in Seconds */
			ltt?: number
		}
	>
	OptionChain: Record<
		string,
		{
			OptionChain: Array<{
				celtp: number
				/** Epoch in Seconds */
				celtt?: number
				peltp: number
				/** Epoch in Seconds */
				peltt?: number
				strike: number
				greeks: {
					celtq: number
					ceoi: number
					peltq: number
					peoi: number
				}
			}>
		}
	>
}

const translateAIOCPayload = ({
	date,
	time,
	expiries,
	exchange,
	instrument,
}: AIOCPayload): Server_AIOCPayload => ({
	exc: exchange,
	inst: instrument,
	date: formatDate(date),
	time: formatTime(time),
	exps: expiries,
})

const translateAIOCResponse = ({
	expList,
	Futures,
	OptionChain,
}: Server_AIOCResponse) =>
	/** Using promise to prevent blocking the main thread */
	new Promise<AIOCResponse>((resolve) => {
		const aiocReponse = {} as AIOCResponse

		aiocReponse.expiryList = expList.map((expiry) =>
			convertDateFromServer(expiry)
		)
		aiocReponse.optionChain = Object.entries(OptionChain).reduce(
			(acc, [date, optionChain]) => {
				acc[date] = optionChain.OptionChain.map(
					({ celtp, celtt, greeks, peltp, peltt, strike }) =>
						({
							date: convertDateFromServer(date),
							ceLastTradedTime: convertEpochInSecondsToDayJS(celtt),
							ceLastTradedPrice: celtp,
							peLastTradedTime: convertEpochInSecondsToDayJS(peltt),
							peLastTradedPrice: peltp,
							strike: strike,
							greeks: {
								ceOpenInterest: greeks.ceoi,
								ceLastTradedQuantity: greeks.celtq,
								peOpenInterest: greeks.peoi,
								peLastTradedQuantity: greeks.peltq,
							},
						}) as Option
				)
				return acc
			},
			{} as AIOCResponse['optionChain']
		)
		aiocReponse.futures = Object.entries(Futures).reduce(
			(acc, [date, { oi, ltp, ltq, ltt }]) => {
				acc[date] = {
					date: convertDateFromServer(date),
					openInterest: oi,
					lastTradedTime: convertEpochInSecondsToDayJS(ltt),
					lastTradedPrice: ltp,
					lastTradedQuantity: ltq,
				}

				return acc
			},
			{} as AIOCResponse['futures']
		)

		resolve(aiocReponse)
	})

const getAIOC: QueryFunction<
	AIOCResponse | undefined,
	[string, AIOCPayload]
> = async (context) => {
	const aiocPayload = translateAIOCPayload(context.queryKey[1])

	const response = await axios.post(SimulatorUrl.AIOC, aiocPayload)

	if (response.status === HttpStatusCode.Ok) {
		return translateAIOCResponse(response.data)
	}
}

export const useGetAIOCQuery = ({ variables }: { variables: AIOCPayload }) =>
	useQuery({
		queryFn: getAIOC,
		queryKey: [SimulatorUrl.AIOC, variables],
	})
