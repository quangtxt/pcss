import React, {
  memo,
  useCallback,
  useEffect,
  useState,
  useContext,
} from "react";
import { Button, Pagination, Input, Space } from "antd";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { TableBottomPaginationBlock } from "../../../components/Common/Table";
import ContentBlockWrapper from "../../../components/ContentBlockWrapper";
import PageTitle from "../../../components/PageTitle";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ForContent, TableSupervisors } from "./ListSupervisorsPageStyled";
import TableComponent from "../../../components/Common/TableComponent";
import { StoreContext } from "../../../App";
import { useNavigate, useLocation } from "react-router-dom";

const { Search } = Input;

const ListSupervisorsPage = (props) => {
  const { loadingAnimationStore, supervisorStore, currentUser } =
    useContext(StoreContext);

  const {
    mentorListTotalCount,
    mentorListPageSize,
    mentorListPageIndex,
    setFilter,
  } = supervisorStore;
  const [mentorList, setMentorList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    (async () => {
      loadingAnimationStore.setTableLoading(true);
      const response = await supervisorStore.getMentorList().finally(() => {
        loadingAnimationStore.setTableLoading(false);
      });
      setMentorList(response.data.data);
      return () => {
        supervisorStore.clearStore();
      };
    })();
  }, [currentUser]);
  const onSearchByEmailOrName = async (keyword) => {
    setFilter("mentorListPageIndex", 0);
    setFilter("mentorListKeyword", keyword);
    loadingAnimationStore.setTableLoading(true);
    const rep = await supervisorStore
      .getMentorList()
      .finally(loadingAnimationStore.setTableLoading(false));
    setMentorList(rep.data.data);
  };

  const onChangePagination = async (e) => {
    setFilter("mentorListPageIndex", e - 1);
    loadingAnimationStore.setTableLoading(true);
    const rep = await supervisorStore
      .getMentorList()
      .finally(loadingAnimationStore.setTableLoading(false));
    setMentorList(rep.data.data);
  };

  const columns = [
    {
      title: "No.",
      render: (record, index, dataSource) => dataSource + 1,
    },
    {
      title: "Full Name",
      render: (record) => record?.user.name,
    },
    {
      title: "Email",
      render: (record) => record?.user.email,
    },
    {
      title: "Action",
      render: (record) => (
        <Button onClick={() => navigateToDetail(record?.user.id)}>View</Button>
      ),
    },
  ];
  function navigateToDetail(userId) {
    navigate(`/registration/supervisors/detail/${userId}`);
    // setIsVisiblePopup(true);
  }
  return (
    <HelmetProvider>
      <DashboardLayout>
        <Helmet>
          <title>Registration | List Supervisors</title>
        </Helmet>
        <PageTitle location={location}></PageTitle>
        <ContentBlockWrapper>
          <TableSupervisors>
            <div className="searchSupervisors">
              <p>FE Email Or Name:</p>
              <Search
                allowClear
                placeholder={"FE Email or Name"}
                className="searchInput"
                onSearch={onSearchByEmailOrName}
              />
            </div>
            <TableComponent
              rowKey={(record) => record.id}
              dataSource={mentorList}
              columns={columns}
              pagination={false}
              loading={loadingAnimationStore.tableLoading}
            />
          </TableSupervisors>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              padding: "15px 0",
            }}
          >
            <Pagination
              onChange={(e) => onChangePagination(e)}
              hideOnSinglePage={true}
              total={mentorListTotalCount}
              pageSize={mentorListPageSize}
              current={mentorListPageIndex + 1}
              showSizeChanger={false}
              showLessItems
            />
          </div>
        </ContentBlockWrapper>
        {/* <PopupViewDetail
        isVisiblePopup={isVisiblePopup}
        setIsVisiblePopup={setIsVisiblePopup}
        handleClosePopup={() => setIsVisiblePopup(false)}
      /> */}
      </DashboardLayout>
    </HelmetProvider>
  );
};
export default ListSupervisorsPage;
