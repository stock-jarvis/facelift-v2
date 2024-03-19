export const createConvertedBasket = (savedBasket: any) => {
	function formatEntryTime(entryTime: any) {
		const hours = entryTime.$d.getHours().toString().padStart(2, '0')
		const minutes = entryTime.$d.getMinutes().toString().padStart(2, '0')
		const seconds = entryTime.$d.getSeconds().toString().padStart(2, '0')
		return `${hours}:${minutes}:${seconds}`
	}

	const defaultToZero = (value: any) => (value !== undefined ? value : 0)

	return {
		bentry: {
			entry_time: formatEntryTime(savedBasket.entryCondition.entryTime),
			exit_time: formatEntryTime(savedBasket.entryCondition.exitTime),
			// entry_time: savedBasket.entryCondition.entryTime,
			// exit_time: savedBasket.entryCondition.exitTime,
		},
		bexit: {
			move: savedBasket.exitCondition.move,
			repeat: savedBasket.exitCondition.repeat,
			loss: defaultToZero(savedBasket.exitCondition.totalLoss),
			profit: defaultToZero(savedBasket.exitCondition.totalProfit),
			punit: 'RS',
			lunit: 'RS',
			type: savedBasket.exitCondition.type,
		},
		positions: savedBasket.positions.map((position: any, index: any) => ({
			[index]: {
				pexit: {
					profit: defaultToZero(position.exitCondition.totalProfit.value),
					loss: defaultToZero(position.exitCondition.stopLoss.value),
					punit: position.exitCondition.totalProfit.type || 'RS',
					lunit: position.exitCondition.stopLoss.type || 'RS',
				},
				pentry: {
					trade_type: position.entryCondition.tradeType || '',
					quantity: position.entryCondition.quantity || 0,
					prem: position.entryCondition.tradeTypeValue || 0,
					pos_type: position.type || '',
					delta: position.entryCondition.tradeTypeParams || '',
					opt_type: position.entryCondition.optionType || '',
					expiry: position.entryCondition.expiry || '',
					bs: position.entryCondition.actionType || '',
				},
			},
		})),
		exchange: savedBasket.exchange || '',
		ticker: savedBasket.ticker || '',
		type: savedBasket.type || '',
	}
}
