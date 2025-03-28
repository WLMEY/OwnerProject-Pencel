// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// const New = () => {
//     const [Arabic, setArabic] = useState('');
//     const [English, setEnglish] = useState('');
//     const [NewObject, setNewObject] = useState({
//         "Reviewed": false,
//         "mistakes": false
//     })
//     useEffect(() => {
//         const pushNewWord = async (e) => {
//             setNewObject({ ...NewObject, "Arabic": Arabic, "English": English })
//             const response = await axios.post("http://localhost:5000/words", NewObject);

//         }

//         const HandSubment = () => {
//             pushNewWord();
//         }

//     }, [Arabic, English])




//     return (
//         <>
//             <div className='new'>

//                 <input value={Arabic} onChange={(e) => (setArabic(e.target.value))} type='text' id='arabicInput' dir="rtl" lang="ar" inputMode="none" placeholder='عربي'></input>
//                 <input value={English} onChange={(e) => (setEnglish(e.target.value))} type='text' id='englishInput' dir="ltr" lang="en" inputMode="latin" placeholder='English'></input>
//                 <button onClick={HandSubment} className='btn'>save</button>

//             </div></>
//     );
// }

// export default New;











import axios from "axios";
import React, { useState } from "react";

const New = () => {
    const [Arabic, setArabic] = useState("");
    const [English, setEnglish] = useState("");
    const [NewObject, setNewObject] = useState({
        Reviewed: false,
        mistakes: false,
        Arabic: "",
        English: "",
    });

    const pushNewWord = async () => {
        try {
            const updatedObject = {
                ...NewObject,
                Arabic: Arabic,
                English: English.toLowerCase()
            };

            console.log(Arabic, typeof (Arabic), Arabic.length)
            console.log(English, typeof (English), English.length)

            setNewObject(updatedObject);
            if (Arabic != "" && English != "") {
                await axios.post("http://localhost:5000/words", updatedObject);
                await axios.post("http://localhost:5000/NewWords", updatedObject);

                console.log("Sent successfully")
                setArabic('')
                setEnglish('')
            }
            else {
                console.log("Please fill out all first.")
            }

        } catch (error) {
            console.error("Error sending data:", error);
        }
    };

    const handleSubmit = () => {
        pushNewWord();
    };

    return (
        <>
            <div className="new">
                <input
                    value={Arabic}
                    onChange={(e) => setArabic(e.target.value)}
                    type="text"
                    id="arabicInput"
                    dir="rtl"
                    lang="ar"
                    placeholder="عربي"
                />
                <input
                    value={English}
                    onChange={(e) => setEnglish(e.target.value)}
                    type="text"
                    id="englishInput"
                    dir="ltr"
                    lang="en"
                    placeholder="English"
                />
                <button onClick={handleSubmit} className="btn">
                    Save
                </button>
            </div>
        </>
    );
};

export default New;
