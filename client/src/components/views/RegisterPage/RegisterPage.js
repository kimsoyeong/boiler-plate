import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../_actions/user_action';
import { Button, Input } from 'antd';

function RegisterPage( props ) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Name, setName] = useState("");
    const [LastName, setLastName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [Confirm, setConfirm] = useState(false);

    let navigate = useNavigate();

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }

    const onLastNameHandler = (event) => {
        setLastName(event.currentTarget.value);
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);

        if(ConfirmPassword !== event.currentTarget.value) {
            setConfirm(false)
        } else {
            setConfirm(true)
        }
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);

        if(Password !== event.currentTarget.value) {
            setConfirm(false)
        } else {
            setConfirm(true)
        }
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            email: Email,
            name: Name,
            password: Password,
            lastname: LastName,
        }

        dispatch(registerUser(body))
        .then(response => {
            if(response.payload.success) {
                navigate('/login');
            } else {
                alert('Failed to sign up...');
            }
        });
    }


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
                        width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <Input
                    id="email" 
                    placeholder="Enter your Email" 
                    type="email" 
                    value={ Email }
                     onChange={onEmailHandler} 
                />

                <label>Name</label>
                <Input
                    id="name" 
                    placeholder="Enter your name"
                    type="text" 
                    value={ Name } 
                    onChange={onNameHandler}
                />
                <label>Last Name</label>
                <Input
                    id="lastname" 
                    placeholder="Enter last name"
                    type="text" 
                    value={ LastName } 
                    onChange={onLastNameHandler}
                />

                <label>Password</label>
                <Input 
                    id="password"
                    placeholder="Enter your password"
                    type="password" 
                    value={ Password }
                    onChange={onPasswordHandler} 
                />

                <label>Confirm Password</label>
                <Input
                    id="confrimPassword"
                    placeholder="Confrim your Password"
                    type="password" 
                    value={ ConfirmPassword } 
                    onChange={onConfirmPasswordHandler} 
                />

                {Confirm ?
                    (<span style={{ color: 'green' }}>Matched!!</span>) : (<span style={{ color: 'red' }}>Not match!</span>)
                }

                <br />
                <Button type="primary" htmlType="submit" className="register-form-button" style={{ minWidth: '100%' }}>
                    Register
                </Button>
            </form>
        </div>
    );      
}

export default RegisterPage;