import React from 'react';
const New = () => {
    return (
        <>
            <div className='new'>

                <input type='text' id='arabicInput' dir="rtl" lang="ar" inputMode="none" placeholder='عربي'></input>
                <input type='text' id='englishInput' dir="ltr" lang="en" inputMode="latin" placeholder='English'></input>
                <button className='btn'>save</button>

            </div></>
    );
}

export default New;