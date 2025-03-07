import React, { useEffect, useState } from 'react';
import axios from "axios";

const Dashboard = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/dashboard") 
        .then((result) => {
            console.log(result.data);
            setData(result.data); 
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, []); 

    return (
        <>
            <h1>Dashboard Page</h1>
            <ul>
                {data.map((user, index) => (
                    <li key={index}>{user.username} - {user.email}</li> 
                ))}
            </ul>
        </>
    );
};

export default Dashboard;
