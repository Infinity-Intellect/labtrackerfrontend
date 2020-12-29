import React, {useState,useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import Header from '../../components/Header'
import ExerciseCard from '../../components/ExerciseCard'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import {
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
const axios = require('axios')

const EXERCISE = [
    {
        exer_no:1,
        title:"Stacks",
        date_of_creation:1608814829000
    },
    {
        exer_no:2,
        title:"Queues",
        date_of_creation:1608814829000
    },
    {
        exer_no:3,
        title:"Linked List",
        date_of_creation:1608814829000
    }
]

const styles = {
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
function ExerciseFormDialog({exerciseNumber,open,handleDialogClose,exercise,setExercise}){
    const [file,setFile] = useState(null)
    const handleInputChange = (e)=>{
        setExercise({...exercise,[e.target.name]:e.target.value})
    }
    const handleFileUploadChange = (e)=>{
        setFile({...file,[e.target.name]:e.target.files[0]})
    }
    const check = ()=>{
        console.log(file)
    }
    return(
        <Dialog open={open} onClose={handleDialogClose} fullWidth>
        <DialogTitle id="form-dialog-title">New Exercise</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Exercise {exerciseNumber}
          </DialogContentText>
          <div style={styles.inputContainer}>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Exercise Name"
                type="email"
                name="title"
                onChange={handleInputChange}
                fullWidth
            />
          </div>
          <div style={styles.inputContainer}>
            <TextField
            label="Description"
            multiline
            rows={4}
            variant="outlined"
            name="prob_stmt"
            onChange={handleInputChange}
            fullWidth
            />
          </div>
          <div style={styles.inputContainer}>
            <div style={{display:'flex',justifyContent:'space-between'}}>
                <div style={{display:'flex',flexDirection:'column'}}>
                    <Button variant="contained" component="label" color="secondary">
                    Upload Input File
                    <input
                        type="file"
                        hidden
                        onChange={handleFileUploadChange}
                        name="inputFile"
                    />
                    </Button>
                    {file&&file.inputFile&&<FileCopyIcon style={{width:80,height:80}} onClick={()=>{
                        window.open(file.inputFile)
                    }} onMouseEnter={(e)=>{e.target.style.cursor = "pointer"}}/>}
                </div>
                <div style={{display:'flex',flexDirection:'column'}}>
                    <Button variant="contained" component="label" color="primary">
                    Upload Output File
                    <input
                        type="file"
                        hidden
                        name="outputFile"
                        onChange={handleFileUploadChange}
                    />
                    </Button>
                    {file&&file.outputFile&&<FileCopyIcon style={{width:80,height:80}} onClick={()=>{
                        window.open(file.outputFile)
                    }} onMouseEnter={(e)=>{e.target.style.cursor = "pointer"}}/>}
                </div>
            </div>
          </div>
          <div style={styles.inputContainer}>
              Deadline (Number of days from today)
             <TextField
             label="Deadline"
             name="timelimit"
             onChange={handleInputChange}
             fullWidth/>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={(e)=>{
              handleDialogClose(e,file)
          }} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    )
}
function Exercise(){
    const [exercises,setExercises] = useState([])
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [exercise,setExercise] = useState({
        exer_no:null,
        title:"",
        date_of_creation:0
    })
    const location = useLocation()
    const openDialog = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = (e,file) => {
        if(e.target.innerHTML === "Create"){
            console.log(exercise)
            

            axios.post(`http://localhost:3002/exercise/addexer`,{...exercise,date_of_creation:Date.now()*1000
        ,labId:location.state.labId,exer_no:exercises.length+1}).then((res)=>{
            console.log(res.data)
                fetchAllExercises()
                const formData = new FormData()
                formData.append('input',file.inputFile,file.inputFile.name)
                formData.append('output',file.outputFile,file.outputFile.name)
                formData.append('exerId',res.data.exerId)
                axios.post(`http://localhost:3002/exercise/uploadFiles`,formData).then((res)=>{
                    console.log(res.data)
                }).catch((err)=>{
                    console.log("Failed To Upload")
                    console.log(err)
                })
            }).catch((err)=>{
                console.log(err)
            })
            setDialogOpen(false)

            setExercise({
                exer_no:null,
                title:"",
                date_of_creation:0
            })
        }
        else if(e.target.innerHTML ==="Cancel"){
            setDialogOpen(false)
        }
        //setDialogOpen(false);
    };  
    const fetchAllExercises = ()=>{
        let labId = location.state.labId
        axios.get(`http://localhost:3002/lab/viewAllExercise`,{
            params:{labId:labId}
        }).then((res)=>{
            console.log(res.data)
            if(res.data.message === "Lab Not Found!"){
                setExercises([])
            }
            else
                setExercises(res.data)
        }).catch((err)=>{
            console.log("Error fetching exercises")
            console.log(err)
        })
    }  
    useEffect(()=>{
        fetchAllExercises()
        // setExercises(EXERCISE)
        setExercise({...exercise,exer_no:exercises.length+1})
    },[])
    return(
        <div>
            <Header/>
            <div style={styles.root}>
                <div style={styles.cardsGrid}>
                    {exercises.length>0 && exercises.map((exercise,idx)=>(
                        <ExerciseCard key={idx} exercise={exercise} isStudent={false}/>
                    ))}
                    <ExerciseCard openDialog={openDialog}/>
                    <ExerciseFormDialog open={dialogOpen} handleDialogClose={handleDialogClose} 
                    exerciseNumber={exercises.length+1}
                    exercise={exercise} setExercise={setExercise}/>
                </div>
            </div>
        </div>
    )
}
export default Exercise