import React,{ useEffect,useState  } from 'react';
import { Table, Divider, Tag,Card,Icon } from 'antd';
import request from 'umi-request';
import styles from './index.css';

const { Column, ColumnGroup } = Table;

const data = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];


const Block: React.FC = () => {

  // let state = {
  //   data: [],
  //   pagination: {},
  //   loading: false,
  // };
  const [data,setData] = useState([]);
  const [pagination,setPagination] = useState({current:1,pageSize:10,showQuickJumper:true,showSizeChanger:true});
  const [loading,setLoading] = useState(false);

  useEffect(()=> {
    fetch({pageIndex:pagination.current-1,pageSize:pagination.pageSize,sortField:'',sortOrder:''});
  },[pagination]);

  const fetch = (params = {}) => {
    console.log('params:', params);
    setLoading(true);

    request.get('/user', {
      params
    }).then(function(response) {
      const result = response.result;
      console.log(result);
      setData(result.data);
      setLoading(false);
    }).catch(function(error) {
      console.log(error);
      setLoading(false);
    })

  };

  const statusFilter = (text: any, record : unknown, index: number) => {
    switch (text) {
      case 0:
        return "否";
      case 1:
        return "是";
    }
  };


  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setPagination(pagination);
  };

  return (
    <Card>
      <Table dataSource={data} loading={loading} pagination={pagination} onChange={handleTableChange} rowKey="id" size="middle" bordered >
        <Column title="姓名" dataIndex="name" width="40%"/>
        <Column title="用户名" dataIndex="username" width="30%"/>
        <Column title="是否启用" dataIndex="status" render={statusFilter} width="30%" />
        <Column title="操作" key="operation" fixed='right' width="80px" render={() =><div style={{textAlign:'center'}}><Icon type="edit" title="编辑" style={{cursor:'pointer'}}/></div>}/>
      </Table>
    </Card>
  );
};

export default Block;
