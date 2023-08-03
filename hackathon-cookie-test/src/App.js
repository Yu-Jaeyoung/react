import React, { useEffect, useState } from "react";
import Card from "./Card";

const App = () => {
  const [data, setData] = useState([]);
  const itemStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "10px",
  };

  const truncateTitle = (title, maxLength) => {
    if (!title) return ''; // title이 없는 경우 빈 문자열 반환
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + "...";
    }
    return title;
  };

  const getCountryFlag = (country) => {
    // 각 국가에 해당하는 국기 이모티콘 코드 포인트를 정의
    const countryFlags = {
      미국: "\uD83C\uDDFA\uD83C\uDDF8", // 🇺🇸
      일본: "\uD83C\uDDEF\uD83C\uDDF5", // 🇯🇵
      인도: "\uD83C\uDDEE\uD83C\uDDF3", // 🇮🇳
      프랑스: "\uD83C\uDDEB\uD83C\uDDF7", // 🇫🇷
      독일: "\uD83C\uDDE9\uD83C\uDDEA", // 🇩🇪
      영국: "\uD83C\uDDEC\uD83C\uDDE7", // 🇬🇧
      이탈리아: "\uD83C\uDDEE\uD83C\uDDF9", // 🇮🇹
      대한민국: "\uD83C\uDDF0\uD83C\uDDF7", // 🇰🇷
      베트남: "\uD83C\uDDFB\uD83C\uDDF3", // 🇻🇳
    };

    return countryFlags[country] || "";
  };

  const getData = async () => {
    try {
      const response = await fetch("http://223.130.139.67:8000/Issue/");
      const jsonData = await response.json();
      const initData = jsonData.slice(0, 20).map((item) => ({
        id: item.id,
        title: item.title,
        country: item.country,
        url: item.url,
        img: item.img,
        visit_count: item.visite_count, // 수정 필요
        created_date: item.created_at,
      }));
      setData(initData);
      console.log(initData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
      <div>
        <Card
            data={data}
            itemStyle={itemStyle}
            truncateTitle={truncateTitle}
            getCountryFlag={getCountryFlag}
        />
      </div>
  );
};

export default App;
