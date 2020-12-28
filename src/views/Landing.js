import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom'
import Header from '../components/Header'
import GoogleLogin from 'react-google-login'
const styles = {
    root:{
        display:'flex',
        justifyContent:'center',
        alignItems: "center",
        minHeight: "80vh",
    }
}
function Landing({isStaff}) {
    const history = useHistory()
    const login = (response)=>{
        if(isStaff)
            history.push('staff/home')
        else
            history.push('home')
    }
    return (
        <div>
            <Header/>
            <div style={styles.root} >
                <GoogleLogin
                    clientId="640502146036-cka0dnokfevuk9h7okin78pl91aijtbq.apps.googleusercontent.com"
                    buttonText="Sign In With Google"
                    onSuccess={login}
                    onFailure={login}
                    theme="dark"
                />
                {/* <Button onClick={login} variant="contained" color="primary">Login</Button> */}
            </div>
        </div>
    )
}
export default Landing