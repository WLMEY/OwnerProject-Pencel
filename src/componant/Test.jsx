import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Review from './review';
import { Wordcontext } from './Algermes';
import axios from 'axios';

const Test = () => {


    const navigate = useNavigate();
    // const words=useContext(Wordcontext);
    const [Question, setQuestion] = useState([]);  // 12 Q?
    const [words, setWords] = useState([]);
    const [ansEnglish, setAnsEnglish] = useState([]);
    


    const Question_No = 12; //numper of Question i need it .
    const Q_No = 0;



    const goto = () => {
        navigate("/review")
    }
    const QuestionSetting = () => {


        const shuffled = words.sort(() => 0.5 - Math.random());
        const unReviewed = shuffled.filter((word) => (
            word.Reviewed === false
        ))
        setQuestion(unReviewed.slice(0, Question_No));
    }



    const Get_Words = async () => {
        const { data } = await axios.get("http://localhost:5000/words");
        setWords(data);
    };
    useEffect(() => {
        Get_Words();
        QuestionSetting();
    }, [])
    function check(){
        if(Q_No<Question.length){

        }
        else{
            goto();
            Q_No=0;
        }
        
    }
    
    return (<>
        <div className='new'>
            <div className='Q_ditils'>
                <span>Question No. : 2</span>
                <span>Total Questions : 10</span>
                <span>Type Arabic</span>
            </div>


            {Question.map((Q,index) => (
                <>
                    <h1>{Question[Q_No].Arabic}</h1>
                    <input value={ansEnglish[Q_No]} onChange={(e)=>{setAnsEnglish(e.target.value)}} type='text' id='englishInput' dir="ltr" lang="en" inputMode="latin" placeholder='English'></input>
                    <button onClick={check} className='btn'>{Q_No<Question.length?"Next":"supment&reviw"}</button>
                </>
            ))}

        </div></>);
}

export default Test;