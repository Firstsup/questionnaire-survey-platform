import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';



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
    event.preventDefault();
  }



  
    





render(){
    return (

      <div>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <AccountCircle />
          </Grid>
          <form onSubmit={this.handleSubmit}>
            <TextField id="userNameLogin" label="请输入用户名" value={this.state.userName} onChange={this.handleChange}></TextField>
            <TextField id="userPasswordLogin" label="请输入密码" value={this.state.userPassword} onChange={this.handleChange}></TextField>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
             
            >
              登录
            </Button>
          </form>
        </Grid>
      </div>


    )


  
}

}

export default Login1