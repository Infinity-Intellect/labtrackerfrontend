import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin:10,
    display:'flex',
    flexDirection:'column'
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

export default function ExerciseCard({exercise}) {
  const classes = useStyles();
  const history = useHistory()
  const viewExercise = ()=>{
    history.push('/exercisedetails')
  }
  return (
    <Card className={classes.root}>
      <CardContent>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <div style={{flex:3}}><h3>Exercise {exercise.exer_no}</h3></div>
            <div style={{flex:2}}>
                <Typography color="textSecondary" gutterBottom>
                    Created:{new Date(exercise.date_of_creation).toDateString()}
                </Typography>
            </div>
        </div>
        <div style={{display:'flex',justifyContent:'center'}}>
            <h2>{exercise.title}</h2>
        </div>
      </CardContent>
      <CardActions style={{justifyContent:'center'}}>
            <Button size="large" color="secondary" variant="contained" 
            onClick={viewExercise}>View Details</Button>
      </CardActions>
    </Card>
  );
}
