import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react'
import { USER_PROFILE } from "../../util/config";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Avatar, Form, Button, Input, Modal, Select, Table, Tag } from 'antd';
import { deleteIdProductApi, editProfileApi, getProfileApi } from "../../redux/reducers/userReducer";
import '../../assets/css/pages/profile.scss'
import { getproductfavoriteApi } from "../../redux/reducers/productReducer";
const Profile = () => {
  const dispatch = useDispatch();
  const { userProfile } = useSelector(state => state.userReducer)
  const arrProduct = userProfile.ordersHistory;
  const [form] = Form.useForm();
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
    },
  };

  const columns = [
    {
      title: 'id',
      key: 'id',
      dataIndex: 'id'
    },
    {
      key: 'image',
      title: 'Image',
      dataIndex: 'orderDetail',
      width: 250,
      render: (data) => (
        <>
          {data.map((tag) => {
            return (
              <Avatar.Group>
                <Avatar className="shape-avatar" shape="square" size={80} src={tag.image}></Avatar>
              </Avatar.Group>
            )
          })}
        </>
      ),
    },
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'orderDetail',
      render: (data) => (
        <>
          {data.map((item) => {
            return (
              item.name + ' , '
            )
          })}
        </>
      )
    },
    {
      key: 'price',
      title: 'price',
      dataIndex: 'orderDetail',
      render: (data) => (
        <>
          {data.map((item) => {
            return (
              item.price + ' , '
            )
          })}
        </>
      )
    },
    {
      key: 'quatatity',
      title: 'quatatity',
      dataIndex: 'orderDetail',
      render: (data) => (
        <>
          {data.map((item) => {
            return (
              <Tag color="default">{item.quantity}</Tag>

            )
          })}
        </>
      )
    },
    {
      key: 'total',
      title: 'total',
      dataIndex: 'orderDetail',
      render: (data) => (
        <>
          {data.map((item) => {
            return (
              `${item.price * item.quantity} ` + ' , '
            )
          })}
        </>
      ),
    }, {
      key: 'deletePassword',
      title: 'Action',
      dataIndex: 'id',
      name: 'orderId',
      render: (data) => (
        <>
          <div className="ant-employed d-flex align-items-center justify-content-center">
            <Button name="orderId" className="mx-2 table-action-button" onClick={() => {
              showDeleteConfirm(data)
            }}>
              Delete
            </Button>
          </div>
        </>
      ),
    },
  ];

  const { confirm } = Modal;
  const showDeleteConfirm = (data) => {
    confirm({
      title: "Xóa giỏ hàng",
      icon: <ExclamationCircleFilled />,
      content: `Người dùng: ${data} sẽ bị được xóa? `,
      okText: "Đồng ý",
      okType: "primary",
      cancelText: "Không",
      onOk() {
        const deleteIdProduct = deleteIdProductApi({
          orderId: data
        })
        dispatch(deleteIdProduct)
      },
      onCancel() {
        console.log("Hủy");
      },
    });
  };

  const onSubmit = (values) => {
    const editProfile = editProfileApi(values)
    dispatch(editProfile)
  }

  useEffect(() => {
    const getProfile = getProfileApi()
    if (!USER_PROFILE) {
      dispatch(getProfile)
    }
    form.setFieldsValue(userProfile)
  }, [])


  return (
    <>
      <div className="title-component my-5">
        <h1>Profile</h1>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className=" col-xl-4 col-xs-12 ">
            <div className="avatar avatar-profile m-auto   ">
              <img src={userProfile?.avatar} alt="..." className='w-100'></img>
            </div>
          </div>
          <div className=" col-xl-4 col-xs-12 ">
            <Form layout="vertical" name="basic" form={form} validateMessages={validateMessages} wrapperCol={{ span: 25 }} onFinish={onSubmit}>
              <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
                <Input className='input-form-login' />
              </Form.Item>

              <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
                <Input className='input-form-login' />
              </Form.Item>

              <Form.Item>
                <button className="edit-button-profile mt-3" type="submit"> Update </button>
              </Form.Item>
            </Form>
          </div>
          <div className=" col-xl-4 col-xs-12 ">
            <Form layout="vertical" name="basic" form={form} validateMessages={validateMessages} wrapperCol={{ span: 25 }} onFinish={onSubmit}>
              <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                <Input className='input-form-login' />
              </Form.Item>

              <Form.Item label="Password" name="newPassword" >
                <Input.Password id="password" className='input-form-login' />
              </Form.Item>

              <Form.Item name="gender" label="Gender" hasFeedback >
                <Select placeholder="Please select gender">
                  <Select.Option value={false}>Male</Select.Option>
                  <Select.Option value={true}>Female</Select.Option>
                </Select>
              </Form.Item>
            </Form>
          </div>
        </div>
        <hr />
        <div>
          <ul className="nav chose nav-tabs" id="myTab" role="tablist">
            <button className="nav-link active chose-item" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true"><h1>Order history</h1></button>
            <button className="nav-link chose-item" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false"><h1>Favourite</h1></button>

          </ul>
          <div className="tab-content">
            <div className="tab-pane active" id="home" role="tabpanel" aria-labelledby="home-tab">
              <div className="product-table">
                <p className="title-table mb-0">+ Orders have been placed on 09 - 19 - 2020</p>
                <Table columns={columns} dataSource={arrProduct} />
              </div>
            </div>
            <div className="tab-pane " id="profile" role="tabpanel" aria-labelledby="profile-tab">
              <Table columns={columns}></Table>
            </div>
          </div>
        </div>


        {/* <div className="chose d-flex mb-5">
          <button className="chose-item me-3"><h1>Order history</h1></button>
          <button className="chose-item"><h1>Favourite</h1></button>
        </div>
        <div className="product-table">
          <p className="title-table mb-0">+ Orders have been placed on 09 - 19 - 2020</p>
          <Table columns={columns} dataSource={arrProduct} />
        </div> */}
      </div>
    </>
  )
}
export default Profile;
