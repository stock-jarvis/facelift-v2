import { MutationFunction, useMutation } from 'react-query'
import axios from '../axios'
import { SimulatorUrl } from './urls'
import { Exchange } from 'src/common/enums'
import { Dayjs } from 'dayjs'
import { Future, Option } from 'common/types'
import {
	convertEpochInSecondsToDayJS,
	formatDate,
	formatTime,
} from 'src/common/utils/date-time-utils'

/************************* Get Instruments List ***************************/
type GetInstrumentsListPayload = {
	date: string
}

type GetInstrumentsListResponse = {
	/**
	 * Backend sends InstrumentsList but it is be parsed to camel case in the fetch method.
	 */
	instrumentList: Array<string>
}

const getInstrumentsList: MutationFunction<
	GetInstrumentsListResponse | undefined,
	GetInstrumentsListPayload
> = async (getInstrumentsListPayload) => {
	const response = await axios.post(
		SimulatorUrl.GetInstrumentsList,
		getInstrumentsListPayload
	)

	if (response.status === 200) {
		return {
			instrumentList: response.data.InstrumentList,
		} as GetInstrumentsListResponse
	}
}

export const useGetInstrumentsMutation = () =>
	useMutation({
		mutationFn: getInstrumentsList,
		mutationKey: SimulatorUrl.GetInstrumentsList,
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

const translateAIOCPayloadToServer = ({
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

type Server_Greeks = {
	celtq: number
	ceoi: number
	peltq: number
	peoi: number
}

type Server_Option = {
	celtp: number
	/** Epoch in Seconds */
	celtt?: number
	peltp: number
	/** Epoch in Seconds */
	peltt?: number
	strike: number
	greeks: Server_Greeks
}

type Server_Future = {
	oi: number
	ltp: number
	ltq: number
	/** Epoch in Seconds */
	ltt?: number
}

type Server_AIOCResponse = {
	expList: string[]
	Futures: Record<string, Server_Future>
	OptionChain: Record<string, { OptionChain: Server_Option[] }>
}

type AIOCResponse = {
	/** {"ddmmyy: Future"} */
	futures: Record<string, Future>
	expiryList: string[]
	optionChain: Record<string, Option[]>
}

const translateAIOCReponseToClient = ({
	expList,
	Futures,
	OptionChain,
}: Server_AIOCResponse) => {
	const aiocReponse = {} as AIOCResponse

	aiocReponse.expiryList = expList
	aiocReponse.optionChain = Object.entries(OptionChain).reduce(
		(acc, [date, optionChain]) => {
			acc[date] = optionChain.OptionChain.map(
				({ celtp, celtt, greeks, peltp, peltt, strike }) =>
					({
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
				openInterest: oi,
				lastTradedTime: convertEpochInSecondsToDayJS(ltt),
				lastTradedPrice: ltp,
				lastTradedQuantity: ltq,
			}

			return acc
		},
		{} as AIOCResponse['futures']
	)

	return aiocReponse
}
