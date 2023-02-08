import { log } from 'console'
import React,{useState,useEffect,useRef} from 'react'
import Cookies from 'universal-cookie';
import './timer.css'
interface Time{
    minutes:number,
    secondsA:number,
    secondsB:number
}
const Timer = () => {
    const [time,setTime] =useState<Time>({
        minutes:5,
        secondsA:0,
        secondsB:0
    })
    const gInterval: { current: NodeJS.Timeout | null } = useRef(null);
    const cookieRef = useRef(new Cookies())
    const displayNewTime = ()=>{
        if(--time.secondsB == -1){
            
            if(--time.secondsA==-1){
                time.secondsA = 5
                time.minutes = time.minutes-1
            }
            time.secondsB = 9
        }
        return time
    }
   useEffect(()=>{
        if(cookieRef.current.get("minutes") && 
            cookieRef.current.get("secondsA") && 
            cookieRef.current.get("secondsB")){
                time.minutes = parseInt(cookieRef.current.get("minutes"))
                time.secondsA = parseInt(cookieRef.current.get("secondsA"))
                time.secondsB = parseInt(cookieRef.current.get('secondsB'))
                setTime({
                   ...time
                })
            }
        const id = startInterval()
        window.addEventListener("click", saveChanges);
        return () => {
            clear(id);
                window.removeEventListener("beforeunload", saveChanges);
        }
   },[])
   useEffect(()=>{
        if(time.minutes== 5 && time.secondsA ==0 && time.secondsB == 0){
            clear(gInterval.current)
            startInterval()
            console.log(time)
        }
       
   },[time])
   const saveChanges = (e:any) =>{
        console.log('from save',time)
        cookieRef.current.set('minutes',time.minutes)
        cookieRef.current.set('secondsA',time.secondsA)
        cookieRef.current.set('secondsB',time.secondsB)
   }
   const clear =(id:any)=>{
        clearInterval(id)
   }
   const resetTimer = () =>{ 
        time.minutes = 5
        time.secondsA=0
        time.secondsB = 0
        setTime({...time})  
    }
    const startInterval = () =>{
        const id = setInterval(()=>{
            const newTime = displayNewTime()
            if(newTime.minutes == 0 && newTime.secondsA == 0 && newTime.secondsB == 0 )
                clear(id)
            setTime({...newTime})
            },1000)
        gInterval.current = id
        return id
    }
    
  return (
    <div className='timer-container'>
       <p className='timer-text'>count down to lift off</p>
       <div className='clock-container'>
            <div className='hours'>{time.minutes}</div>
            <div className='dots-container'>
                <div className='dot'></div>
                <div className='dot'></div>
            </div>
            <div className='minutes'>{time.secondsA}{time.secondsB}</div>
       </div>
       <div className='button' onClick={resetTimer}> Reset timer</div>
    </div>
  )
}

export default Timer