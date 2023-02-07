import { dir, log } from 'console'
import React,{useState,useEffect} from 'react'
import './animation.css'
interface AnimationProps {
    url:string
}
const Animation :React.FC<AnimationProps>= ({url}) => {
    let [rotate,setRotate] = useState(0)
    let [direction,setDirection] = useState(0)
    useEffect(()=>{
        const interval = setInterval(()=>{
            rotate = direction == 0 ? rotate + 1 : rotate -1
            if(rotate == 45){
                direction = 1
                setRotate(rotate)
                setDirection(direction)
                return
            }
            if(rotate == 0){
                direction = 0
                setRotate(rotate)
                setDirection(direction)
                return
            }
            setRotate(rotate)
        },70)

        return () =>
            clearInterval(interval);

    },[])
  return (
    <img  className = "animation" style={{transform:`rotate(${rotate}deg)`}} src={url} ></img>
  )
}

export default Animation