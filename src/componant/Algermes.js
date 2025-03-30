
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








    // const GetData=async ()=>{
    //     const { data: } = await axios.get("http://localhost:5000/Statistics/1");
    //     const { data } = await axios.get("http://localhost:5000/Statistics/1");

    // }

    // useEffect(()=>{
    //     sendMemory();
    // },[])
    // const sendMemory= async()=>{
    //     // const mem=(100-((statistics.Mistakes/statistics.Reviewed)*100))
    //     await axios.patch("http://localhost:5000/Statistics/1", {Memory: (100-((statistics.Mistakes/statistics.Reviewed)*100)) });

    // }





    //   const [nextCleanup, setNextCleanup] = useState('');
    //   const [lastCleanup, setLastCleanup] = useState('');
    
    //   const calculateNextFridayNoon = () => {
    //     const now = new Date();
    //     const nextFriday = new Date();
        
    //     // الانتقال إلى يوم الجمعة القادم (5 هو يوم الجمعة في JavaScript)
    //     nextFriday.setDate(now.getDate() + ((5 - now.getDay() + 7) % 7));
        
    //     // تحديد الساعة 12 ظهرًا
    //     nextFriday.setHours(12, 0, 0, 0);
        
    //     // إذا كان الوقت قد فات اليوم، ننتظر الجمعة القادمة
    //     if (nextFriday < now) {
    //       nextFriday.setDate(nextFriday.getDate() + 7);
    //     }
        
    //     return nextFriday;
    //   };
    
    //   const performCleanup = async () => {
    //     try {
    //       console.log('بدء عملية التنظيف الأسبوعية...');
          
    //       // 1. جلب البيانات الحالية
    //       const { data } = await axios.get('http://localhost:5000/NewWords');
          
    //       // 2. حساب عدد الكلمات
    //       const totalWords = data.length;
          
    //       // 3. إرسال الإحصائية
    //       await axios.post('http://localhost:5000/Diligence', {
    //         lastDiligence: totalWords,
    //         cleanupDate: new Date().toISOString()
    //       });
          
    //       // 4. حذف البيانات
    //       await axios.delete('http://localhost:5000/NewWords');
          
    //       console.log(`تمت العملية: ${totalWords} كلمة في ${data.length} سجل`);
    //       setLastCleanup(new Date().toLocaleString());
    //     } catch (error) {
    //       console.error('فشلت عملية التنظيف:', error);
    //     }
    //   };
    
    //   useEffect(() => {
    //     const scheduleNextCleanup = () => {
    //       const nextFridayNoon = calculateNextFridayNoon();
    //       setNextCleanup(nextFridayNoon.toLocaleString());
          
    //       const now = new Date();
    //       const timeUntilCleanup = nextFridayNoon - now;
          
    //       console.log(`الموعد القادم للتنظيف: ${nextFridayNoon}`);
          
    //       const timer = setTimeout(() => {
    //         performCleanup();
    //         // بعد التنفيذ، نحدد الموعد القادم
    //         scheduleNextCleanup();
    //       }, timeUntilCleanup);
          
    //       return () => clearTimeout(timer);
    //     };
    
    //     // جدولة أول عملية
    //     scheduleNextCleanup();
        
    //     // يمكنك إضافة هذا السطر لاختبار العملية فورًا:
    //     // performCleanup();
    //   }, []);
    












};

export default Algorithms;


































// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// const Algorithms = () => {
//     // States
//     const [statistics, setStatistics] = useState({});
//     const [word_No_Total, setWord_No_Total] = useState(null);
//     const [word_No_Weekly, setWord_No_Weekly] = useState(null);
//     const [words, setWords] = useState([]);
//     const [newWords, setNewWords] = useState([]);
//     const [level, setLevel] = useState(null);
//     const [nextCleanup, setNextCleanup] = useState('');
//     const [lastCleanup, setLastCleanup] = useState('');

//     // Get all Statistics
//     const Get_Statistics = async () => {
//         try {
//             const { data } = await axios.get("http://localhost:5000/Statistics");
//             setStatistics(data);
//         } catch (error) {
//             console.error("Error fetching statistics:", error);
//         }
//     };

//     // Get all Words
//     const Get_Words = async () => {
//         try {
//             const { data } = await axios.get("http://localhost:5000/words");
//             setWords(data);
//         } catch (error) {
//             console.error("Error fetching words:", error);
//         }
//     };

//     // Get all New Words
//     const Get_NewWords = async () => {
//         try {
//             const { data } = await axios.get("http://localhost:5000/NewWords");
//             setNewWords(data);
//         } catch (error) {
//             console.error("Error fetching new words:", error);
//         }
//     };

//     // Level Calculation
//     const LevelCalculation = () => {
//         if (word_No_Total !== null) {
//             setLevel(Math.floor(word_No_Total / 25));
//         }
//     };

//     // Update TotalWords
//     const Patch_TotalWords = async () => {
//         try {
//             await axios.patch("http://localhost:5000/Statistics/1", {
//                 TotalWords: word_No_Total,
//                 Weekly: word_No_Weekly
//             });
//         } catch (error) {
//             console.error("Error updating statistics:", error);
//         }
//     };

//     // Send Level
//     const sendLevel = async () => {
//         try {
//             if (level !== null) {
//                 await axios.patch("http://localhost:5000/Statistics/1", { Level: level });
//             }
//         } catch (error) {
//             console.error("Error updating level:", error);
//         }
//     };

//     // Cleanup Function
//     const calculateNextFridayNoon = () => {
//         const now = new Date();
//         const nextFriday = new Date();
        
//         // Get next Friday
//         nextFriday.setDate(now.getDate() + ((5 - now.getDay() + 7) % 7));
//         nextFriday.setHours(12, 0, 0, 0);
        
//         if (nextFriday < now) {
//             nextFriday.setDate(nextFriday.getDate() + 7);
//         }
        
//         return nextFriday;
//     };

//     const performCleanup = async () => {
//         try {
//             console.log('Starting weekly cleanup...');
            
//             // 1. Get current data
//             const { data } = await axios.get('http://localhost:5000/NewWords');
            
//             if (data && data.length > 0) {
//                 // 2. Count words (assuming each item is a word)
//                 const totalWords = data.length;
                
//                 // 3. Send statistics
//                 await axios.post('http://localhost:5000/Diligence', {
//                     lastDiligence: totalWords,
//                     cleanupDate: new Date().toISOString()
//                 });
                
//                 // 4. Delete data - MAKE SURE YOUR SERVER HAS THIS ENDPOINT
//                 await axios.delete('http://localhost:5000/NewWords/cleanup');
                
//                 console.log(`Cleanup completed: ${totalWords} words in ${data.length} records`);
//                 setLastCleanup(new Date().toLocaleString());
//             } else {
//                 console.log('No data to cleanup');
//             }
//         } catch (error) {
//             console.error('Cleanup failed:', error);
//         }
//     };

//     // Effects
//     useEffect(() => {
//         Get_Statistics();
//         Get_Words();
//         Get_NewWords();
//     }, []);

//     useEffect(() => {
//         if (words.length > 0) {
//             setWord_No_Total(words.length);
//             setWord_No_Weekly(newWords.length);
//         }
//     }, [words, newWords]);

//     useEffect(() => {
//         if (word_No_Total !== null || word_No_Weekly !== null) {
//             Patch_TotalWords();
//             LevelCalculation();
//         }
//     }, [word_No_Total, word_No_Weekly]);

//     useEffect(() => {
//         if (level !== null) {
//             sendLevel();
//         }
//     }, [level]);

//     useEffect(() => {
//         const scheduleNextCleanup = () => {
//             const nextFridayNoon = calculateNextFridayNoon();
//             setNextCleanup(nextFridayNoon.toLocaleString());
            
//             const now = new Date();
//             const timeUntilCleanup = nextFridayNoon - now;
            
//             console.log(`Next cleanup scheduled: ${nextFridayNoon}`);
            
//             const timer = setTimeout(() => {
//                 performCleanup();
//                 scheduleNextCleanup();
//             }, timeUntilCleanup);
            
//             return () => clearTimeout(timer);
//         };

//         scheduleNextCleanup();
        
//         // Remove the immediate performCleanup() call to avoid double execution
//         // performCleanup();
//     }, []);

// };

// export default Algorithms;

