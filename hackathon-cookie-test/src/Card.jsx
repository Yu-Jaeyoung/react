import React, {useState} from "react";
import styled from "styled-components";
import {useCookies} from "react-cookie";

export default function Card({data, itemStyle, truncateTitle, getCountryFlag}) {
    const [newVisitCount, setNewVisitCount] = useState(0);
    const [cookies, setCookie] = useCookies(["myCookie"]);

    const CardContainer = styled.div`
      margin-top: 90px;
      margin-left: 80px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 5px 5px;
    `;

    const CardItem = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 300px;
      height: 350px;
      text-align: center;
      border-radius: 7px;
      border: 2px solid black;
      position: relative;

      &:hover {
        transform: translateY(-20px);
        transition: 0.75s;
      }
    `;

    const CardImage = styled.img`
      width: 100%;
      height: 50%;
      object-fit: cover;
      border-radius: 7px 7px 0 0;
    `;

    const CardContent = styled.div`
      height: 50%;
      padding: 10px;
    `;

    const handleUpdateVisitCount = async (itemId) => {
        try {
            const url = `http://223.130.139.67:8000/Issue/${itemId}/`;
            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ visite_count: newVisitCount + 1 }),
            });

            if (!response.ok) {
                throw new Error("방문 횟수 업데이트에 실패했습니다.");
            }

            const jsonData = await response.json();
            console.log("방문 횟수 업데이트 성공:", jsonData);
            setNewVisitCount(newVisitCount + 1);
        } catch (error) {
            console.error("방문 횟수 업데이트 중 오류가 발생했습니다:", error);
        }
    };

    const handleCreateCookie = async (itemId) => {
        if (!cookies.myCookie) {
            const oneMinuteFromNow = new Date();
            oneMinuteFromNow.setTime(oneMinuteFromNow.getTime() + 60000);

            setCookie("myCookie", "내가 만든 쿠키", { expires: oneMinuteFromNow });
            console.log("쿠키가 생성되었습니다:", cookies.myCookie);

            // 방문 횟수 증가 요청 비동기적으로 처리
            await handleUpdateVisitCount(itemId);
        } else {
            console.log("쿠키가 이미 존재합니다:", cookies.myCookie);
        }
    };



    return (
        <CardContainer>
            {data.map((item) => (
                <CardItem key={item.id} style={itemStyle}>
                    <CardImage src={item.img} alt="" />
                    <CardContent>
                        <h2>
                            {getCountryFlag(item.country)} {truncateTitle(item.title, 10)}
                        </h2>
                        <p>Country: {item.country}</p>
                        <p>
                            <button onClick={() => handleCreateCookie(item.id)}>
                                링크를 클릭해주세요
                            </button>
                        </p>
                    </CardContent>
                </CardItem>
            ))}
        </CardContainer>
    )
}
