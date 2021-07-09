import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import { BrowserRouter } from 'react-router-dom';
// import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';

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


 class Login1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {userName: '',
                  userPassword:'',
                  userPasswordAgain:'',
                  phoneNumber:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value =target.value;
   /* if(target.name=="userPasswordAgain"){

      if(value==this.state.userPassword){
        this.setState({ userPasswordAgain: value });
      
    }
      else 
      alert('密码不一致！请检查密码');
    }
    */
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    alert(  this.state.userName + '，恭喜您注册成功!');
    this.props.history.push('/showallquestionnaire');
    event.preventDefault();
  }




render(){
    return (

      <div>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
          
          </Grid>
          <form onSubmit={this.handleSubmit}>
          <Grid container direction="column"  justify="center" alignItems="center">
            <TextField id="userNameLogin" label="请输入用户名"  onChange={this.handleChange}></TextField>
            <TextField id="userPasswordLogin" label="请输入密码"  onChange={this.handleChange}></TextField>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
             
            >
              登录
            </Button>
            <Button href="http://localhost:3000/src/pages/Register/jsx/Register" type="primary">
               注册新账号
            </Button>
            <Link to="/src/pages/Login/jsx/ResetPassword">忘记密码 </Link>
            </Grid>
          </form>
        </Grid>
      </div>


    )


  
}

}

export default Login1