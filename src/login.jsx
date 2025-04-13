// import React from "react";
// import { useState, useEffect } from 'react';

// const Login = () => {
//   const textArray = ["English"];

// //   const text = (e, index) => {
// //     // const typingspeed=150;
// //     // const delaybetweentexts=2000;
// //     // let textIndex=0;
// //     // let charindex=0;

// //     setTimeout(text, 150);
// //     return <span>{e}</span>;
// //   };





// // function TypingText({ text, delay = 100 }) {
// //   const [displayedText, setDisplayedText] = useState('');

// //   useEffect(() => {
// //     let currentIndex = 0;

// //     const interval = setInterval(() => {

// //       setDisplayedText((prev) => prev + text[currentIndex]);
// //       currentIndex++;

// //       if (currentIndex >= text.length) {
// //         // clearInterval(interval);
// //         currentIndex=0;
// //         setDisplayedText('');
// //       }


// //     }, delay);

// //     return () => clearInterval(interval);
// //   }, [text, delay]);

// //   return <span>{displayedText}</span>;
// // }
// function TypingText({ text, delay = 100 }) {
//     const [displayedText, setDisplayedText] = useState('');
  
//     useEffect(() => {
//       let currentIndex = 0;
//       let isTyping = true;
  
//       const interval = setInterval(() => {
//         if (isTyping) {
//           setDisplayedText((prev) => prev + text[currentIndex]);
//           currentIndex++;
  
//           if (currentIndex >= text.length) {
//             isTyping = false;
  
//             // استنى شوية قبل المسح
//             setTimeout(() => {
//               setDisplayedText('');
//               currentIndex = 0;
//               isTyping = true;
//             }, 2000); // هنا مثلاً هينتظر ثانيتين بعد ما الكلمة تخلص
//           }
//         }
//       }, delay);
  
//       return () => clearInterval(interval);
//     }, [text, delay]);
  
//     return <span>{displayedText}</span>;
//   }
  
//   return (
//     <div className="log">
//       <header className="Logo continer">logo</header>
//       <main className="main">
//         <section className="Animation continer">
//           <div className="typing">
//             {<TypingText text="mohammed" delay={100}/>}            </div>
//           <div className="cursor">|</div>
//         </section>
//         <section className="account continer">
//           <div className="Login continer1"></div>
//           <div className="Register continer1"></div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default Login;





import React, { useState, useEffect } from 'react';

function TypingText({ text, delay = 100, pause = 2000 }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let isCancelled = false;

    const typeText = async () => {
      while (!isCancelled) {
        for (let i = 0; i <= text.length; i++) {
          if (isCancelled) return;
          setDisplayedText(text.slice(0, i));
          await new Promise((resolve) => setTimeout(resolve, delay));
        }

        // انتظر شوية قبل إعادة الكتابة
        await new Promise((resolve) => setTimeout(resolve, pause));
        setDisplayedText('');
      }
    };

    typeText();

    return () => {
      isCancelled = true;
    };
  }, [text, delay, pause]);

  return <span>{displayedText}</span>;
}

const Login = () => {
  return (
    <div className="log">
      <header className="Logo continer">logo</header>
      <main className="main">
        <section className="Animation continer">
          <div className="typing">
            <TypingText text="English..." delay={100} pause={2000} />
          </div>
          <div className="cursor">|</div>
        </section>
        <section className="account continer">
          <div className="Login continer1"></div>
          <div className="Register continer1"></div>
        </section>
      </main>
    </div>
  );
};

export default Login;

