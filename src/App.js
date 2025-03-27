import { useState } from 'react';
import './App.css';
import './styles.css'
import Review from './componant/review';
import New from './componant/New';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Main from './Mainpage';

function App() {


  return (
    // <BrowserRouter>
    //     <Routes>
    //       <Route path='/' element={<Main/>}/>
    //       {/* <Route path='/New' element={<New/>}/>
    //       <Route path='/Review' element={<Review/>}/> */}

    //     </Routes>
    // </BrowserRouter>
    <>
    <Main/>
    
    </>
  );
}

export default App;















// import { useState, useRef, useEffect } from 'react';
// import './App.css';
// import './styles.css';
// function App() {
//   const [arabicText, setArabicText] = useState('');
//   const [englishText, setEnglishText] = useState('');
//   const [wordPairs, setWordPairs] = useState([]);
  
//   const arabicInputRef = useRef(null);
//   const englishInputRef = useRef(null);

//   // التعامل مع إدخال النص العربي (يمنع الأحرف الإنجليزية)
//   const handleArabicInput = (e) => {
//     const value = e.target.value.replace(/[a-zA-Z]/g, '');
//     setArabicText(value);
//   };

//   // التعامل مع إدخال النص الإنجليزي (يمنع الأحرف العربية)
//   const handleEnglishInput = (e) => {
//     const value = e.target.value.replace(/[ء-ي]/g, '');
//     setEnglishText(value);
//   };

//   // حفظ الزوج الجديد (كلمة إنجليزية وعربية)
//   const handleSave = () => {
//     if (englishText.trim() && arabicText.trim()) {
//       setWordPairs([...wordPairs, { english: englishText, arabic: arabicText }]);
//       setEnglishText('');
//       setArabicText('');
      
//       // إعادة التركيز على حقل الإدخال الإنجليزي بعد الحفظ
//       englishInputRef.current.focus();
//     }
//   };

//   // (اختياري) تغيير لوحة المفاتيح تلقائياً على الجوال
//   useEffect(() => {
//     if (arabicInputRef.current) {
//       arabicInputRef.current.setAttribute('inputmode', 'none');
//     }
//     if (englishInputRef.current) {
//       englishInputRef.current.setAttribute('inputmode', 'latin');
//     }
//   }, []);

//   return (
//     <div className='Main'>
//       <div className='Left'>
//         <span className='level'>Level : 10</span>
//         <div className='activites'>
//           <div className='new'>
//             <input
//               type='text'
//               ref={arabicInputRef}
//               dir="rtl"
//               lang="ar"
//               value={arabicText}
//               onChange={handleArabicInput}
//               placeholder='عربي'
//             />
//             <input
//               type='text'
//               ref={englishInputRef}
//               dir="ltr"
//               lang="en"
//               value={englishText}
//               onChange={handleEnglishInput}
//               placeholder='English'
//             />
//             <button className='btn' onClick={handleSave}>Save</button>
//           </div>
          
//           <div className='reviw_pather'>
//             <div className='reviw'>
//               <div className='viewleft'>
//                 <ul>
//                   {wordPairs.slice(0, 10).map((pair, index) => (
//                     <li key={index}>
//                       <span>{pair.english}</span> <span>{pair.arabic}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <div className='HR'></div>
//               <div className='viewright'>
//                 <ul>
//                   {wordPairs.slice(10, 20).map((pair, index) => (
//                     <li key={index}>
//                       <span>{pair.english}</span> <span>{pair.arabic}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//             <button className='btn2'>Done</button>
//           </div>
//         </div>
//       </div>
      
//       <div className='Right'>
//         <div className='stats'>
//           <header>
//             <span>New</span>
//             <span>Review</span>
//             <span>Stats</span>
//           </header>
//           <div className='stat_here'>
//             <ul>
//               <li><span>Total Words</span><span>15575</span></li>
//               <li><span>New Words (Weekly)</span><span>26</span></li>
//               <li><span>Tests</span><span>5</span></li>
//               <li><span>Reviewed</span><span>1200</span></li>
//               <li><span>Mistakes</span><span>145</span></li>
//             </ul>
//           </div>
//         </div>
//         <div className='right_bottom'>
//           <span>Diligence : 135%</span>
//           <hr />
//           <span>Memory : 68%</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
