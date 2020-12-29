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
const axios = require('axios')

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
    }
}
function Home() {
    const history = useHistory()
    const [currentLabs,setCurrentLabs] = useState([])
    const [pastLabs,setPastLabs] = useState([])
    const [tabValue,setTabValue] = useState(0)
    const [studentId] = useState(3)
    const handleTabChange = (event,newValue)=>{
        setTabValue(newValue)
    }
    const fetchAllLabs = ()=>{
        axios.get('http://localhost:3002/student/viewAllLabs',{
            params:{studentId:studentId}
        }).then((res)=>{
            console.log(res.data)
            setCurrentLabs(res.data)
        }).catch((err)=>{
            console.log("Error fetching all labs")
            console.log(err)
        })
    }
    useEffect(()=>{
        //TODO:Assign Student ID from local storage based on google id
        fetchAllLabs()
        setPastLabs(PLAB)
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
                        <LabCard key={idx} lab={lab}/>
                    )))||(currentLabs.length===0 && 
                    <div style={{padding:100}}>
                        No Current Labs !
                    </div>))}
                    {tabValue === 1 && ((pastLabs.length>0 && pastLabs.map((lab,idx)=>(
                        <LabCard key={idx} lab={lab}/>
                    )))||(pastLabs.length===0 && 
                    <div style={{padding:100}}>
                        No Past Labs !
                    </div>))}
                </div>
            </div>
        </div>

    )
}
export default Home