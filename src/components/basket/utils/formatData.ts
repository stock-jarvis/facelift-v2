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
			entry_time:
				'$d' in savedBasket.entryCondition.entryTime
					? formatEntryTime(savedBasket.entryCondition.entryTime)
					: savedBasket.entryCondition.entryTime,
			exit_time:
				'$d' in savedBasket.entryCondition.exitTime
					? formatEntryTime(savedBasket.entryCondition.exitTime)
					: savedBasket.entryCondition.exitTime,
			// entry_time: savedBasket.entryCondition.entryTime,
			// exit_time: savedBasket.entryCondition.exitTime,
		},
		bexit: {
			move: savedBasket.exitCondition.move ? true : false,
			repeat: savedBasket.exitCondition.repeat || '',
			loss: defaultToZero(savedBasket.exitCondition.totalLoss) || 0,
			profit: defaultToZero(savedBasket.exitCondition.totalProfit) || 0,
			punit: 'RS',
			lunit: 'RS',
			type: savedBasket.exitCondition.type || '',
		},
		// positions: savedBasket.positions.map((position: any, index: any) => ({
		// 	[index]: {
		// 		pexit: {
		// 			profit: defaultToZero(position.exitCondition.totalProfit.value),
		// 			loss: defaultToZero(position.exitCondition.stopLoss.value),
		// 			punit: position.exitCondition.totalProfit.type || 'RS',
		// 			lunit: position.exitCondition.stopLoss.type || 'RS',
		// 		},
		// 		pentry: {
		// 			trade_type: position.entryCondition.tradeType || '',
		// 			quantity: position.entryCondition.quantity || 0,
		// 			prem: position.entryCondition.tradeTypeValue || 0,
		// 			pos_type: position.type || '',
		// 			delta: position.entryCondition.tradeTypeParams || '',
		// 			opt_type: position.entryCondition.optionType || '',
		// 			expiry: position.entryCondition.expiry || '',
		// 			bs: position.entryCondition.actionType || '',
		// 			opt_filter: ''
		// 			// >= <= ==
		// 		},
		// 	},
		// })),
		positions: savedBasket.positions.map((position: any, index: any) => ({
			key: index + 1,
			value: {
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
					pos_type:
						position.type == 'future'
							? 'F'
							: position.type == 'options'
								? 'O'
								: '',
					opt_type: position.entryCondition.optionType || '',
					expiry:
						position.entryCondition.expiry == 'Monthly'
							? 'M'
							: position.entryCondition.expiry || '',
					bs: position.entryCondition.actionType || '',
					delta: position.entryCondition.tradeTypeParams || 0,
					opt_filter: '',
					// >= <= ==
				},
			},
		})),
		exchange: savedBasket.exchange || '',
		ticker: savedBasket.ticker || '',
		type: savedBasket.type || '',
	}
}
