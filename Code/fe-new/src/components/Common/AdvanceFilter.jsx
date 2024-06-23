import React from 'react'
import { Input, Select, Tabs } from 'antd'
import { inject, observer } from 'mobx-react'
import { ASSIGNEE_TYPE, PROPOSAL_STATUS, RISK_TYPE } from '../../constants'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import ProposalAdvanceInputFilter from '../../pages/ProposalAdvancePage/ProposalAdvanceInputFilter'
import { SearchBar } from '../../pages/UserAccountManagementPage/UserAcountManagementPageStyled'

const { TabPane } = Tabs
const { Search } = Input
const { Option } = Select
const AdvanceFilter = props => {
  const { store, proposalAdvanceStore } = props
  const location = useLocation()
  const queryStringParse = queryString.parse(location.search)
  const onChangeTab = key => {
    store.setQueryParams('filterPage', 0)
    store.setQueryParams('type', key ? key : RISK_TYPE.DELEGATE)
  }
  const tabKeys = [RISK_TYPE.DELEGATE, RISK_TYPE.UNIT, RISK_TYPE.AGENCY]
  const tabName = tabKey => {
    switch (tabKey) {
      case RISK_TYPE.DELEGATE:
        return 'Người đại diện phần vốn'
      case RISK_TYPE.UNIT:
        return 'Đơn vị phụ thuộc'
      case RISK_TYPE.AGENCY:
        return 'Cơ quan văn phòng'
      default:
        return 'other'
    }
  }

  return (
    <>
      <Tabs
        defaultActiveKey={queryStringParse.type|| RISK_TYPE.DELEGATE}
        onChange={onChangeTab}>
        {tabKeys.map(tabkey => (
          <TabPane tab={tabName(tabkey)} key={tabkey} />
        ))}
      </Tabs>
      <div
        style={{
          display: 'flex',
          gap: 10,
          marginBottom: 14,
        }}>
        <SearchBar>
            <Search
              allowClear
              // onSearch={userStore.changeUserListKeyword}
              placeholder={'Tìm kiếm phiếu rủi ro...'}
            />
          </SearchBar>
        <Select
          style={{ minWidth: '170px' }}
          name={'proposal_status'}
          placeholder={'-- Lọc theo trạng thái --'}
          allowClear
          onChange={() => {}}>
          <Option value={PROPOSAL_STATUS.PENDING}>Chờ phê duyệt</Option>
          <Option value={PROPOSAL_STATUS.APPROVAL}>Đã phê duyệt</Option>
          <Option value={PROPOSAL_STATUS.REJECT}>Từ chối</Option>
        </Select>
      </div>
    </>
  )
}

AdvanceFilter.propTypes = {}

export default inject('riskStore')(observer(AdvanceFilter))
