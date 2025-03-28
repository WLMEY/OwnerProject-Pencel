import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Algorithms = () => {
    //variables
    const [Statistics, setStatistics] = useState({});
    const [TotalWordNo, setTotalWordNo] = useState(null);




    //functions

    const Get_Statistics = async () => {
        //Get Statistics from server...
        const res = await axios.get("http://localhost:5000/Statistics");
        setStatistics(res.data);
        console.log(Statistics)

    }
        




    const Patch_TotalWords = async () => { 
        //Updata Total Word in server...
        const server = await axios.patch("http://localhost:5000/Statistics", TotalWordNo)

    }


useEffect(()=>{

 Get_Statistics();

},[])



    return (<>
    
    </>);
}

export default Algorithms;






// import axios from "axios";
// import React, { useState, useEffect } from "react";

// const Algorithms = () => {
//     // تعريف الحالة (State)
//     const [Statistics, setStatistics] = useState({});
//     const [TotalWordNo, setTotalWordNo] = useState(null);

//     // دالة جلب الإحصائيات من السيرفر
//     const Get_Statistics = async () => {
//         try {
//             const res = await axios.get("http://localhost:5000/Statistics");
//             setStatistics(res.data); // تحديث البيانات
//             console.log("Statistics:", res.data);
//         } catch (error) {
//             console.error("Error fetching statistics:", error);
//         }
//     };

//     // دالة تحديث عدد الكلمات في السيرفر
//     const Patch_TotalWords = async () => {
//         try {
//             await axios.patch("http://localhost:5000/Statistics", { TotalWordNo });
//             console.log("Total words updated:", TotalWordNo);
//         } catch (error) {
//             console.error("Error updating total words:", error);
//         }
//     };

//     // استدعاء `Get_Statistics` عند تحميل المكون لأول مرة
//     useEffect(() => {
//         Get_Statistics();
//     }, []);

//     return (
// <>



// </>
//     );
// };

// export default Algorithms;

