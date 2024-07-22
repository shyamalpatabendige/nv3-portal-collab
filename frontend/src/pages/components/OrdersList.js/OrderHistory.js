import { Table, Modal } from 'antd';
import { useEffect, useState } from 'react';
import OrderNotFound from './OrderNotFound';
import { getAllProduct } from '../../manageServices/services';
import { viewProductIdFunc } from '../../../redux/generalSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import OrderSubmitted from '../../OrderSubmitted';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const OrderHistory = () => {

 // const [dataFound, setDataFound] = useState();
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [rowSelectId, setRowSelectId] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true)
      getAllProduct()
          .then((res) => {
            setDataSource(res.data);
          })
          .catch((err) => {
            const { confirm } = Modal;
                confirm({
                  title: 'Your session has expired.',
                  icon: <ExclamationCircleOutlined />,
                  content: 'To get back in, please login again.',
                  okText: "Login",
                  onOk() {
                    sessionStorage.clear();
                    navigate("/");
                  },
              
                  onCancel() {
                    sessionStorage.clear();
                    navigate("/");
                  },
                });
          })
          .finally(setIsLoading(true))
  }, []);

    const handleRowClick = (record) => {
      return {
          onClick: (ev) => {
              dispatch(viewProductIdFunc(record.id));
              //navigate("/OrderSubmitted");
              setRowSelectId(record.id);
              setVisible(true);
          },
  }
}

    const columns = [
        {
          title: 'Order ID',
          dataIndex: "id",
          sorter: {
            compare: (a, b) => a.chinese - b.chinese,
            multiple: 3,
          },onCell: (record, rowIndex) => {
            return {
                onClick: (ev) => {
                    dispatch(viewProductIdFunc(record.id));
                    //navigate("/OrderSubmitted");
                    setRowSelectId(record.id);
                    setVisible(true);
                },
            };
        },
        },
        {
          title: 'Products Name',
          dataIndex: ['products',[0], 'name'],
          sorter: {
            compare: (a, b) => a.chinese - b.chinese,
            multiple: 3,
          },
          onCell: (record) => handleRowClick(record),
        },
        {
          title: 'Order Status',
          dataIndex: 'status',
          sorter: {
            compare: (a, b) => a.math - b.math,
            multiple: 2,
          },
          onCell: (record) => handleRowClick(record),
        },
        {
          title: 'Order Date',
          dataIndex: 'createdOn',
          sorter: {
            compare: (a, b) => a.english - b.english,
            multiple: 1,
          },
          onCell: (record) => handleRowClick(record),
        },
      ];
      
      const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };

  return (
    <div>
        { dataSource.length  === 0  ? <OrderNotFound /> : (<Table columns={columns} dataSource={dataSource} onChange={onChange}/>)}
        <Modal
          title={"Order information of order number - " + rowSelectId}
          centered
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          width={1000}
          bodyStyle={{height: "80vh", overflowX: 'scroll'}}
      >
        <OrderSubmitted  fromModel={true} />
      </Modal>
    </div>
  )
}

export default OrderHistory