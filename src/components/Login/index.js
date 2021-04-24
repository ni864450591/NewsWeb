import React,{Component,Fragment} from "react";
// 按钮，弹窗，输入框，全局提示信息
import {Button,Modal,Input,message} from 'antd';
import axios from 'axios';
// withRouter这样可以使用路由里的内容
import {Link,withRouter } from 'react-router-dom';
import './style.css';


class Login extends Component {
    // 数据：登录状态，弹窗状态，用户名和密码
    constructor(props){
        super(props);
        this.state={
            login:false,
            modal:false,
            user:'',
            password:''
        }

        this.showModal=this.showModal.bind(this);
        this.hideModal=this.hideModal.bind(this);
        this.changeUser=this.changeUser.bind(this);
        this.changePassword=this.changePassword.bind(this);
        this.checkLogin=this.checkLogin.bind(this);
        this.logout=this.logout.bind(this);
    }

    //挂载完获取初始化登录状态为false,另外一个参数是为了维持刷新时不退出登录状态
    componentDidMount(){
        axios.get('http://www.dell-lee.com/react/api/isLogin.json',{withCredentials:true}).then(res=>{
            this.setState({
                login:res.data.data.login
            })
        })

    }
    // 显示弹窗
    showModal(){
        this.setState({
            modal:true
        })
    }
    //隐藏弹窗
    hideModal(){
        this.setState({
            modal:false
        })
    }
    
    //获得用户名，并修改用户名admin
    changeUser(e){
        this.setState({
            user:e.target.value
        })
    }
    //获得密码，并修改密码admin
    changePassword(e){
        this.setState({
            password:e.target.value
        })
    }
    //判断登录状态
        checkLogin(){
            
            const {user,password}=this.state;
            const url=`http://www.dell-lee.com/react/api/login.json?user=${user}&password=${password}`;
            axios.get(url,{withCredentials:true}).then(res=>{
                //用户名和密码均正确时返回true，其他均返回false
                const login=res.data.data.login;
                if(login){
                    //提升登录成功
                    message.success("登录成功");
                    //显示退出按钮和关闭弹窗
                    this.setState({
                        login:true,
                        modal:false,
                    })
                }else{
                    message.error("登录失败");
                }
            })

        }
    //判断登出状态
    logout(){
        axios.get('http://www.dell-lee.com/react/api/logout.json',{withCredentials:true}).then(res=>{
            //成功登出返回true
           const logout=res.data.data.logout;
           if(logout){
               this.setState({
                   login:false
               })
           }
           //退出后返回根目录
          this.props.history.push("/");  //回到根目录
        })
    }
    render(){
        return(
            <Fragment>   
                        {/*  判断显示哪个按钮*/}
                <div className="login-button">
                    {this.state.login?
                    <Button 
                    type="primary"
                    onClick={this.logout}
                    >退出</Button>:
                    <Button
                     type="primary"
                     onClick={this.showModal}
                     >登陆</Button>
                    }
                    <Link to="/vip">
                        <Button
                        className="Vip"
                        type="primary"
                        >VIP</Button>
                   </Link>
                   {/* 弹窗的设置 */}
                    <Modal title="登陆" visible={this.state.modal} onOk={this.checkLogin} onCancel={this.hideModal}>
                        <Input 
                        placeholder="请输入用户名"  
                        className="user-input"
                        value={this.state.user}
                        onChange={this.changeUser}
                        />
                        <Input 
                        placeholder="请输入密码"  
                        type="password"
                        value={this.state.password}
                        onChange={this.changePassword}
                        />
                    </Modal>
                </div>
            </Fragment> 
            ) 
    }
}
export default  withRouter(Login);