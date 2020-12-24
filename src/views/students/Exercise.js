import React, {useState,useEffect} from 'react'
import Header from '../../components/Header'
import ExerciseCard from '../../components/ExerciseCard'

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
    }
}
function Exercise(){
    const [exercises,setExercises] = useState([])
    useEffect(()=>{
        setExercises(EXERCISE)
    },[])
    return(
        <div>
            <Header/>
            <div style={styles.root}>
                <div style={styles.cardsGrid}>
                    {exercises.map((exercise,idx)=>(
                        <ExerciseCard key={idx} exercise={exercise}/>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Exercise