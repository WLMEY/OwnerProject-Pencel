
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Review = () => {

  const navigate=useNavigate();
  const [lastReview, setLastReview] = useState([]); // يجب أن يكون مصفوفة
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [mistakes, setMistakes] = useState({});



  const GetReview = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/LastTest");

      if (Array.isArray(data)) {
        setLastReview(data);
      } else {
        console.error("البيانات المستلمة ليست مصفوفة:", data);
      }
    } catch (error) {
      console.error("خطأ في جلب البيانات:", error);
    }
  };
  const sendMastic=async()=>{
    for(const i in lastReview){
      if (lastReview.mistakes){
        setMistakes(lastReview.mistakes);
      }
    }
    // await axios.put("http://localhost:5000/Mistakes",{})

    await axios.patch("http://localhost:5000/Statistics/1",{Mistakes:+mistakes.length})
  }
  const gotoMainpage=()=>{
    navigate('/');
    
  }

  useEffect(() => {
    GetReview();
    sendMastic();
  }, [mistakes]);

  useEffect(() => {
    // تقسيم العناصر بين left و right بعد جلب البيانات
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
              <li key={index} className={item.mistakes?"true":"false"}>
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
              <li key={index} className={item.mistakes?"true":"false"} >
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
