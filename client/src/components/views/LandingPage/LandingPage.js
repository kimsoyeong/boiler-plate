import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCode } from "react-icons/fa";
import { USER_SERVER } from '../../Config.js';


function LandingPage( props ) {
    let navigate = useNavigate();

    useEffect(() => {
        // axios.get('/api/hello')
        // .then(response => console.log(response.data));
    }, []);

    // const onClickHandler = () => {
    //     axios.get( `${USER_SERVER}/logout`)
    //     .then(response => {
    //         if(response.data.success) {
    //             navigate("/login");
    //         } else {
    //             alert("Logout failed");
    //         }
    //     })
    // }

    return (
        <>
            <div className="app" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
                                        width: '100%', height: '100vh'
            }}>
                <FaCode style={{ fontSize: '4rem' }} /><br />
                <span style={{ fontSize: '2rem' }}>Let's Start Coding!</span>
            </div>
            <div style={{ float: 'right' }}>Thanks For Using This Boiler Plate by Soyeong Kim</div>
        </>
    );
}

export default LandingPage;
