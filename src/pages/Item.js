import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/Layout'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Form, Input, Modal, Select, Table, message } from 'antd'

const Item = () => {
  const [items, setItems] = useState([])
  const dispatch = useDispatch()
  const [popupModel, setPopupModel] = useState(false)
  const [editItem, setEditItem] = useState(null)



  const getItem = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING"
      })
      const { data } = await axios.get('/api/items/get-item')
      setItems(data.data)
      dispatch({
        type: "HIDE_LOADING"
      })

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {

    getItem()

  }, [])

  const handleDelete = async (record) => {
    try {
      dispatch({ type: "SHOW_LOADING" })
     const res =  await axios.post('/api/items/delete-item', { itemId: record._id })
      message.success("Item Delete Successfully")
      getItem()
      dispatch({ type: "HIDE_LOADING" })

    } catch (error) {
      console.log(error)
      message.error("something went wrong")
    }
  }


  

  const columns = [
    { title: "Name", dataIndex: 'name' },
    {
      title: "Image", dataIndex: 'image',
      render: (image, record) => <img src={image} alt={record.name} height="60" width="60" />
    },
    { title: "Price", dataIndex: 'price' },
    {
      title: "Actions", dataIndex: '_id', render: (id, record) => <div>
        <EditOutlined
          style={{ cursor: "pointer" }}
          onClick={() => {
            setEditItem(record);
            setPopupModel(true);
          }}
        />
        <DeleteOutlined
          style={{ cursor: "pointer" }}
          onClick={() => handleDelete(record)}
        />
      </div>
    }
  ]

  const handleSubmit = async (value) => {
    if (editItem === null) {
      try {
        dispatch({ type: "SHOW_LOADING" })
        const res = await axios.post('/api/items/add-item', value)
        message.success("Item Added successfully")
        getItem()
        setPopupModel(false)
        console.log(res)
        dispatch({ type: "HIDE_LOADING" })


      } catch (error) {
        message.error('Something Went Wrong')
        console.log(error)
      }
    } else {
      try {
        dispatch({ type: "SHOW_LOADING" })
        const res = await axios.put('/api/items/edit-item', { ...value, itemId: editItem._id })
        message.success("Item Update successfully")
        getItem()
        setPopupModel(false)
        console.log(res)
        dispatch({ type: "HIDE_LOADING" })
      } catch (error) {
        message.error('Something Went Wrong')
        console.log(error)
      }
    }
  }

  return (
    <DefaultLayout>
      <div className='d-flex justify-content-between'>
        <h1>Item Page</h1>
        <Button type='primary' onClick={() => setPopupModel(true)}>Add Item</Button>
      </div>
      <Table columns={columns}  dataSource={items} bordered />
      {popupModel && (
        <Modal title={`${editItem !== null ? "Edit Item" : "Add New Item"}`}
          visible={popupModel} onCancel={() => { setPopupModel(false); setEditItem(null) }} footer={false}>
          <Form layout='vertical' initialValues={editItem} onFinish={handleSubmit}>
            <Form.Item name="name" label='Name'>
              <Input />
            </Form.Item>

            <Form.Item name="price" label='Price'>
              <Input />
            </Form.Item>

            <Form.Item name="image" label='Image URL'>
              <Input />
            </Form.Item>

            <Form.Item name='category' label='Cateory'>
              <Select>
                <Select.Option value='drinks'>Drinks</Select.Option>
                <Select.Option value='food'>Food</Select.Option>
                <Select.Option value='chinese'>Chinese</Select.Option>
              </Select>
            </Form.Item>

            <div className='d-flex justify-content-end'>
              <Button type='primary' htmlType='submit'>Save</Button>
            </div>

          </Form>
        </Modal>
      )}
    </DefaultLayout>
  )
}

export default Item
