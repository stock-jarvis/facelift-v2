import {
	BasketDataProps,
	BasketDataValues,
} from 'src/components/basket/types/types'
import SpotBasketDetail from './spot-basket-detail'
import FututeBasketDetails from './future-basket-details'
import OptionBasketDetail from './options-basket-details'
interface DetailsContainerProps {
	instrument: string
	basket: BasketDataProps[]
	basketInitialData: BasketDataValues
	handleCopyBasket: (id: string) => void
	handleDeleteBasket: (id: string) => void
	setBasket: (basket: BasketDataProps[]) => void
}

const DetailsContainer: React.FC<DetailsContainerProps> = ({
	basket,
	instrument,
	setBasket,
	handleCopyBasket,
	handleDeleteBasket,
}) => {
	return (
		<>
			{basket.length > 0 &&
				basket.map((bask, index) =>
					bask.type === 'spot' ? (
						<SpotBasketDetail
							key={bask.id}
							basket={basket}
							dark={index % 2 === 0}
							individualBasket={bask}
							baseInstrumentValue={instrument}
							handleEditBasket={setBasket}
							handleCopyBasket={handleCopyBasket}
							handleDeleteBasket={handleDeleteBasket}
						/>
					) : bask.type === 'future' ? (
						<FututeBasketDetails
							key={bask.id}
							dark={index % 2 === 0}
							individualBasket={bask}
							baseInstrumentValue={instrument}
							basket={basket}
							handleEditBasket={setBasket}
							handleCopyBasket={handleCopyBasket}
							handleDeleteBasket={handleDeleteBasket}
						/>
					) : (
						<OptionBasketDetail
							key={bask.id}
							individualBasket={bask}
							dark={index % 2 === 0}
							basket={basket}
							baseInstrumentValue={instrument}
							handleEditBasket={setBasket}
							handleCopyBasket={handleCopyBasket}
							handleDeleteBasket={handleDeleteBasket}
						/>
					)
				)}
		</>
	)
}

export default DetailsContainer
