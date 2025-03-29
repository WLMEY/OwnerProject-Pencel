import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Review from './review';
import { Wordcontext } from './Algermes';
import axios from 'axios';

const Test = () => {


    const navigate = useNavigate();
    // const words=useContext(Wordcontext);
    const [Question,setQuestion]=useState([]);
    const [words, setWords] = useState([]);
    const Question_No=12; //numper of Question i need it .




    const goto = () => {
        navigate("/review")
    }
    const QuestionSetting=()=>{


        const shuffled = words.sort(() => 0.5 - Math.random());
        const unReviewed=shuffled.filter((word)=>(
            word.Reviewed===false
        ))
        setQuestion( unReviewed.slice(0,Question_No)); 
    }
    const Get_Words = async () => {
        const { data } = await axios.get("http://localhost:5000/words");
        setWords(data);
    };
    useEffect(()=>{
        Get_Words();
    },[])

    return (<>
        <div className='new'>
            <div className='Q_ditils'>
                <span>Question No. : 2</span>
                <span>Total Questions : 10</span>
                <span>Type Arabic</span>


            </div>
            <input type='text' id='arabicInput' dir="rtl" lang="ar" inputMode="none" placeholder='عربي'></input>
            <input type='text' id='englishInput' dir="ltr" lang="en" inputMode="latin" placeholder='English'></input>
            <button onClick={goto} className='btn'>Show result</button>


        </div></>);
}

export default Test;