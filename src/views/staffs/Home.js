import React, {useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Header from '../../components/Header'
import LabCard from '../../components/LabCard'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HistoryIcon from '@material-ui/icons/History'
import ListIcon from '@material-ui/icons/List'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField'

const LAB = [
    {
        lab_name:"Data structures and Algorithms",
        lab_code:"15CS301",
        exer_ids:['1','2'],
        year:"2020"
    },
    {
        lab_name:"Operating systems",
        lab_code:"15CS302",
        exer_ids:['1','2'],
        year:"2020"
    },
    {
        lab_name:"Computer Graphics",
        lab_code:"15CS302",
        exer_ids:['1','2'],
        year:"2020"
    },
]
const PLAB = [
    {
        lab_name:"C Programming",
        lab_code:"15CS301",
        exer_ids:['1','2'],
        year:"2019"
    },
    {
        lab_name:"Operating systems",
        lab_code:"15CS302",
        exer_ids:['1','2'],
        year:"2019"
    },
]

const styles={
    root:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'80%',
        margin:"0 auto"
    },
    cardsGrid:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap'
    },
    inputContainer:{
        marginTop:'4%'
    }
}
function LabFormDialog({open,handleDialogClose,lab,setLab}){
    const handleInputChange = (e)=>{
        setLab({...lab,[e.target.name]:e.target.value})
    }
    return(
        <Dialog open={open} onClose={handleDialogClose} aria-labelledby="form-dialog-title" fullWidth>
        <DialogTitle id="form-dialog-title">Add New Lab</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Year {4}
          </DialogContentText>
          <div style={styles.inputContainer}>
            <TextField
                autoFocus
                margin="dense"
                name="lab_name"
                label="Lab Name"
                value={lab.lab_name}
                onChange={handleInputChange}
                fullWidth
            />
          </div>
          <div style={styles.inputContainer}>
            <TextField
                margin="dense"
                label="Lab Code"
                value={lab.lab_code}
                onChange={handleInputChange}
                name="lab_code"
                fullWidth
            />
          </div>
          <div style={styles.inputContainer}>
            <TextField
            label="Description"
            multiline
            name="lab_description"
            value={lab.lab_description}
            onChange={handleInputChange}
            rows={4}
            variant="outlined"
            fullWidth
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button id="create" onClick={handleDialogClose} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    )
}
function Home({isStaff}) {
    const history = useHistory()
    const [currentLabs,setCurrentLabs] = useState([])
    const [pastLabs,setPastLabs] = useState([])
    const [tabValue,setTabValue] = useState(0)
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [lab,setLab ] =useState({
        lab_name:"",
        lab_description:"",
        lab_code:""
    })
    const openDialog = () => {
        setDialogOpen(true);
        console.log("OPEN DIALOG")
    };

    const handleDialogClose = (e) => {
        if(e.target.innerHTML === "Create"){
            let newCurLabs = currentLabs
            newCurLabs.push(lab)
            setCurrentLabs(newCurLabs)
            setLab({
                lab_name:"",
                lab_description:"",
                lab_code:""
            })
        }
        setDialogOpen(false);
    };
    const handleTabChange = (event,newValue)=>{
        setTabValue(newValue)
    }
    useEffect(()=>{
      setCurrentLabs(LAB)
      setPastLabs(PLAB)
      console.log("Is staff "+isStaff)
    },[])
    return (
        <div>
            <Header/>
            <div style={styles.root}>
                <Paper square>
                    <Tabs
                        value={tabValue}
                        indicatorColor="secondary"
                        textColor="secondary"
                        onChange={handleTabChange}
                    >
                        <Tab label="Current" icon={<ListIcon/>}/>
                        <Tab label="Past" icon={<HistoryIcon/>}/>
                    </Tabs>
                </Paper>
                <div style={styles.cardsGrid}>
                    {tabValue === 0 && ((currentLabs.length>0 && currentLabs.map((lab,idx)=>(
                        <LabCard key={idx} lab={lab} isStudent={!isStaff}/>
                    )))||(currentLabs.length===0 && 
                    <div style={{padding:100}}>
                        No Current Labs !
                    </div>))}
                    {tabValue === 1 && ((pastLabs.length>0 && pastLabs.map((lab,idx)=>(
                        <LabCard key={idx} lab={lab} isStudent={!isStaff}/>
                    )))||(pastLabs.length===0 && 
                    <div style={{padding:100}}>
                        No Past Labs !
                    </div>))}
                    <LabCard openDialog={openDialog}/>
                    {lab&&<LabFormDialog open={dialogOpen} handleDialogClose={handleDialogClose}
                    lab={lab} setLab = {setLab}/>}
                </div>
            </div>
        </div>

    )
}
export default Home