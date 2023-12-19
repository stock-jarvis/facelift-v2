import { useEffect } from 'react'
import { TimeHours, Time } from 'src/components/basket/types/types'
import {
	nseTimes,
	mxcTimes,
	curTimes,
} from 'src/components/basket/constants/entry-exit-time'
export const useMarketTimes = (
	basketTrade: string | undefined,
	entryHourList: TimeHours[] | undefined,
	exitHourList: TimeHours[] | undefined,
	setEntryHourList: (val: TimeHours[]) => void,
	setExitHourList: (val: TimeHours[]) => void,
	setEntryMinuteList: (val: Time[]) => void,
	setExitMinuteList: (val: Time[]) => void,
	setCurrentEntryHour: (val: number) => void,
	setCurrentEntryMinute: (val: number) => void,
	setCurrentExitHour: (val: number) => void,
	setCurrentExitMinute: (val: number) => void
) => {
	useEffect(() => {
		if (basketTrade === 'NSE') {
			setEntryHourList(nseTimes)
			setEntryMinuteList(nseTimes[0].minutes)
			setCurrentEntryHour(nseTimes[0].value)
			setCurrentEntryMinute(nseTimes[0].minutes[0].value)
			setExitHourList(nseTimes)
			setExitMinuteList(nseTimes[nseTimes.length - 1].minutes)
			setCurrentExitHour(nseTimes[nseTimes.length - 1].value)
			const minutes = nseTimes[nseTimes.length - 1].minutes
			const finalMiutes = minutes[minutes.length - 1]
			setCurrentExitMinute(finalMiutes.value)
		} else if (basketTrade === 'MCX') {
			setEntryHourList(mxcTimes)
			setEntryMinuteList(mxcTimes[0].minutes)
			setCurrentEntryHour(mxcTimes[0].value)
			setCurrentEntryMinute(mxcTimes[0].minutes[0].value)
			setExitHourList(mxcTimes)
			setExitMinuteList(mxcTimes[mxcTimes.length - 1].minutes)
			setCurrentExitHour(mxcTimes[mxcTimes.length - 1].value)
			const minutes = mxcTimes[mxcTimes.length - 1].minutes
			const finalMiutes = minutes[minutes.length - 1]
			setCurrentExitMinute(finalMiutes.value)
		} else if (basketTrade === 'CUR') {
			setEntryHourList(curTimes)
			setEntryMinuteList(curTimes[0].minutes)
			setCurrentEntryHour(curTimes[0].value)
			setCurrentEntryMinute(curTimes[0].minutes[0].value)
			setExitHourList(curTimes)
			setExitMinuteList(curTimes[curTimes.length - 1].minutes)
			setCurrentExitHour(curTimes[curTimes.length - 1].value)
			const minutes = curTimes[curTimes.length - 1].minutes
			const finalMiutes = minutes[minutes.length - 1]
			setCurrentExitMinute(finalMiutes.value)
		}
	}, [
		basketTrade,
		setCurrentEntryHour,
		setCurrentEntryMinute,
		setEntryHourList,
		setEntryMinuteList,
		setCurrentExitMinute,
		setCurrentExitHour,
		setExitHourList,
		setExitMinuteList,
	])

	useEffect(() => {
		if (!entryHourList || entryHourList.length === 0) {
			if (basketTrade) {
				if (basketTrade === 'NSE') {
					setEntryHourList(nseTimes)
					setEntryMinuteList(nseTimes[0].minutes)
					setCurrentEntryHour(nseTimes[0].value)
					setCurrentEntryMinute(nseTimes[0].minutes[0].value)
				} else if (basketTrade === 'MCX') {
					setEntryHourList(mxcTimes)
					setEntryMinuteList(mxcTimes[0].minutes)
					setCurrentEntryHour(mxcTimes[0].value)
					setCurrentEntryMinute(mxcTimes[0].minutes[0].value)
				} else {
					setEntryHourList(curTimes)
					setEntryMinuteList(curTimes[0].minutes)
					setCurrentEntryHour(curTimes[0].value)
					setCurrentEntryMinute(curTimes[0].minutes[0].value)
				}
			}
		}
	}, [
		basketTrade,
		entryHourList,
		setCurrentEntryHour,
		setCurrentEntryMinute,
		setEntryHourList,
		setEntryMinuteList,
	])

	useEffect(() => {
		if (!exitHourList || exitHourList.length === 0) {
			if (basketTrade) {
				if (basketTrade === 'NSE') {
					setExitHourList(nseTimes)
					setExitMinuteList(nseTimes[nseTimes.length - 1].minutes)
					setCurrentExitHour(nseTimes[nseTimes.length - 1].value)
					const minutes = nseTimes[nseTimes.length - 1].minutes
					const finalMiutes = minutes[minutes.length - 1]
					setCurrentExitMinute(finalMiutes.value)
				} else if (basketTrade === 'MCX') {
					setExitHourList(mxcTimes)
					setExitMinuteList(mxcTimes[mxcTimes.length - 1].minutes)
					setCurrentExitHour(mxcTimes[mxcTimes.length - 1].value)
					const minutes = mxcTimes[mxcTimes.length - 1].minutes
					const finalMiutes = minutes[minutes.length - 1]
					setCurrentExitMinute(finalMiutes.value)
				} else {
					setExitHourList(curTimes)
					setExitMinuteList(curTimes[curTimes.length - 1].minutes)
					setCurrentExitHour(curTimes[curTimes.length - 1].value)
					const minutes = curTimes[curTimes.length - 1].minutes
					const finalMiutes = minutes[minutes.length - 1]
					setCurrentExitMinute(finalMiutes.value)
				}
			}
		}
	}, [
		basketTrade,
		exitHourList,
		setCurrentExitMinute,
		setCurrentExitHour,
		setExitHourList,
		setExitMinuteList,
	])
}
