import { FaCode } from "react-icons/fa";


function LandingPage( props ) {

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
