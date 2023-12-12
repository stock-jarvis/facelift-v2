//import React from 'react'
// import Image from 'next/image'
//import algoBacktesting from '../../../../public/images/algo-backtest.png'
//import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import Backtest from 'src/assets/images/backtest.png'
import Desc from '../../descriptions/backTestDesc'
import InvertedCard from '../../custom/invertedCard'

export default function ThirdContainer() {
	return (
		<InvertedCard image={Backtest}>
			<Desc />
		</InvertedCard>
	)
}
