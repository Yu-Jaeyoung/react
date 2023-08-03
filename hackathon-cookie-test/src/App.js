import React from 'react';
import { useCookies } from 'react-cookie';

function App() {
    const [cookies, setCookie] = useCookies(['myCookie']);

    const handleCreateCookie = () => {
        // 현재 시간을 이용하여 유효 기간 1시간으로 쿠키 생성
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 1);

        // 쿠키 생성
        setCookie('myCookie', 'Hello, this is my cookie!', { expires: expirationDate });

        // 콘솔에 쿠키 정보 출력
        console.log('Created Cookie:', cookies.myCookie);
    };

    return (
        <div className="App">
            <h1>Cookie Test</h1>
            <button onClick={handleCreateCookie}>Create Cookie</button>
            <p>Cookie Value: {cookies.myCookie}</p>
        </div>
    );
}

export default App;
