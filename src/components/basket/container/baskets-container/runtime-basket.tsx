import {
	Flex,
	theme,
	Table,
	Button,
	Checkbox,
	Typography,
	Tooltip,
	TableProps,
} from 'antd'

import {
	FormOutlined,
	DeleteOutlined,
	CopyOutlined,
	SnippetsOutlined,
} from '@ant-design/icons'
import BasketNav from '../basket-nav'
import EmptyIndicator from '../common/empty-indicator'
import { useBasketStore } from '../../store/basket-store'
import { generateUniqueId } from '../../utils/randomizer'
import { SavedBasket, EditType } from '../../types/types'

const Index = () => {
	const { token } = theme.useToken()

	const {
		selectedBaskets,
		runtimeBasketList,
		setRuntimeError,
		selectAllBaskets,
		setEditableBasket,
		updateRuntimeError,
		addToSavedBasket,
		addNewRuntimeBasket,
		deleteRuntimeBasket,
		//toggleSetBasketModalOpen,
		addBasketToSelectedBaskets,
	} = useBasketStore()

	const onHandleBasketEdit = (id: string) => {
		setEditableBasket(id, EditType.RUNTIME)
		updateRuntimeError(id)
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
				id: generateUniqueId(),
				identifier: duplicateBasket[duplicateBasket.length - 1].identifier + 1,
			})
		}
	}

	const onHandleBaskeSave = (id: string) => {
		const basket = runtimeBasketList.find((b) => b.id === id)
		if (basket) {
			if (basket.positions && basket.entryCondition) {
				addToSavedBasket(id)
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
	const columns: TableProps<SavedBasket>['columns'] = [
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
			render: (record) => (
				<Flex flex={1}>
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
			render: (record) => (
				<Flex flex="1" justify="flex-start">
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
			render: (record) => (
				<Flex flex="1" justify="flex-end">
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
					Instrument
				</Flex>
			),
			render: (record) => (
				<Flex flex="1" justify="flex-end">
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
			render: (record) => (
				<Flex gap={'small'} flex={1} justify="flex-end">
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
		<Flex flex="1" vertical>
			<Flex>
				<BasketNav />
			</Flex>

			<Table
				style={{ height: '800px' }}
				locale={EmptyIndicator('No Baskets Available')}
				scroll={{ y: 'calc(100vh - 165px)' }}
				columns={columns}
				dataSource={runtimeBasketList}
				pagination={false}
				rowKey="id"
			/>
		</Flex>
	)
}

export default Index
