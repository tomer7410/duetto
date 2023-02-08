
import React,{useState,useEffect,useRef} from 'react'
import Cookies from 'universal-cookie';
import './timer.css'
const Timer = () => {
    let [minutes, setMinutes] = useState(5)
    let [secondsA, setSecondsA] = useState(0)
    let [secondsB, setSecondsB] = useState(0)
    const gInterval: { current: NodeJS.Timeout | null } = useRef(null);
    const cookieRef = useRef(new Cookies())
    const displayNewTime = ()=>{
        if(--secondsB == -1){
            
            if(--secondsA==-1){
                secondsA = 5
                minutes --
            }
            secondsB = 9
        }
        setSecondsB(prev => prev +(secondsB-prev))
        setSecondsA(prev => prev +(secondsA-prev))
        setMinutes(prev => prev +(minutes-prev))
        return {minutes,secondsA,secondsB}
    }
    useEffect(() => {
           minutes = parseInt(cookieRef.current.get('minutes')) ;
           secondsA = parseInt(cookieRef.current.get('secondsA'))
           secondsB  =  parseInt(cookieRef.current.get('secondsB'))
        if(minutes && secondsA && secondsB){
            setMinutes( prev => prev + (minutes -prev))
            setSecondsA(prev => prev + (secondsA -prev))
            setSecondsB(prev => prev + (secondsB -prev))
        }
        const interval = startInterval()
        window.addEventListener('beforeunload',saveChanges)
        return () => {
            
            clearInterval(interval)
            window.removeEventListener('beforeunload',saveChanges)
        };
      }, []);

   const saveChanges = () =>{
        cookieRef.current.set('minutes',minutes)
        cookieRef.current.set('secondsA',secondsA)
        cookieRef.current.set('secondsB',secondsB)
        clear(gInterval)
   }
   const clear =(id:any)=>{
        clearInterval(id)
   }
   const resetTimer = () =>{
    window.addEventListener('beforeunload',saveChanges)
        clear(gInterval.current)
        minutes = 5
        secondsA = 0
        secondsB = 0
        setSecondsB(prev => prev +(secondsB-prev))
        setSecondsA(prev => prev +(secondsA-prev))
        setMinutes(prev => prev +(minutes-prev))
        startInterval()
    }
    const startInterval = () =>{
        const id = setInterval(()=>{
        const newTime = displayNewTime()
        if(minutes == 0 && secondsA == 0 && secondsB == 0 )
            clear(id)
        },1000)
        gInterval.current = id
        return id
    }
    
  return (
    <div className='timer-container'>
       <p className='timer-text'>count down to lift off</p>
       <div className='clock-container'>
            <div className='hours'>{minutes}</div>
            <div className='dots-container'>
                <div className='dot'></div>
                <div className='dot'></div>
            </div>
            <div className='minutes'>{`${secondsA}${secondsB}`}</div>
       </div>
       <div className='button' onClick={resetTimer}> Reset timer</div>
    </div>
  )
}

export default Timer