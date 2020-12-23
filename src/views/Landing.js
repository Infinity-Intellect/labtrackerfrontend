import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom'
const styles = {
    root:{
        display:'flex',
        justifyContent:'center',
        alignItems: "center",
        minHeight: "100vh"
    }
}
function Landing() {
    const history = useHistory()
    return (
        <div style={styles.root} >
            <div className="signInButton">
                <Button variant="contained" onClick={()=>{
                    history.push("/home")
                }} color="primary">Sign in</Button>
            </div>
        </div>
    )
}
export default Landing