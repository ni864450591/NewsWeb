import React,{Component} from "react";
import {List} from 'antd';
import {Link} from 'react-router-dom';
import './style.css';
import axios from 'axios';


class PageList extends Component {
    // 数据：列表项的内容
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }
   
    render(){
        return(
          
            <List
                className="content-list"
                bordered
                dataSource={this.state.data}
                renderItem={item=>(
                    <List.Item>
                        <Link  to={`/detail/${item.id}`}> {item.title}</Link> 
                    </List.Item>
                )}
                />
            )    
    }
    // 挂载完初始化首页的数据
    componentDidMount(){        
        axios.get('http://www.dell-lee.com/react/api/list.json').then(res=>{
            this.setState({data:res.data.data})
    })
    }
    // 更新得重新获取数据，得根据列表头传来的id，如果没传，就回到首页
   componentWillReceiveProps(){
    let url='http://www.dell-lee.com/react/api/list.json';
    let id=this.props.match.params.id;
    if(id){
        url=url+'?id='+id;
    }
    axios.get(url).then(res=>{
  
            this.setState({data:res.data.data})
   })
    }
}
export default PageList;
