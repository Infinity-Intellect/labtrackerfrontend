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
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
const axios = require('axios')

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
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
const STUDENTS = [
    {
        studentId:'3'
    },
    {
        studentId:'4'
    }
]
const STAFFS = [
    {
        staffId:'1'
    },
    {
        staffId:'2'
    }
]
function LabFormDialog({open,handleDialogClose,lab,setLab,students,staffs}){
    const [selectedStudents,setSelectedStudents] = useState([])
    const [selectedStaffs,setSelectedStaffs] = useState([])
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
            <FormControl fullWidth>
                <InputLabel id="demo-mutiple-name-label">Staffs</InputLabel>
                <Select
                labelId="demo-mutiple-name-label"
                id="demo-mutiple-name"
                multiple
                value={selectedStaffs}
                onChange={(event)=>{
                    setSelectedStaffs(event.target.value)
                }}
                input={<Input />}
                MenuProps={MenuProps}
                >
                {staffs.map((staff) => (
                    <MenuItem key={staff.staffId} value={staff.staffId}>
                    {staff.staffId}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
          </div>
          <div style={styles.inputContainer}>
            <FormControl fullWidth>
                <InputLabel id="demo-mutiple-name-label">Students</InputLabel>
                <Select
                labelId="demo-mutiple-name-label"
                id="demo-mutiple-name"
                multiple
                onChange={(event)=>{
                    setSelectedStudents(event.target.value)
                }}
                value={selectedStudents}
                input={<Input />}
                MenuProps={MenuProps}
                >
                {students.map((student) => (
                    <MenuItem key={student.studentId} value={student.studentId}>
                    {student.studentId}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
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
          <Button id="create" onClick={(e)=>{
              console.log(selectedStudents)
              handleDialogClose(e,selectedStaffs,selectedStudents)
          }} color="primary">
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
    const [students,setStudents] = useState([])
    const [staffs,setStaffs] = useState([])
    const [lab,setLab ] =useState({
        lab_name:"",
        lab_description:"",
        lab_code:""
    })
    const [staffId] = useState(1)
    const openDialog = () => {
        setDialogOpen(true);
        console.log("OPEN DIALOG")
    };

    const handleDialogClose = (e,selectedStaffs,selectedStudents) => {
        if(e.target.innerHTML === "Create"){
            axios.post(`http://localhost:3002/lab/addlab`,{...lab,student_ids:selectedStudents,staff_ids:selectedStaffs}).then((res)=>{
                console.log(res)
                fetchAllLabs()
            }).catch((err)=>{
                console.log("Error adding new lab")
                console.log(err)
            })
            setLab({
                lab_name:"",
                lab_description:"",
                lab_code:"",
                student_ids:[],
                staff_ids:[]
            })

        }
        setDialogOpen(false);
    };
    const handleTabChange = (event,newValue)=>{
        setTabValue(newValue)
    }
    const fetchAllLabs = ()=>{
        axios.get('http://localhost:3002/staff/viewAllLabs',{
            params:{staffId:staffId}
        }).then((res)=>{
            console.log(res.data)
            setCurrentLabs(res.data)
        }).catch((err)=>{
            console.log("Error fetching all labs")
            console.log(err)
        })
    }
    const fetchAllStudents = ()=>{
        axios.get(`http://localhost:3002/student/allStudents`).then((res)=>{
            setStudents(res.data)
        }).catch((err)=>{
            console.log("Error fetching students")
            console.log(err)
        })
    }
    const fetchAllStaffs = ()=>{
        axios.get(`http://localhost:3002/staff/allStaffs`).then((res)=>{
            setStaffs(res.data)
        }).catch((err)=>{
            console.log("Error fetching students")
            console.log(err)
        })
    }
    useEffect(()=>{
      //setCurrentLabs(LAB)
      //setStaffs(STAFFS)
      //setStudents(STUDENTS)
      fetchAllStaffs()
      fetchAllStudents()
      setPastLabs(PLAB)
      fetchAllLabs()
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
                    lab={lab} setLab = {setLab}
                    students={students} staffs={staffs}/>}
                </div>
            </div>
        </div>

    )
}
export default Home