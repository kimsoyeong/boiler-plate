import { Menu } from 'antd';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../../_actions/user_action';


function RightMenu(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const user = useSelector(state => state.user);

  const logoutHandler = () => {
    dispatch(logoutUser())
        .then(response => {
            if(response.payload.success) {
                navigate('/login');
            } else {
                alert('Log Out Failed...');
            }
        });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default RightMenu;