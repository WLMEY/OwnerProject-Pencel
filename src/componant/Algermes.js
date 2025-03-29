
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const Wordcontext=createContext(null);

const Algorithms = () => {
    // Variablse
    const [statistics, setStatistics] = useState({});
    const [word_No_Total, setWord_No_Total] = useState(null);
    const [word_No_Weekly, setWord_No_Weekly] = useState(null);
    const [words, setWords] = useState([]);
    const [newWords, setNewWords] = useState([]);
    const [level,setLevel]=useState()

    


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
    const LevelCalculation=()=>{
        const levelCalc=Math.floor(word_No_Total/25);
        setLevel(levelCalc);
    

    }

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
        await axios.patch("http://localhost:5000/Statistics/1", { TotalWords: word_No_Total,Weekly: word_No_Weekly ,Level:level});
        // await axios.patch("http://localhost:5000/Statistics/1", { Weekly: word_No_Weekly });

        
    };

    // جلب البيانات عند تحميل المكون
    useEffect(() => {
        Get_Statistics();
        Get_Words();
        Get_NewWords();
        LevelCalculation();
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

    return (
    <Wordcontext.Provider value={{words}}>
   <>
   </>
    </Wordcontext.Provider>
    )
};

export default Algorithms;







// import axios from 'axios';
// import React, { createContext, useContext, useEffect, useState } from 'react';

// // إنشاء السياق
// const WordsContext = createContext();

// const Algorithms = () => {
//     // تعيين الحالة (State)
//     const [statistics, setStatistics] = useState({});
//     const [word_No_Total, setWord_No_Total] = useState(0);
//     const [word_No_Weekly, setWord_No_Weekly] = useState(0);
//     const [words, setWords] = useState([]);
//     const [newWords, setNewWords] = useState([]);
//     const [level, setLevel] = useState(0);

//     // جلب الإحصائيات
//     const Get_Statistics = async () => {
//         try {
//             const { data } = await axios.get("http://localhost:5000/Statistics");
//             setStatistics(data);
//         } catch (error) {
//             console.error("خطأ في جلب الإحصائيات:", error);
//         }
//     };

//     // جلب الكلمات
//     const Get_Words = async () => {
//         try {
//             const { data } = await axios.get("http://localhost:5000/words");
//             setWords(data);
//         } catch (error) {
//             console.error("خطأ في جلب الكلمات:", error);
//         }
//     };

//     // جلب الكلمات الجديدة
//     const Get_NewWords = async () => {
//         try {
//             const { data } = await axios.get("http://localhost:5000/NewWords");
//             setNewWords(data);
//         } catch (error) {
//             console.error("خطأ في جلب الكلمات الجديدة:", error);
//         }
//     };

//     // حساب المستوى
//     useEffect(() => {
//         if (word_No_Total > 0) {
//             setLevel(Math.floor(word_No_Total / 25));
//         }
//     }, [word_No_Total]);

//     // تحديث عدد الكلمات في الحالة (state)
//     useEffect(() => {
//         if (words.length > 0) {
//             setWord_No_Total(words.length);
//             setWord_No_Weekly(newWords.length);
//         }
//     }, [words, newWords]);

//     // تحديث عدد الكلمات في السيرفر
//     useEffect(() => {
//         if (word_No_Total > 0 || word_No_Weekly > 0) {
//             Patch_TotalWords();
//         }
//     }, [word_No_Total, word_No_Weekly]);

//     // تحديث القيم في السيرفر
//     const Patch_TotalWords = async () => {
//         try {
//             await axios.patch("http://localhost:5000/Statistics/1", { 
//                 TotalWords: word_No_Total, 
//                 Weekly: word_No_Weekly,
//                 Level: level
//             });

//             setStatistics(prevState => ({
//                 ...prevState,
//                 TotalWords: word_No_Total,
//                 Weekly: word_No_Weekly,
//                 Level: level
//             }));

//         } catch (error) {
//             console.error("خطأ في تحديث الإحصائيات:", error);
//         }
//     };

//     // جلب البيانات عند تحميل المكون
//     useEffect(() => {
//         Get_Statistics();
//         Get_Words();
//         Get_NewWords();
//     }, []);

//     return (
//         <WordsContext.Provider value={{ words }}>
// <></>
//         </WordsContext.Provider>
//     );
// };

// export default Algorithms;
