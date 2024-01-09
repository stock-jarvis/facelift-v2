import { Flex, theme, Table, Button, Typography, Tooltip } from 'antd'
import type { TableRowSelection } from 'antd/es/table/interface'
import type { ColumnsType } from 'antd/es/table'
import {
	FormOutlined,
	DeleteOutlined,
	CopyOutlined,
	SnippetsOutlined,
} from '@ant-design/icons'
import BasketNav from '../basket-nav'
import EmptyIndicator from '../common/empty-indicator'
import { useBasketStore } from '../../store/basket-store'
import { SavedBasket, EditType } from '../../types/types'
import { checkDuplicate } from '../../utils/duplicate-check'
const Index = () => {
	const { token } = theme.useToken()
	const {
		runtimeBasketList,
		setRuntimeError,
		selectAllBaskets,
		setEditableBasket,
		updateRuntimeError,
		addToSavedBasket,
		addNewRuntimeBasket,
		deleteRuntimeBasket,
		addBasketToSelectedBaskets,
	} = useBasketStore()

	const handleBasketEdit = (id: string) => {
		setEditableBasket(id, EditType.RUNTIME)
		updateRuntimeError(id)
	}

	const handleBasketDuplicate = (id: string, name: string) => {
		const isDuplicate = checkDuplicate(runtimeBasketList, id, name)
		addNewRuntimeBasket(isDuplicate!)
	}

	const handleBaskeSave = (id: string) => {
		const basket = runtimeBasketList.find((b) => b.id === id)
		if (basket) {
			if (basket.positions && basket.entryCondition) {
				addToSavedBasket(id)
			} else {
				setRuntimeError(id)
			}
		}
	}

	const handleBaskeDelete = (id: string) => {
		deleteRuntimeBasket(id)
	}

	const rowSelection: TableRowSelection<SavedBasket> = {
		onSelect: (record) => {
			addBasketToSelectedBaskets(record.id)
		},
		onSelectAll: () => {
			selectAllBaskets()
		},
	}

	const columns: ColumnsType<SavedBasket> = [
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
			key: 'instrument',
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
							onClick={handleBasketEdit.bind(this, record.id)}
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
							onClick={handleBasketDuplicate.bind(
								this,
								record.id,
								record.name!
							)}
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
							onClick={handleBaskeSave.bind(this, record.id)}
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
							onClick={handleBaskeDelete.bind(this, record.id)}
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
				rowSelection={rowSelection}
				style={{ height: '800px' }}
				locale={EmptyIndicator('No Baskets Available')}
				scroll={{ y: 'calc(100vh - 165px)' }}
				columns={columns}
				dataSource={runtimeBasketList}
				pagination={false}
				rowKey="id"
				onChange={() => console.log('hello')}
			/>
		</Flex>
	)
}

export default Index
