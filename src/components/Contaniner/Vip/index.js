import React ,{ Component} from 'react';
import axios from 'axios'
import { Redirect }from 'react-router-dom';
import './style.css';

class  Vip extends Component{
    // 数据：登录状态，获取数据成功标志
    constructor(props){
        super(props);
        this.state={
            login:true,
            fetchFinish:false
        }
    }
    // 挂载后获取登录状态，并将获取数据成功的标志置为true
    componentDidMount(){
        axios.get('http://www.dell-lee.com/react/api/isLogin.json',{withCredentials:true}).then(res=>{
            this.setState({
                login:res.data.data.login,
                fetchFinish:true
            })
        })

    }

    render(){
        // 登录成功且数据获取成功返回内容
        //登录成功但是数据还没获取，显示正在登录
        //登录没成功直接返回首页
         if(this.state.login){
            if(this.state.fetchFinish){
        return <div className="vip">Welcome</div>
            }else{
                return <div className="vip">正在获取数据，稍后</div>
            }
        }else{
            //重定向
            return <Redirect to='/'/>
        }
    } 
    
}
export default Vip