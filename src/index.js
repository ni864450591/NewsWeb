import React ,{ Component ,Fragment }  from 'react';
import ReactDom from 'react-dom';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
//switch 匹配到了就不会再匹配了
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import { Layout } from 'antd';


import AppHeader from './components/Header';
import List from './components/Contaniner/list';
import Detail from './components/Contaniner/detail';
import Login from './components/Login';
import Vip from  './components/Contaniner/Vip';

import './style.css';

const { Header, Footer,  Content } = Layout;

class APP extends Component{
    render(){
        return (
            // 占位符
            <Fragment>
                {/* 移动外面是为了容纳link */}
                  <BrowserRouter>
                        <Layout className="Layout">
                            {/* 头部组件 */}
                                <Header className="Header"><AppHeader/></Header>
                                {/* 登录组件 */}
                                <Login/>
                                {/* 页面组件 */}
                                <Content className="Content">
                                        <Switch>
                                            <Route path="/vip" component={Vip}   />
                                            <Route path="/detail/:id" component={Detail} />
                                            <Route path="/:id?" component={List}/>
                                        </Switch>
                                </Content>
                                <Footer className="Footer">@xiaoni</Footer>
                        </Layout>
                </BrowserRouter>
           </Fragment>
        )
    }
}
// 挂载
ReactDom.render(<APP/>,document.getElementById('root'));