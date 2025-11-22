export interface Pet {
    id: number;
    imageSrc: string;
    breed: string;
    location: string;
    color: string;
    birthYear: string;
    weight: number;
    status: string;
    tags: string[];
}
  
export const pets: Pet[] = [
    {
        id: 1,
        imageSrc: "/1.jpg",
        breed: "믹스견",
        location: "서울시 강남구 역삼동",
        color: "흰색",
        birthYear: "2023년에 태어났어요!",
        weight: 5,
        status: "보호중",
        tags: ["수컷", "중성화 완료"],
    },
    {
        id: 2,
        imageSrc: "/2.jpeg",
        breed: "코리안숏헤어",
        location: "서울시 송파구 잠실동",
        color: "갈색/흰색",
        birthYear: "2022년에 태어났어요!",
        weight: 4,
        status: "보호중",
        tags: ["암컷", "중성화 완료"],
    },
    {
        id: 3,
        imageSrc: "/3.jpeg",
        breed: "포메라니안",
        location: "경기도 성남시 분당구",
        color: "황금색",
        birthYear: "2021년에 태어났어요!",
        weight: 5,
        status: "보호중",
        tags: ["수컷", "중성화 미완료"],
    },
    {
        id: 4,
        imageSrc: "/4.jpg",
        breed: "러시안블루",
        location: "서울시 마포구 상암동",
        color: "검정색",
        birthYear: "2023년에 태어났어요!",
        weight: 8,
        status: "입양대기",
        tags: ["수컷", "중성화 완료"],
      },
      {
        id: 5,
        imageSrc: "/5.jpeg",
        breed: "시츄",
        location: "서울시 서초구 반포동",
        color: "회색",
        birthYear: "2021년에 태어났어요!",
        weight: 5,
        status: "보호중",
        tags: ["암컷", "조용함"],
      },
      {
        id: 6,
        imageSrc: "/6.jpg",
        breed: "하바니즈",
        location: "경기도 고양시 일산동구",
        color: "갈색/흰색",
        birthYear: "2020년에 태어났어요!",
        weight: 7,
        status: "보호중",
        tags: ["암컷", "활발함"],
      },
      {
        id: 7,
        imageSrc: "/7.jpeg",
        breed: "토이푸들",
        location: "인천시 연수구 송도동",
        color: "갈색",
        birthYear: "2019년에 태어났어요!",
        weight: 4,
        status: "보호중",
        tags: ["수컷", "털많음"],
      },
      {
        id: 8,
        imageSrc: "/8.jpg",
        breed: "먼치킨",
        location: "서울시 동작구 흑석동",
        color: "황금색",
        birthYear: "2025년에 태어났어요!",
        weight: 2,
        status: "입양대기",
        tags: ["암컷", "중성화 미완료"],
      },
];  