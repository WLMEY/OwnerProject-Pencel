// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// const Algorithms = () => {
//     //variables
//     const [Statistics, setStatistics] = useState({});
//     const [TotalWordNo, setTotalWordNo] = useState(null);
//     const [Words, setWords] = useState([]);





//     //functions

//     const Get_Statistics = async () => {
//         //Get Statistics from server...
//         const res = await axios.get("http://localhost:5000/Statistics");
//         const Data_Resive=res.data;
//         setStatistics(Data_Resive);


//     }

//     const Get_Words=async()=>{
//         const res=await axios.get("http://localhost:5000/words");
//            const Data_Resive=res.data;
//         setWords(Data_Resive)

//     }

//     const Patch_TotalWords = async () => { 
//         //Updata Total Word in server...
//         const server = await axios.patch("http://localhost:5000/Statistics", TotalWordNo)

//     }


// useEffect(()=>{

//  Get_Statistics();
//  Get_Words();

//  console.log(JSON.stringify(Words[0]));


// },[])

// useEffect(() => {
//     if (Words.length > 0) {
//         console.log(JSON.stringify(Words));
//         setTotalWordNo(Words.length)
//         Patch_TotalWords();

//     }
// }, [Words]);




//     return (<>

//     </>);
// }

// export default Algorithms;





import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Algorithms = () => {
    // Variablse
    const [statistics, setStatistics] = useState({});
    const [word_No_Total, setWord_No_Total] = useState(null);
    const [word_No_Weekly, setWord_No_Weekly] = useState(null);

    const [words, setWords] = useState([]);
    const [newWords, setNewWords] = useState([]);


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

    //Get all the New Words
    const Get_NewWords=async ()=>{
        const { data } = await axios.get("http://localhost:5000/NewWords");
        setNewWords(data);
        
    }
    //Updata the TotalWords
    const Patch_TotalWords = async () => {
        
        setStatistics({...statistics,TotalWords: word_No_Total })
        setStatistics({...statistics,Weekly: word_No_Weekly })

        // console.log(statistics)
        await axios.patch("http://localhost:5000/Statistics/1", { TotalWords: word_No_Total });
        await axios.patch("http://localhost:5000/Statistics/1", { Weekly: word_No_Weekly });

        
    };

    // جلب البيانات عند تحميل المكون
    useEffect(() => {
        Get_Statistics();
        Get_Words();
        Get_NewWords();
    }, []);

    // تحديث `TotalWordNo` عندما تتغير `Words`
    useEffect(() => {
        if (words.length > 0) {
            console.log(JSON.stringify(words));
            setWord_No_Total(words.length);
            setWord_No_Weekly(newWords.length);

        }
    }, [words]);

    // تحديث عدد الكلمات في السيرفر عندما يتغير `TotalWordNo`
    useEffect(() => {
        if (word_No_Total !== null||word_No_Weekly !== null) {
        
            Patch_TotalWords();
            console.log(statistics)
        }
    }, [word_No_Total,word_No_Weekly]);

    return <></>;
};

export default Algorithms;
