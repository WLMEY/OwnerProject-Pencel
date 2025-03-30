
import axios from 'axios';
import React, { Children, createContext, useEffect, useState } from 'react';
import Test from './Test';

// export const Wordcontext = createContext();

const Algorithms = () => {
    // Variablse
    const [statistics, setStatistics] = useState({});
    const [word_No_Total, setWord_No_Total] = useState(null);
    const [word_No_Weekly, setWord_No_Weekly] = useState(null);
    const [words, setWords] = useState([]);
    const [newWords, setNewWords] = useState([]);
    const [level, setLevel] = useState()






    //Get all the Statistics
    const Get_Statistics = async () => {
        const { data } = await axios.get("http://localhost:5000/Statistics");
        setStatistics(data);
    };

    //Get all the Words
    const Get_Words = async () => {
        const { data } = await axios.get("http://localhost:5000/words");
        setWords(data);
    };
    const LevelCalculation = () => {
        // console.log("word_No_Total: M", word_No_Total); // 100
         
        setLevel(Math.floor(word_No_Total/25));
    }


    //Get all the New Words
    const Get_NewWords = async () => {
        const { data } = await axios.get("http://localhost:5000/NewWords");
        setNewWords(data);

    }
    
    //Updata the TotalWords
    const Patch_TotalWords = async () => {

        setStatistics({ ...statistics, TotalWords: word_No_Total })
        setStatistics({ ...statistics, Weekly: word_No_Weekly })

        // console.log(statistics)
        // console.log("word_No_Total:", word_No_Total);
        // console.log(word_No_Total, word_No_Weekly, level);

        await axios.patch("http://localhost:5000/Statistics/1", { TotalWords: word_No_Total, Weekly: word_No_Weekly});
        // await axios.patch("http://localhost:5000/Statistics/1", { Weekly: word_No_Weekly });


    };
    const sendLevel= async()=>{
        await axios.patch("http://localhost:5000/Statistics/1", {Level: level });

    }

    useEffect(()=>{
        // console.log("Level: effect", level); // 100
        sendLevel();

    },[level])
    // جلب البيانات عند تحميل المكون
    useEffect(() => {
        Get_Statistics();
        Get_Words();
        Get_NewWords();
       
    }, []);

    // تحديث `TotalWordNo` عندما تتغير `Words`
    useEffect(() => {
        if (words.length > 0) {
            // console.log(JSON.stringify(words));
            setWord_No_Total(words.length);
            setWord_No_Weekly(newWords.length);

        }
    }, [words]);

    // تحديث عدد الكلمات في السيرفر عندما يتغير `TotalWordNo`
    useEffect(() => {
        if (word_No_Total !== null || word_No_Weekly !== null) {

            Patch_TotalWords();
            LevelCalculation();
            // console.log(statistics)
        }
    }, [word_No_Total, word_No_Weekly]);



};

export default Algorithms;





