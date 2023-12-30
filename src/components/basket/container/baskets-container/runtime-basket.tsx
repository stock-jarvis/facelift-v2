import {
	Flex,
	theme,
	Table,
	Button,
	Checkbox,
	Typography,
	Tooltip,
	Empty,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import {
	FormOutlined,
	DeleteOutlined,
	CopyOutlined,
	SnippetsOutlined,
} from '@ant-design/icons'
import BasketNav from '../basket-nav'

import { useBasketStore } from '../../store/basket-store'
import { generateUniqueId } from '../../utils/randomizer'
import { SavedBasketsObject } from '../../types/types'

const Index = () => {
	const { token } = theme.useToken()

	const {
		selectedBaskets,
		runtimeBasketList,
		setRuntimeError,
		toogleEditModal,
		selectAllBaskets,
		setEditableBasket,
		updateRuntimeError,
		addToStoredBaskets,
		addNewRuntimeBasket,
		deleteRuntimeBasket,
		toggleSetBasketModalOpen,
		addBasketToSelectedBaskets,
	} = useBasketStore()

	const onHandleBasketEdit = (id: string) => {
		setEditableBasket(id, 'runtime')
		updateRuntimeError(id)
		toogleEditModal(true)
	}

	const onHandleBasketDuplicate = (id: string, name: string) => {
		const duplicateBasket = runtimeBasketList.filter(
			(basket) => basket.name === name
		)
		if (duplicateBasket[duplicateBasket.length - 1]) {
			addNewRuntimeBasket({
				...duplicateBasket[
					duplicateBasket.findIndex((basket) => basket.id === id)
				],
				key: generateUniqueId(),
				id: generateUniqueId(),
				identifier: duplicateBasket[duplicateBasket.length - 1].identifier + 1,
			})
		}
	}

	const onHandleBaskeSave = (id: string) => {
		const basket = runtimeBasketList.find((b) => b.id === id)
		if (basket) {
			if (basket.positions && basket.entryCondition) {
				addToStoredBaskets(id)
			} else {
				setRuntimeError(id)
			}
		}
	}

	const onHandleBaskeDelete = (id: string) => {
		deleteRuntimeBasket(id)
	}

	const handleIndividualSelectChange = (id: string) => {
		addBasketToSelectedBaskets(id)
	}

	const selectAllBasket = () => {
		selectAllBaskets()
	}
	const columns = [
		{
			title: (
				<Flex flex={1}>
					<Checkbox
						checked={selectedBaskets.length === runtimeBasketList.length}
						onChange={selectAllBasket}
					/>
				</Flex>
			),
			dataIndex: '',
			render: (record: SavedBasketsObject) => (
				<Flex flex={1} key={record.id}>
					<Checkbox
						checked={
							selectedBaskets.find((b) => b.id === record.id) ? true : false
						}
						onChange={() => {
							handleIndividualSelectChange(record.id)
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
			render: (record: SavedBasketsObject) => (
				<Flex flex="1" justify="flex-start" key={record.id + record.name}>
					<Typography.Text
						style={{
							color: record.error ? token.colorError : '#000',
						}}
					>
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
			render: (record: SavedBasketsObject) => (
				<Flex flex="1" justify="flex-end" key={record.id + record.exchange}>
					<Typography.Text
						style={{
							color: record.error ? token.colorError : token.colorPrimary,
						}}
					>
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
			render: (record: SavedBasketsObject) => (
				<Flex flex="1" justify="flex-end" key={record.id + record.ticker}>
					<Typography.Text
						style={{
							color: record.error ? token.colorError : '#000',
						}}
					>
						{record.ticker}
					</Typography.Text>
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
			render: (record: SavedBasketsObject) => (
				<Flex
					gap={'small'}
					flex={1}
					justify="flex-end"
					key={record.id + generateUniqueId()}
				>
					<Tooltip title="Edit">
						<Button
							shape="circle"
							type="text"
							icon={<FormOutlined />}
							onClick={() => onHandleBasketEdit(record.id)}
							style={{
								color: record.error ? token.colorError : '',
							}}
						/>
					</Tooltip>
					<Tooltip title="Duplicate">
						<Button
							shape="circle"
							type="text"
							icon={<CopyOutlined />}
							onClick={() =>
								onHandleBasketDuplicate(record.id, record.name || '')
							}
							style={{
								color: record.error ? token.colorError : '',
							}}
						/>
					</Tooltip>
					<Tooltip title="Save">
						<Button
							shape="circle"
							type="text"
							icon={<SnippetsOutlined />}
							onClick={() => onHandleBaskeSave(record.id)}
							style={{
								color: record.error ? token.colorError : '',
							}}
						/>
					</Tooltip>
					<Tooltip title="Delete">
						<Button
							shape="circle"
							type="text"
							icon={<DeleteOutlined />}
							onClick={() => onHandleBaskeDelete(record.id)}
							style={{
								color: record.error ? token.colorError : '',
							}}
						/>
					</Tooltip>
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
			flex="1"
			vertical
		>
			{runtimeBasketList.length > 0 ? (
				<>
					<Flex>
						<BasketNav />
					</Flex>

					<Table
						scroll={{ y: 'calc(100vh - 175px)' }}
						columns={columns}
						dataSource={runtimeBasketList}
						pagination={false}
					/>
				</>
			) : (
				<Flex justify="center" flex={1} align="center" vertical gap="large">
					<Empty />
					<Button
						type="primary"
						icon={<PlusOutlined />}
						onClick={() => toggleSetBasketModalOpen(true)}
					>
						Add New Basket
					</Button>
				</Flex>
			)}
		</Flex>
	)
}

export default Index
