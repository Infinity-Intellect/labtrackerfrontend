import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    width: 275,
    margin:10,
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

export default function LabCard({lab}) {
  const classes = useStyles()
  const history = useHistory()
  const goToExercise = ()=>{
      history.push('/exercise')
  }
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
}
