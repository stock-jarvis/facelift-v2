export function convertData(inputData: any, data: any): any {
	return {
		ticker: inputData.ticker,
		name: data.name || '',
		identifier: 0,
		exchange: inputData.exchange,
		type: inputData.type,
		atm: 'spot',
		entryCondition: {
			exitTime: inputData.bentry.exit_time || '',
			entryTime: inputData.bentry.entry_time || '',
		},
		exitCondition: {
			type: inputData.bexit.type || '',
			totalLoss: inputData.bexit.loss || 0,
			totalProfit: inputData.bexit.profit || 0,
			repeat: inputData.bexit.repeat || '',
			punit: 'RS',
			lunit: 'RS',
		},
		// positions: Object.values(inputData.positions).map((position: any) => {
		// 	const key = Object.keys(position)[0] // Get the dynamic key
		// 	const data = position[key] // Extract the object using the dynamic key
		// 	return {
		// 		type: data.pentry.pos_type || '',
		// 		entryCondition: {
		// 			quantity: data.pentry.quantity || 0,
		// 			actionType: data.pentry.bs || '',
		// 			expiry: data.pentry.expiry || '',
		// 			optionType: data.pentry.opt_type || '',
		// 			tradeType: data.pentry.trade_type || '',
		// 			tradeTypeParams: data.pentry.delta || 0,
		// 			tradeTypeValue: data.pentry.prem || 0,
		// 		},
		// 		count: 1,
		// 		exitCondition: {
		// 			stopLoss: {
		// 				value: data.pexit.loss || 0,
		// 				type: 'RS',
		// 			},
		// 			totalProfit: {
		// 				value: data.pexit.profit || 0,
		// 				type: 'RS',
		// 			},
		// 		},
		// 	}
		// }),
		positions: inputData.positions.map((position: any) => {
			return {
				type:
					position.value.pentry.pos_type == 'F'
						? 'future'
						: position.value.pentry.pos_type == 'O'
							? 'options'
							: 'O',
				entryCondition: {
					quantity: position.value.pentry.quantity || 0,
					actionType: position.value.pentry.bs || '',
					expiry: position.value.pentry.expiry || '',
					optionType: position.value.pentry.opt_type || '',
					tradeType: position.value.pentry.trade_type || '',
					tradeTypeParams: position.value.pentry.delta || 0,
					tradeTypeValue: position.value.pentry.prem || 0,
				},
				count: 1,
				exitCondition: {
					stopLoss: {
						value: position.value.pexit.loss || 0,
						type: 'RS',
					},
					totalProfit: {
						value: position.value.pexit.profit || 0,
						type: 'RS',
					},
				},
			}
		}),
	}
}
