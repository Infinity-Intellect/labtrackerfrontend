import Button from '@material-ui/core/Button'
import ArrowBack from '@material-ui/icons/ArrowBack'
import {useLocation,useHistory} from 'react-router-dom'
const styles = {
    root:{
        display:'flex',
    },
    child:{
        display:'flex',
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    clickable:{
        cursor:'pointer'
    }
}

function Header(){
    const location = useLocation()
    const history = useHistory()
    const logout = ()=>{
        history.push('/')
    }
    const goBack = ()=>{
        history.goBack()
    }
    return(
        <div style={styles.root}>
            <div style={styles.child} onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}>
                {location.pathname!=="/" && <ArrowBack onClick={goBack}/>}
            </div>
            <div style={styles.child}>
                <h1>Lab Tracker</h1>
            </div>
            <div style={styles.child}>
                {location.pathname!=="/" && <Button variant="contained" onClick={logout}>Logout</Button>}
            </div>
        </div>
    )
}

export default Header