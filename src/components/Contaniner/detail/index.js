import React,{Component} from "react";
import { Card } from 'antd';
import axios from 'axios';
import './style.css';


class Detail extends Component {
    // 数据：标题和内容
    constructor(props){
        super(props);
        this.state={
            title:"",
            content:"",

        }
    }
    // 根据列表项传来的对应id来设置接口获取对应数据
    componentDidMount(){
        const id=this.props.match.params.id;
        axios.get('http://www.dell-lee.com/react/api/detail.json?id='+id).then(
            res=>{
                const {data:{data}}=res;
                this.setState(data);
            }
        )
    }

    render(){
        return(
            <Card 
            className='detail-content'
             title={this.state.title}
             >
                <div dangerouslySetInnerHTML={{__html:this.state.content}}></div>
          </Card>
            ) 
    }
}
export default Detail;