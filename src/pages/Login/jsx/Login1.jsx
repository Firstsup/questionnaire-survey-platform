import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {Link} from "react-router-dom";
import AccountCircle from '@material-ui/icons/AccountCircle';
// import { BrowserRouter } from 'react-router-dom';
// import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import '../css/Login.css';
import Background from '../picture/LoginPicture.jpg';
/*登录页面：
与后端交互：判断用户名 userName，密码 userPassword是否一致
                                  对应的接口：

                                todo:点击忘记密码按钮，跳转到忘记密码页面，输入正确的用户名和密码凭证，屏幕输出该用户密码or可以输入新密码来替换旧密码(待讨论)。
                                         用户小图标出现在奇怪的地方。
                                  */

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
var sectionStyle = {
    width: "100%",
    height: "950px",
    backgroundImage: `url(${Background})`
};


class Login1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userNameLogin: '',
            userPasswordLogin: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        const params = {
            "user": this.state.userNameLogin,
            "pwd": this.state.userPasswordLogin,
        };
        fetch('/api/login', {
            method: 'post',
            body: JSON.stringify(params),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
            .then(res => {
                console.log(res.code)
                if (res.code === 1) {
                    this.props.history.push('/showallquestionnaire')
                    alert(this.state.userNameLogin + '，恭喜您登录成功!');
                } else if (res.code === 0) {
                    alert("用户不存在")
                } else {
                    alert("密码不正确，请重新输入")
                }
            })
    }


    render() {
        return (

            <div style={sectionStyle}>

                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>

                    </Grid>
                    <form onSubmit={this.handleSubmit} className={"loginform"}>
                        <Grid container direction="column" justify="center" alignItems="center" className="logininner">
                            <br/>

                            <TextField name="userNameLogin" label="请输入用户名" fullWidth
                                       onChange={this.handleChange}></TextField>
                            <br/>
                            <br/>
                            <TextField name="userPasswordLogin" label="请输入密码" fullWidth
                                       onChange={this.handleChange}></TextField>
                            <br/>
                            <Button
                                type="submit"
                                size="large"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                登录
                            </Button>
                            <br/>
                            <Button href="http://localhost:3000/Register" size="large"
                                    variant="text"
                                    color="primary">
                                注册新账号
                            </Button>

                            <Button href="http://localhost:3000/ResetPassword" size="large"
                                    variant="text"
                                    color="primary">
                                忘记密码
                            </Button>

                        </Grid>
                    </form>
                </Grid>
            </div>


        )


    }

}

export default Login1