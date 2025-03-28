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
    // المتغيرات
    const [Statistics, setStatistics] = useState({});
    const [TotalWordNo, setTotalWordNo] = useState(null);
    const [Words, setWords] = useState([]);

    // دالة جلب الإحصائيات من السيرفر
    const Get_Statistics = async () => {
        try {
            const res = await axios.get("http://localhost:5000/Statistics");
            setStatistics(res.data);
        } catch (error) {
            console.error("Error fetching statistics:", error);
        }
    };

    // دالة جلب الكلمات من السيرفر
    const Get_Words = async () => {
        try {
            const res = await axios.get("http://localhost:5000/words");
            setWords(res.data);
        } catch (error) {
            console.error("Error fetching words:", error);
        }
    };

    // دالة تحديث عدد الكلمات في السيرفر
    const Patch_TotalWords = async () => {
        try {
            await axios.patch("http://localhost:5000/Statistics/1", { TotalWords: TotalWordNo });
            console.log("Total words updated:", TotalWordNo);
        } catch (error) {
            console.error("Error updating total words:", error);
        }
    };

    // جلب البيانات عند تحميل المكون
    useEffect(() => {
        Get_Statistics();
        Get_Words();
    }, []);

    // تحديث `TotalWordNo` عندما تتغير `Words`
    useEffect(() => {
        if (Words.length > 0) {
            console.log(JSON.stringify(Words));
            setTotalWordNo(Words.length);
        }
    }, [Words]);

    // تحديث عدد الكلمات في السيرفر عندما يتغير `TotalWordNo`
    useEffect(() => {
        if (TotalWordNo !== null) {
            Patch_TotalWords();
        }
    }, [TotalWordNo]);

    return <></>;
};

export default Algorithms;
