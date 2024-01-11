import { SnippetsOutlined } from '@ant-design/icons'
import {
	Flex,
	Button,
	theme,
	Input,
	notification,
	FlexProps,
	ButtonProps,
	InputProps,
} from 'antd'
import { useEffect, useState, useMemo, createContext } from 'react'
import { useBasketStore } from 'src/components/basket/store/basket-store'
import type { NotificationPlacement } from 'antd/es/notification/interface'
import {
	BasketDataProps,
	SavedBasketsExitCondition as Exit,
	SavedBasketsEntryCondition as Entry,
	SavedBasket,
} from 'src/components/basket/types/types'
//TODO: Optimize this component
interface FooterProps {
	basketData: SavedBasket
	basket: BasketDataProps[]
	setPositionError: (error: boolean) => void
}

const Context = createContext({ name: 'Default' })

const Footer: React.FC<FooterProps> = ({
	basket,
	basketData,
	setPositionError,
}) => {
	const { token } = theme.useToken()
	const [api, contextHolder] = notification.useNotification()
	const [basketEntryConditions, setBasketEntryConditions] = useState<Entry>()
	const [basketExitConditions, setBasketExitConditions] = useState<Exit>()
	const [savedBasket, setSavedBasket] = useState<SavedBasket>()
	const contextValue = useMemo(() => ({ name: 'Ant Design' }), [])
	const { timeError, resetEditablebasket, updateRuntimeBasketData } =
		useBasketStore()

	const openNotification = (placement: NotificationPlacement) => {
		api.info({
			message: `Time Error!`,
			description: <>Exit Time should be after entry time.</>,
			placement,
		})
	}

	useEffect(() => {
		if (
			!basketEntryConditions ||
			basketEntryConditions.entryTime !==
				basketData.entryCondition?.entryTime ||
			basketEntryConditions.exitTime !== basketData.entryCondition.exitTime
		) {
			setBasketEntryConditions(basketData.entryCondition)
		}
	}, [basketData, basketEntryConditions])

	useEffect(() => {
		if (
			!basketExitConditions ||
			basketExitConditions.type !== basketData.exitCondition.type ||
			basketExitConditions.totalProfit !==
				basketData.exitCondition.totalProfit ||
			basketExitConditions.totalLoss !== basketData.exitCondition.totalLoss ||
			(basketData.exitCondition.type === 'SQOL' &&
				basketExitConditions.move !== basketData.exitCondition.move) ||
			(basketData.exitCondition.type === 'SQAL' &&
				basketExitConditions.repeat !== basketData.exitCondition.repeat)
		) {
			const obj: Exit = {
				type: basketData.exitCondition.type,
				totalLoss: basketData.exitCondition.totalLoss,
				totalProfit: basketData.exitCondition.totalProfit,
			}
			if (obj.type === 'SQOL') {
				obj.move = basketData.exitCondition.move
			} else if (obj.type === 'SQAL') {
				obj.repeat = basketData.exitCondition.repeat
			}
			setBasketExitConditions(obj)
		}
	}, [basketData, basketExitConditions])

	useEffect(() => {
		if (
			!savedBasket ||
			savedBasket.ticker !== basketData.ticker ||
			savedBasket.id !== basketData.id ||
			savedBasket.exchange !== basketData.exchange ||
			savedBasket.atm !== basketData.atm ||
			savedBasket.entryCondition !== basketEntryConditions ||
			savedBasket.name !== basketData.name ||
			savedBasket.identifier !== basketData.identifier ||
			savedBasket.exitCondition !== basketExitConditions ||
			savedBasket.positions !== basket ||
			savedBasket.type !== basketData.type
		) {
			if (basketExitConditions) {
				setSavedBasket({
					ticker: basketData.ticker,
					id: basketData.id,
					name: basketData.name,
					identifier: basketData.identifier,
					exchange: basketData.exchange,
					type: basketData.type,
					atm: basketData.atm,
					entryCondition: basketEntryConditions,
					exitCondition: basketExitConditions,
					positions: basket,
				})
			}
		}
	}, [
		basketEntryConditions,
		basketData,
		basket,
		basketExitConditions,
		savedBasket,
	])

	const handleSaveBasketClick = () => {
		if (basket.length > 0) {
			if (timeError) {
				openNotification('topRight')
			} else {
				if (savedBasket) {
					updateRuntimeBasketData(savedBasket)
					resetEditablebasket()
				}
			}
		} else {
			setPositionError(true)
		}
	}

	const parentProps: FlexProps = {
		justify: 'space-between',
		align: 'center',
		children: null,
		style: {
			padding: token.paddingSM,
			width: '100%',
			borderTop: '1px solid #F0F0F0',
		},
	}

	const saveButtonProps: ButtonProps = {
		type: 'primary',
		onClick: handleSaveBasketClick,
		icon: <SnippetsOutlined />,
	}

	const spreadInputProps: InputProps = {
		placeholder: 'Spread',
		suffix: '%',
		style: { width: '150px' },
	}

	return (
		<Context.Provider value={contextValue}>
			{contextHolder}
			<Flex {...parentProps}>
				<Input {...spreadInputProps} />
				<Button {...saveButtonProps}>Save Basket</Button>
			</Flex>
		</Context.Provider>
	)
}

export default Footer
