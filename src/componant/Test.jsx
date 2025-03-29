import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Review from './review';

const Test = () => {


    const navigate = useNavigate();
    const words=useContext(Wordcontext);
    const [Question,setQuestion]=useState([])



    const goto = () => {
        navigate("/review")

    }
    const QuestionSetting=()=>{
        

    }

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