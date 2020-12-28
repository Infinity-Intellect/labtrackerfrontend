import React, {useState,useEffect} from 'react'
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
    const [image,setImage] = useState(null)
    const handleInputChange = (e)=>{
        setExercise({...exercise,[e.target.name]:e.target.value})
    }
    const handleImageInputChange = (e)=>{
        setImage({...image,[e.target.name]:URL.createObjectURL(e.target.files[0])})
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
            name="exer_description"
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
                        onChange={handleImageInputChange}
                        name="inputFile"
                    />
                    </Button>
                    {image&&image.inputFile&&<FileCopyIcon style={{width:80,height:80}} onClick={()=>{
                        window.open(image.inputFile)
                    }} onMouseEnter={(e)=>{e.target.style.cursor = "pointer"}}/>}
                </div>
                <div style={{display:'flex',flexDirection:'column'}}>
                    <Button variant="contained" component="label" color="primary">
                    Upload Output File
                    <input
                        type="file"
                        hidden
                        name="outputFile"
                        onChange={handleImageInputChange}
                    />
                    </Button>
                    {image&&image.outputFile&&<FileCopyIcon style={{width:80,height:80}} onClick={()=>{
                        window.open(image.outputFile)
                    }} onMouseEnter={(e)=>{e.target.style.cursor = "pointer"}}/>}
                </div>
            </div>
          </div>
          <div style={styles.inputContainer}>
              Deadline
             <TextField
             lable="Exercise Deadline"
             type="date"
             name="exer_deadline"
             onChange={handleInputChange}
             fullWidth/>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDialogClose} color="primary">
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

    const openDialog = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = (e) => {
        if(e.target.innerHTML === "Create"){
            setExercise({...exercise,date_of_creation:Date.now()*1000})
            let newExercise = exercises
            exercises.push(exercise)
            setExercises(newExercise)
            setExercise({
                exer_no:null,
                title:"",
                date_of_creation:0
            })
        }
        setDialogOpen(false);
    };    
    useEffect(()=>{
        setExercises(EXERCISE)
        setExercise({...exercise,exer_no:exercises.length+1})
    },[])
    return(
        <div>
            <Header/>
            <div style={styles.root}>
                <div style={styles.cardsGrid}>
                    {exercises.map((exercise,idx)=>(
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