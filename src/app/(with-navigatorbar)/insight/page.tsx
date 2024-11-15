"use client";
import React, { useState, useEffect } from "react";

export default function Page() {
  const [latestNews, setLatestNews] = useState(null); // 최신 뉴스 데이터를 저장할 상태
  const [loading, setLoading] = useState(false); // 로딩 상태 관리

  // Function to call the API
  const fetchLatestNews = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/latestNews`
      ); // API 엔드포인트
      if (!response.ok) {
        throw new Error("Failed to fetch the latest news");
      }

      const data = await response.json(); // JSON 파싱
      console.log("Latest News:", data);

      // 상태 업데이트: 최신 뉴스 데이터를 저장
      setLatestNews(data);
    } catch (error) {
      console.error("Error fetching the latest news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 페이지 로드 시 최신 뉴스 데이터를 가져옴
    fetchLatestNews();
  }, []);

  return (
    <div className="flex flex-row justify-around min-h-screen">
      {/* Left Navigator */}
      <div className="flex flex-col items-center justify-evenly">
        <button
          className="w-full px-4 py-2 bg-yellow-400 text-black font-semibold border border-black"
          onClick={fetchLatestNews} // 버튼 클릭 시 최신 뉴스 가져오기
        >
          TODAY AI REPORT
        </button>
        <button className="text-left text-black">MY SCRAP</button>
      </div>

      {/* Right Content */}
      <div>
        <div className="h-[85vh] w-[70vw] border-2 border-black bg-white overflow-auto p-4">
          {loading ? (
            <p>Loading...</p>
          ) : latestNews ? (
            <div>
              <h2 className="font-bold text-lg mb-4">Latest News Summary:</h2>
              {/* HTML 태그 렌더링 */}
              <div
                dangerouslySetInnerHTML={{
                  __html: latestNews.newsSummation,
                }}
              />
              <p className="text-sm text-gray-500 mt-4">
                Created At: {new Date(latestNews.createdAt).toLocaleString()}
              </p>
            </div>
          ) : (
            <p>No data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
