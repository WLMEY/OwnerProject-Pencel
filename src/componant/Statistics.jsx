import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Statistics = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        const GetData = async () => {

            const response = await axios.get("http://localhost:5000/Statistics/1");
            setData(response.data);
        };

        GetData();
    }, [data]);
    return (

        <ul>
            <li><span>Total Words:</span> <span>{data?.TotalWords ?? "Loading..."}</span></li>
            <li><span>New Words "Weekly":</span> <span>{data?.Weekly ?? "Loading..."}</span></li>
            <li><span>Tests:</span> <span>{data?.Tests ?? "Loading..."}</span></li>
            <li><span>Reviewed:</span> <span>{data?.Reviewed ?? "Loading..."}</span></li>
            <li><span>Mistakes:</span> <span>{data?.Mistakes ?? "Loading..."}</span></li>
        </ul>
    );

};

export default Statistics;
