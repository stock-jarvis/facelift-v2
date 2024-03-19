import { SnippetsOutlined } from '@ant-design/icons'
import { Typography, Flex, Button, theme, Input, notification } from 'antd'
const { Text } = Typography
import { useEffect, useState, useMemo, createContext } from 'react'
import { useBasketStore } from 'src/components/basket/store/basket-store'
import type { NotificationPlacement } from 'antd/es/notification/interface'
import {
	BasketDataProps,
	SavedBasketsExitCondition as Exit,
	SavedBasketsEntryCondition as Entry,
	SavedBasket,
} from 'src/components/basket/types/types'
import { CloseCircleFilled, CheckCircleFilled } from '@ant-design/icons'
import { createConvertedBasket } from 'src/components/basket/utils/formatData'
import { convertJsonToBase64 } from 'src/components/basket/utils/Base64'
import { SavedBasketAPI } from 'src/api/AuthService'
import { LOCAL_STORAGE } from 'src/common/local-storage-keys'
// import { SavedBasketAPI } from 'src/api/AuthService/SavedBasketAPI'
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
	//  console.log(savedBasket,"Basketss")
	const openNotificationSuccess = (placement: NotificationPlacement) => {
		api.info({
			style: {
				padding: token.paddingXS,
				borderRadius: '15px',
			},
			icon: (
				<CheckCircleFilled
					style={{
						color: token.colorSuccess,
					}}
				/>
			),
			closeIcon: null,
			message: (
				<Text
					style={{
						fontWeight: token.fontWeightStrong,
						color: token.colorSuccess,
					}}
				>
					Success!
				</Text>
			),
			description: <Text>Basket Saved Successfully</Text>,
			placement,
		})
	}

	const openNotification = (placement: NotificationPlacement) => {
		api.info({
			style: {
				padding: token.paddingXS,
				borderRadius: '15px',
			},
			icon: (
				<CloseCircleFilled
					style={{
						color: token.colorError,
					}}
				/>
			),
			closeIcon: null,
			message: (
				<Text
					style={{
						fontWeight: token.fontWeightStrong,
						color: token.colorError,
					}}
				>
					Time Error!
				</Text>
			),
			description: <Text>Exit Time should be after entry time.</Text>,
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

	const authTokenJSON = JSON.parse(
		localStorage.getItem(LOCAL_STORAGE.SESSION_INFO)
	)

	const handleSaveBasketClick = () => {
		// console.log('Hello', savedBasket)
		const convertedBasket = createConvertedBasket(savedBasket)
		// console.log(convertedBasket, 'New')
		const base64Data = convertJsonToBase64(convertedBasket)
		// console.log(base64Data, '64Data')
		const data = {
			cid: authTokenJSON.UID,
			inst: savedBasket.ticker,
			ipjson: base64Data,
			name: savedBasket.name.trim(),
		}
		console.log({ savedBasket })
		SaveData(data)
		if (basket.length > 0) {
			if (timeError) {
				openNotification('topRight')
			} else {
				if (savedBasket) {
					openNotificationSuccess('topRight')
					updateRuntimeBasketData(savedBasket)
					resetEditablebasket()
				}
			}
		} else {
			setPositionError(true)
		}
	}

	const SaveData = async (authTokenJSON: any, data: any) => {
		try {
			const response = await SavedBasketAPI(authTokenJSON, data)
			if (response.Code === 200) {
				notification.success({ message: 'Basket Saved Successfully' })
			} else {
				notification.error({ message: 'Error While saving basket1111' })
			}
		} catch (error) {
			notification.error({ message: 'Error While saving basket' })
		}
	}

	return (
		<Flex justify="space-between" align="center" className="h-fit">
			<Context.Provider value={contextValue}>
				{contextHolder}
				<Flex
					className="h-fit"
					justify="space-between"
					align="center"
					style={{
						padding: token.paddingSM,
						width: '100%',
						borderTop: '1px solid #F0F0F0',
					}}
				>
					<Input placeholder="Spread" suffix="%" style={{ width: '150px' }} />
					<Button
						type="primary"
						onClick={handleSaveBasketClick}
						icon={<SnippetsOutlined />}
					>
						Save Basket
					</Button>
				</Flex>
			</Context.Provider>
		</Flex>
	)
}

export default Footer
