import React, { useEffect, useState } from "react";
import { Map } from 'react-kakao-maps-sdk';
import { mockDatas } from "../mockdata";

const KakaoMap = ({ markers, selectedCategories }) => {
    useEffect(() => {
        const container = document.getElementById('kakao-map');
        const options = {
            center: new window.kakao.maps.LatLng(37.282, 127.045),
            level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);

        if (selectedCategories.length === 0) {
            mockDatas.forEach(data => {
                const { latitude, longitude, category } = data;
      
                // 마커 생성
                const marker = new window.kakao.maps.Marker({
                    map,
                    position: new window.kakao.maps.LatLng(latitude, longitude),
                    image: new window.kakao.maps.MarkerImage(
                        `/public/thunder_${category}.png`, // 아이콘 이미지 경로
                        new window.kakao.maps.Size(60, 60),
                    ),
                });
      
                marker.setMap(map);
            });
        }

        markers.forEach(data => {
            const { latitude, longitude, category } = data;

            // 선택된 카테고리만 표시
            if (selectedCategories.includes(category)) {
                const marker = new window.kakao.maps.Marker({
                    map,
                    position: new window.kakao.maps.LatLng(latitude, longitude),
                    image: new window.kakao.maps.MarkerImage(
                        `/public/thunder_${category}.png`, // 아이콘 이미지 경로
                        new window.kakao.maps.Size(60, 60),
                    ),
                });

                marker.setMap(map);
            }
        });
    }, [markers, selectedCategories]);

    return <div id="kakao-map" style={{ width: '100%', height: '100%' }}></div>;

};

export default KakaoMap;