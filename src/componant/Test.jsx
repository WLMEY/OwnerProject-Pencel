import React from 'react';

const Test = () => {
    return (<>
        <div className='new'>
            <div className='Q_ditils'>
                <span>Question No. : 2</span>
                <span>Total Questions : 20</span>
                <span>Type Arabic</span>
                

            </div>
            <input type='text' id='arabicInput' dir="rtl" lang="ar" inputMode="none" placeholder='عربي'></input>
            <input type='text' id='englishInput' dir="ltr" lang="en" inputMode="latin" placeholder='English'></input>
            <button className='btn'>Next</button>

        </div></>);
}

export default Test;