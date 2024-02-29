import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/Layout'
import axios from 'axios'
import { Row, Col } from 'antd'
import ItemList from '../components/ItemList'
import { useDispatch } from 'react-redux'

const Home = () => {
    const [items, setItems] = useState([])
    const dispatch = useDispatch()
    const [selecedCategory, setSelecedCategory] = useState("drinks");
    const categories = [
        {
            name: "drinks",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/430/430561.png",
        },
        {
            name: "food",
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq0mzZ_XzvaG-_p-iOSLUPWc1VvHsd-l9-iw&usqp=CAU",
        },
        {
            name: "chinese",
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM4H4YDta9yofsvrjN4U0SsIPOjM9rptBsig&usqp=CAU",
        },
    ];

    useEffect(() => {
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
        getItem()

    }, [])

    return (
        <DefaultLayout>
            <div className='d-flex'>
                {categories.map((category) => (
                    <div key={category.name} className={`d-flex category ${selecedCategory === category.name && "category-active"}`}
                       onClick={()=> setSelecedCategory(category.name)} >
                        <h4>{category.name}</h4>
                        <img src={category.imageUrl} alt={category.name} height="60" width="80" />

                    </div>
                ))}
            </div>
            <Row>
                {
                    items.filter(i => i.category===selecedCategory).map((item) => (
                        <Col xs={24} lg={6} md={12} sm={6} key={item._id}>
                            <ItemList key={item.id} item={item} />
                        </Col>
                    ))

                }
            </Row>
        </DefaultLayout>
    )
}

export default Home
