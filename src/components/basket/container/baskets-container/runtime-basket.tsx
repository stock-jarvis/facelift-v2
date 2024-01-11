import { Flex, theme, Table, Typography } from 'antd'
import type { TableRowSelection } from 'antd/es/table/interface'
import type { ColumnsType, TableProps } from 'antd/es/table'
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
import { generateUniqueId } from '../../utils/randomizer'
import Actions, { ActionsButtonProps } from '../common/click-actions'
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

	const actions: ActionsButtonProps[] = [
		{
			handleButtonClick: handleBasketEdit,
			icon: <FormOutlined />,
			tooltipTitle: 'Edit',
		},
		{
			handleButtonClick: handleBasketDuplicate,
			icon: <CopyOutlined />,
			tooltipTitle: 'Duplicate',
		},
		{
			handleButtonClick: handleBaskeSave,
			icon: <SnippetsOutlined />,
			tooltipTitle: 'Save',
		},
		{
			handleButtonClick: handleBaskeDelete,
			icon: <DeleteOutlined />,
			tooltipTitle: 'Delete',
		},
	]

	const columns: ColumnsType<SavedBasket> = [
		{
			key: 'name',
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
		},
		{
			key: 'exchange',
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
		},
		{
			key: 'instrument',
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
		},
		{
			key: 'actions',
			title: (
				<Flex flex={1} justify="flex-end">
					Actions
				</Flex>
			),
			render: (record) => (
				<Flex gap={'small'} flex={1} justify="flex-end">
					{actions.map((action) => (
						<Actions key={generateUniqueId()} {...action} record={record} />
					))}
				</Flex>
			),
		},
	]

	const tableDataProps: TableProps<SavedBasket> = {
		rowKey: 'id',
		columns: columns,
		pagination: false,
		style: { height: '800px' },
		rowSelection: rowSelection,
		dataSource: runtimeBasketList,
		scroll: { y: 'calc(100vh - 165px)' },
		locale: EmptyIndicator('No Baskets Available'),
	}
	return (
		<Flex flex="1" vertical>
			<BasketNav />
			<Table {...tableDataProps} />
		</Flex>
	)
}

export default Index
