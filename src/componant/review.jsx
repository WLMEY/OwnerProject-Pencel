


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Review = () => {
  const navigate = useNavigate();
  const [lastReview, setLastReview] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [mistakes, setMistakes] = useState([]);
  const [weeklyList, setWeeklyList] = useState();
  const [newDiligence,setNewDiligence]=useState([])


  const GetReview = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/LastTest");
      if (Array.isArray(data)) {
        setLastReview(data.slice(-10));
      } else {
        console.error("البيانات المستلمة ليست مصفوفة:", data);
      }
    } catch (error) {
      console.error("خطأ في جلب البيانات:", error);
    }
  };

  const sendMastic = async () => {
    try {
      const mistakesArray = lastReview.filter(item => item.mistakes);
      setMistakes(mistakesArray);

      for (const mistake of mistakesArray) {
        await axios.post("http://localhost:5000/Mistakes/", mistake);
      }

      const { data } = await axios.get("http://localhost:5000/Statistics/1");
      const oldMistakes = data?.Mistakes || 0;

      await axios.patch("http://localhost:5000/Statistics/1", {
        Mistakes: oldMistakes + mistakesArray.length
      });
    } catch (error) {
      console.error("خطأ في تحديث الأخطاء:", error);
    }
  };

  // const getDili_stat=async()=>{
  //   const { data } = await axios.get("http://localhost:5000/Diligence/");
  //   setWeeklyList(data);
  // }
  // const getDiligence=async()=>{ //send
  //    await axios.patch("http://localhost:5000/Statistics/1",{Diligence:newDiligence});
    
  // }
  // const setNewDiligence_Calc=()=>{
  //   setNewDiligence((weeklyList.reduce((acc,num)=>acc+num.lastDiligence,0))/weeklyList.length)
  // }




  const getDili_stat = async () => {
    const { data } = await axios.get("http://localhost:5000/Diligence/");
    setWeeklyList(data);
    return data; // مهم للانتظار في useEffect
  };

  const sendDiligenceToServer = async (value) => {
    await axios.patch("http://localhost:5000/Statistics/1", { Diligence: value });
  };

  const calculateNewDiligence = () => {
    const average = weeklyList.reduce((acc, num) => acc + num.lastDiligence, 0) / weeklyList.length;
    setNewDiligence(average);
    return average;
  };

  useEffect(() => {
    const processDiligence = async () => {
      try {
        // 1. جلب البيانات أولاً
        await getDili_stat();
        
        // 2. حساب المتوسط (بعد أن تكون weeklyList محدثة)
        const avg = calculateNewDiligence();
        
        // 3. إرسال النتيجة إلى الخادم
        await sendDiligenceToServer(avg);
        
      } catch (error) {
        console.error("Error in diligence process:", error);
      }
    };

    processDiligence();
  }, []); // Empty dependency array = runs once on mount












  const gotoMainpage = () => {
    navigate('/');
    // if()
    // sendMastic();
  };

  useEffect(() => {
    GetReview();
  }, []);

  useEffect(() => {
    if (lastReview.length > 0) {
      // sendMastic();
    }
  }, [lastReview]);

  useEffect(() => {
    const mid = Math.ceil(lastReview.length / 2);
    setLeft(lastReview.slice(0, mid));
    setRight(lastReview.slice(mid));
  }, [lastReview]);

  return (
    <>
      <div className='reviw'>
        <div className='viewleft'>
          <ul>
            {left.map((item, index) => (
              <li key={index} className={item.mistakes ? "true" : "false"}>
                <span>{item.English}</span>
                <span>{item.Arabic}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className='HR'></div>
        <div className='viewright'>
          <ul>
            {right.map((item, index) => (
              <li key={index} className={item.mistakes ? "true" : "false"}>
                <span>{item.English}</span>
                <span>{item.Arabic}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button onClick={gotoMainpage} className='btn2'>Done</button>
    </>
  );
};

export default Review;

