import { Flex, theme, Table, Button, Checkbox, Typography } from 'antd'
//import ListItem from '../../common/basket-item/runtime-basket-item'
import {
	FormOutlined,
	DeleteOutlined,
	CopyOutlined,
	SnippetsOutlined,
} from '@ant-design/icons'
import { useBasketStore } from '../../store/basket-store'
import { generateUniqueId } from '../../common/utils/randomizer'
import { RunTimeBasketData } from '../../types/types'
import { useEffect } from 'react'
//import { IconActions } from '../../types/types'

const Index = () => {
	const { token } = theme.useToken()
	const {
		runtimeBasketList,
		deleteRuntimeBasket,
		toogleEditModal,
		setEditableBasket,
		addNewRuntimeBasket,
		savedBaskets,
		toogleSaveError,
		updateSelection,
		addToStoredBaskets,
		updateSelectedBasket,
	} = useBasketStore()

	const onHandleBasketEdit = (id: string) => {
		const basket = runtimeBasketList.find((basket) => basket.id === id)
		if (basket) {
			toogleSaveError(id, false)
		}
		setEditableBasket(id)
		toogleEditModal(true)
	}

	const onHandleBasketDuplicate = (name: string) => {
		const duplicateBasket = runtimeBasketList.filter(
			(basket) => basket.name === name
		)
		if (duplicateBasket[duplicateBasket.length - 1]) {
			addNewRuntimeBasket({
				...duplicateBasket[duplicateBasket.length - 1],
				id: generateUniqueId(),
				error: false,
				identifier: duplicateBasket[duplicateBasket.length - 1].identifier + 1,
			})
		}
	}
	useEffect(() => {
		updateSelectedBasket()
	}, [runtimeBasketList, updateSelectedBasket])

	const onHandleBaskeSave = (id: string) => {
		const isBasketSaved = savedBaskets.find((basket) => basket.id === id)
		if (isBasketSaved) {
			addToStoredBaskets(isBasketSaved)
			//TODO: Tie this up with the api
		} else {
			toogleSaveError(id, true)
		}
	}

	const onHandleBaskeDelete = (id: string) => {
		deleteRuntimeBasket(id)
	}

	const columns = [
		{
			title: '',
			dataIndex: '',
			render: (record: RunTimeBasketData) => (
				<Flex flex={1}>
					<Checkbox
						checked={record.selected}
						onChange={() => {
							updateSelection(record.id)
						}}
					/>
				</Flex>
			),
		},
		{
			title: (
				<Flex flex={1} justify="flex-start">
					Name
				</Flex>
			),
			render: (record: RunTimeBasketData) => (
				<Flex flex="1" justify="flex-start">
					<Typography.Text>
						{record.name}
						{record.identifier > 0 ? ` - ${record.identifier}` : ''}
					</Typography.Text>
				</Flex>
			),
			key: 'name',
		},
		{
			title: (
				<Flex flex={1} justify="flex-end">
					Exchange
				</Flex>
			),
			render: (record: RunTimeBasketData) => (
				<Flex flex="1" justify="flex-end">
					<Typography.Text style={{ color: token.colorPrimary }}>
						{record.exchange}
					</Typography.Text>
				</Flex>
			),
			dataIndex: '',
			key: 'exchange',
		},
		{
			title: (
				<Flex flex={1} justify="flex-end">
					Istrument
				</Flex>
			),
			render: (record: RunTimeBasketData) => (
				<Flex flex="1" justify="flex-end">
					<Typography.Text>{record.instrument}</Typography.Text>
				</Flex>
			),
			key: 'identifier',
		},
		{
			title: (
				<Flex flex={1} justify="flex-end">
					Actions
				</Flex>
			),
			dataIndex: '',
			render: (record: RunTimeBasketData) => (
				<Flex gap={'small'} flex={1} justify="flex-end">
					<Button
						shape="circle"
						type="text"
						icon={<FormOutlined />}
						onClick={() => onHandleBasketEdit(record.id)}
					/>
					<Button
						shape="circle"
						type="text"
						icon={<CopyOutlined />}
						onClick={() => onHandleBasketDuplicate(record.name)}
					/>
					<Button
						shape="circle"
						type="text"
						icon={<SnippetsOutlined />}
						onClick={() => onHandleBaskeSave(record.id)}
					/>
					<Button
						shape="circle"
						type="text"
						icon={<DeleteOutlined />}
						onClick={() => onHandleBaskeDelete(record.id)}
					/>
				</Flex>
			),
			key: 'actions',
		},
	]

	return (
		<Flex
			style={{
				overflowY: 'scroll',
				height: '100%',
				padding: token.paddingXS,
			}}
			vertical
		>
			<Table
				scroll={{ y: 'calc(100vh - 165px)' }}
				columns={columns}
				dataSource={runtimeBasketList}
				pagination={false}
			/>
		</Flex>
	)
}

export default Index
