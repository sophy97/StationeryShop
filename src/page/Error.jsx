// 잘못된 경로로 접근했음을 알려줄 페이지
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigator = useNavigate();
    return (
        <div>
            <h2>ERROR</h2>
            <h4>잘못된 페이지 경로입니다</h4>
            <button onClick={()=>{navigator("/")}}>Home</button>
        </div>
    );
};

export default Error;