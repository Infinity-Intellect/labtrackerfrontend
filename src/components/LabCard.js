import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useHistory} from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles({
  root: {
    width: 275,
    margin:10,
    height:220,
    display:'flex',
    flexDirection:'column'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function LabCard({openDialog,lab=null,isStudent=true}) {
  const classes = useStyles()
  const history = useHistory()
  console.log("In lab card "+isStudent)
  const goToExercise = ()=>{
    console.log("In exercise "+isStudent)
    if(!isStudent)
      history.push({pathname:'/staff/exercise',state:{labId:lab.labId}})
    else
      history.push({pathname:'/exercise',state:{labId:lab.labId}})
  }
  if(lab===null){
    return(
      <Card className={classes.root} variant="outlined" onMouseEnter={(e)=>{
        e.target.style.cursor="pointer"
        e.target.style.backgroundColor = 'rgba(220,220,220,0.4)'
      }}
      onMouseLeave={(e)=>{
        e.target.style.backgroundColor="white"
      }} onClick={openDialog} >
        <CardActions style={{display:'flex',justifyContent:'center',  alignContent:'center',height:'100%'}}>
          <AddIcon />
        </CardActions>
      </Card>
    )
  }
  else if(isStudent)
    return (
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {lab.year}
          </Typography>
          <Typography variant="h5" component="h2">
            {lab.lab_name}
          </Typography>
          <Typography color="textSecondary">
            {lab.lab_code}
          </Typography>
          <Typography color="textSecondary">
            1/5 completed
          </Typography>
        </CardContent>
        <CardActions style={{justifyContent:'center'}}>
          <Button size="medium" variant="contained" color="primary"
          onClick={goToExercise}>View Exercises</Button>
        </CardActions>
      </Card>
    );
    else if(!isStudent)
      return(
          <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {lab.year}
            </Typography>
            <Typography variant="h5" component="h2">
              {lab.lab_name}
            </Typography>
            <Typography color="textSecondary">
              {lab.lab_code}
            </Typography>
          </CardContent>
          <CardActions style={{justifyContent:'center'}}>
            <Button size="medium" variant="contained" color="primary"
            onClick={goToExercise}>View Exercises</Button>
          </CardActions>
        </Card>
      )
}
