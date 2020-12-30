import React,{useState,useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {useLocation} from 'react-router-dom'
import Header from '../../components/Header'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import FileCopyIcon from '@material-ui/icons/FileCopy'
import CircularProgress from '@material-ui/core/CircularProgress';
const axios = require('axios')
const problemStatement = `Problem Statement: Consider a permutation of numbers from 1 to N written on a paper. Let’s denote the product of its element as ‘prod’ and the sum of its elements as ‘sum’. Given a positive integer N, your task is to determine whether ‘prod’ is divisible by ‘sum’ or not.

Input Format: First input will be an integer T.  It depicts a number of test cases. Followed by value for each test case. Each test case will contain an integer N (1<= N <=10^9). It is nothing but the length of the permutation.

Output Format: For each test case, print “YEAH” if ‘prod’ is divisible by ‘sum’, otherwise print “NAH”.`
const styles = {
    root:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'80%',
        margin:"0 auto"
    }
}
const useStyles = makeStyles({
    root: {
      minWidth: '100%',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

export default function ExerciseDetails({isStaff}){
    const classes = useStyles()
    const location = useLocation()
    const [file,setFile] = useState(null)
    const [isVerified,setIsVerified] = useState(false)
    const [exercise,setExercise] = useState(null)
    const [verifiedResult,setVerifiedResult] = useState("")
    const [isVerifying,setIsVerifying] = useState(false)
    const handleInputFileChange = (e)=>{
        setFile(e.target.files[0])
    }
    const onVerificationClick = ()=>{
        setIsVerifying(true)
        let formData = new FormData()
        formData.append('program',file)
        formData.append('exerId',exercise.exerId)
        formData.append('studentId',3)
        axios.post(`http://localhost:3002/exercise/verifyprogram`,formData).then((res)=>{
            setVerifiedResult(res.data)
            setIsVerified(true)
            setIsVerifying(false)
            console.log(res.data)
        }).catch((err)=>{
            console.log("Error verifying")
            console.log(err)
        })
    }
    useEffect(()=>{
        console.log("Location state")
        console.log(location.state)
        setExercise(location.state.exercise)
        console.log("in exer details is staff "+isStaff)
    },[])
    if(exercise!==null)
    {
        return(
            <div>
                <Header/>
                <div style={styles.root}>
                <Card className={classes.root}>
                    <CardContent>
                        <div style={{display:'flex',justifyContent:'center'}}>
                            <h1>{exercise.title}</h1>
                        </div>
                        <div style={{display:'flex',justifyContent:'center'}}>
                            <Typography>{exercise.prob_stmt}</Typography>
                        </div>
                    </CardContent>
                {!isStaff && <CardActions style={{justifyContent:'center'}}>
                    <Button variant="contained" component="label" color="secondary">
                        Upload
                        <input
                            type="file"
                            hidden
                            name="studentFile"
                            onChange={handleInputFileChange}
                        />
                    </Button>
                    <Button variant="contained" onClick={onVerificationClick}>Verify</Button>
                </CardActions>}
                {file && <div style={{display:'flex',justifyContent:'center'}}>
                    <FileCopyIcon style={{width:100,height:100}} onMouseEnter={(e)=>{e.target.style.cursor="pointer"}}
                onClick={()=>{window.open(file)}}/>
                </div>}
                {isVerifying && <div style={{display:'flex',justifyContent:'center'}}>
                    <CircularProgress style={{width:50,height:50}}/>
                </div>}
                {file&&isVerified&&<CardContent>
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                        <div>
                            <h3>Verified</h3>
                        </div>
                        {/* <div>
                            <CheckCircleIcon style={{width:25,height:25,color:'green'}}/>
                        </div> */}
                        <div>
                            <Typography style={{color:verifiedResult!=='All cases passed!'?'red':'green'}}>
                                {verifiedResult.split('\n').map((part)=>(
                                    <p>{part}</p>
                                ))}
                            </Typography>
                        </div>
                    </div>
                </CardContent>}
                </Card>
                </div>
            </div>
        )
    }
    else{
        return <div>Loading ...</div>
    }
    
}