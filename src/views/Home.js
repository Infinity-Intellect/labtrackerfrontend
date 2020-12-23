import Button from '@material-ui/core/Button'
const styles={
    root:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'80%',
        margin:"0 auto"
    }
}
function Home() {
    return (
        <div style={styles.root}>
            <div>Home page works!</div>
            <Button variant="contained" color="secondary">Exercise</Button>
        </div>
    )
}
export default Home