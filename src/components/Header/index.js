import React,{  Component ,Fragment  }from 'react';
import logo from './logo.png'
import {Link} from 'react-router-dom';
import "./style.css";
import { Menu } from 'antd';
import axios from 'axios';
import { MailOutlined} from '@ant-design/icons';


class AppHeader extends Component{
    // 数据：列表项的内容
    constructor(props){
        super(props);
        this.state={
            list:[]
        }
    }
    //挂载完获取数据
    // 0: {id: 1, icon: "usergroup-delete", title: "VOA慢速英语"}
    // 1: {id: 2, icon: "idcard", title: "VOA常速英语"}
    // 2: {id: 3, icon: "dingding", title: "VOA英文教学"}
    // 3: {id: 4, icon: "google", title: "走遍美国"}
    // 4: {id: 5, icon: "wechat", title: "空中英语教室"}
    // 5: {id: 6, icon: "dribbble", title: "大家说英语"}
    componentDidMount(){
        axios.get('http://www.dell-lee.com/react/api/header.json').then(res=>{
            console.log(res);
            this.setState({
                list:res.data.data
            })
        })
    }

    //放置列表项
    getMenuItems(){
        // 遍历列表项
        return this.state.list.map(item=>{
            return(
                <Menu.Item key={item.id} icon={<MailOutlined/>}>
                    {/* 列表项携带数据的跳转，跳转到对应的列表页 */}
                    <Link to={`/${item.id}`}>
                        {item.title}
                    </Link>
                </Menu.Item>
            )
        })
    }
    

    render(){
        return(
        <Fragment>
            {/* 点击logo回到根目录，也就是首页 */}
            <Link to='/'><img  alt="logo" className="app-header-logo" src={logo}/></Link>
            <Menu mode="horizontal"  className="app-header-menu">
                {this.getMenuItems()}
            </Menu>
        </Fragment>
        )
    }
}

export default AppHeader;