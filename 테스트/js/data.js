// Minnamitna (민나믿나) Initial Dummy Data & Model Definitions
window.MinnamitnaData = {
  categories: [
    { id: 'all', name: '전체' },
    { id: 'event', name: '오프라인 행사' },
    { id: 'anime', name: '애니메이션' },
    { id: 'vtuber', name: '버튜버' },
    { id: 'figure', name: '피규어' },
    { id: 'goods', name: '굿즈' },
    { id: 'collab', name: '콜라보 카페' }
  ],
  keywords: [
    '애니메이션', '버튜버', '피규어', '굿즈', '일러스트', 
    '콜라보 카페', '코스프레', '홀로라이브', '니지산지', '원신', 
    '블루 아카이브', '체인소맨', '스텔라이브', '보컬로이드'
  ],
  events: [
    {
      id: 'evt-1',
      title: 'AGF 2026 (Anime X Game Festival)',
      category: 'event',
      thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
      startDate: '2026-12-05',
      endDate: '2026-12-06',
      location: 'KINTEX 제1전시장 3, 4, 5홀',
      organizer: 'AGF 2026 조직위원회',
      officialUrl: 'https://www.agfkorea.com',
      keywords: ['애니메이션', '게임', '버튜버', '피규어', '굿즈'],
      verificationStatus: 'official', // official | sourced | user | pending
      description: '국내 최대 규모의 애니메이션 및 게임 페스티벌! 국내외 유명 서브컬처 콘텐츠와 성우 스테이지, 한정 굿즈가 총집합합니다.',
      booths: [
        {
          id: 'bth-101',
          name: '블루 아카이브 공식 샬레 스토어',
          boothNumber: 'A-01',
          keywords: ['블루 아카이브', '굿즈', '피규어'],
          inventoryStatus: 'low', // enough | normal | low | soldout | unknown
          waitMinutes: 45,
          reportedAt: '10분 전',
          participationDates: ['12.05(토)', '12.06(일)']
        },
        {
          id: 'bth-102',
          name: '홀로라이브 프로덕션 공식 팝업',
          boothNumber: 'B-08',
          keywords: ['버튜버', '홀로라이브', '굿즈'],
          inventoryStatus: 'normal',
          waitMinutes: 20,
          reportedAt: '5분 전',
          participationDates: ['12.05(토)', '12.06(일)']
        },
        {
          id: 'bth-103',
          name: '굿스마일 컴퍼니 코리아',
          boothNumber: 'C-15',
          keywords: ['피규어', '넨도로이드'],
          inventoryStatus: 'enough',
          waitMinutes: 10,
          reportedAt: '15분 전',
          participationDates: ['12.05(토)', '12.06(일)']
        },
        {
          id: 'bth-104',
          name: '동인 서클 [별빛 아뜰리에]',
          boothNumber: 'D-22',
          keywords: ['일러스트', '굿즈'],
          inventoryStatus: 'soldout',
          waitMinutes: 0,
          reportedAt: '방금 전',
          participationDates: ['12.05(토)']
        }
      ]
    },
    {
      id: 'evt-2',
      title: '제6회 일러스타 페스 (ILLUSTAR FES)',
      category: 'event',
      thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
      startDate: '2026-10-18',
      endDate: '2026-10-19',
      location: 'SETEC 전관 (학여울역)',
      organizer: '일러스타 페스 사무국',
      officialUrl: 'https://illustar.net',
      keywords: ['일러스트', '굿즈', '동인', '버튜버'],
      verificationStatus: 'official',
      description: '창작자와 팬들이 함께하는 대규모 서브컬처 동인 일러스트 전시 및 온·오프라인 굿즈 교류 행사입니다.',
      booths: [
        {
          id: 'bth-201',
          name: '스텔라이브 2차 창작 연합 부스',
          boothNumber: '가-12',
          keywords: ['버튜버', '스텔라이브', '굿즈'],
          inventoryStatus: 'low',
          waitMinutes: 35,
          reportedAt: '8분 전',
          participationDates: ['10.18(토)', '10.19(일)']
        },
        {
          id: 'bth-202',
          name: '프로젝트 세카이 팬아트 공방',
          boothNumber: '나-04',
          keywords: ['보컬로이드', '굿즈'],
          inventoryStatus: 'enough',
          waitMinutes: 5,
          reportedAt: '12분 전',
          participationDates: ['10.18(토)', '10.19(일)']
        }
      ]
    },
    {
      id: 'evt-3',
      title: '극장판 [체인소맨 : 레제편] 특전 상영회',
      category: 'anime',
      thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80',
      startDate: '2026-10-01',
      endDate: '2026-10-20',
      location: '메가박스 코엑스 / 홍대입구 등 전국',
      organizer: '애니플러스 / 메가박스',
      officialUrl: 'https://www.megabox.co.kr',
      keywords: ['애니메이션', '체인소맨', '특전'],
      verificationStatus: 'sourced',
      description: '1~3주차 연속 오리지널 색지 및 A3 포스터 증정! 팬들이 기다려온 레제편 특별 로드쇼 개봉.',
      booths: []
    },
    {
      id: 'evt-4',
      title: '홀로라이브 EN x 홍대 아니플러스 콜라보 카페',
      category: 'collab',
      thumbnail: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&auto=format&fit=crop&q=80',
      startDate: '2026-09-20',
      endDate: '2026-11-02',
      location: '서울 마포구 애니플러스샵 홍대점',
      organizer: 'ANIPLUS SHOP',
      officialUrl: 'https://shop.aniplustv.com',
      keywords: ['버튜버', '홀로라이브', '콜라보 카페', '굿즈'],
      verificationStatus: 'official',
      description: '멤버별 시그니처 드링크, 디저트 세트 및 한정 아크릴 스탠드, 코스터 16종 랜덤 증정.',
      booths: []
    },
    {
      id: 'evt-5',
      title: '원더 페스티벌 코리아 2026 (Wonder Festival)',
      category: 'figure',
      thumbnail: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
      startDate: '2026-11-14',
      endDate: '2026-11-15',
      location: 'COEX Hall D',
      organizer: '원페 코리아 추진위원회',
      officialUrl: 'https://wonfes.jp',
      keywords: ['피규어', '원형사', '레진키트'],
      verificationStatus: 'user',
      description: '세계 최고의 조형·피규어 제전! 국내외 정상급 원형사들의 미공개 원형 및 한정 판매 킷 공개.',
      booths: []
    }
  ],
  communityPosts: [
    {
      id: 'post-1',
      author: '미나미덕후',
      authorAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=minami',
      type: 'review', // talk | question | review | info
      title: '지난 일러스타 페스 굿즈 정리 & 후기 공유합니다!',
      content: '첫날 오전 8시부터 줄 섰는데 인기 부스는 11시 전에 주요 아크릴 품절되더라고요 ㅠㅠ 다들 타겟 순례 동선 짤 때 메인 장르 부스부터 무조건 1순위로 두세요!',
      images: ['https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&auto=format&fit=crop&q=80'],
      keywords: ['일러스타 페스', '굿즈', '후기'],
      likeCount: 42,
      commentCount: 9,
      createdAt: '2시간 전'
    },
    {
      id: 'post-2',
      author: '시구레우이팬',
      authorAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=shigure',
      type: 'info',
      title: 'AGF 2026 부스 배치도 및 셔틀버스 정보 요약',
      content: '킨텍스 제1전시장 셔틀 운행 시간표랑 대화역 1번 출구 도보 경로 공유합니다. 현장 통신장애 대비해서 모바일 티켓은 꼭 미리 캡처해두세요!',
      images: [],
      keywords: ['AGF', '팁', '교통'],
      likeCount: 88,
      commentCount: 23,
      createdAt: '5시간 전'
    },
    {
      id: 'post-3',
      author: '키보토스센세',
      authorAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=kivotos',
      type: 'talk',
      title: '이번 주말 홍대 콜라보 카페 같이 갈 사람 있나요?',
      content: '특전 컵홀더 교환도 하고 포토카드 나눔도 할 겸 토요일 오후 2시 타임 구합니다~ 편하게 댓글 남겨주세요!',
      images: [],
      keywords: ['콜라보 카페', '홍대', '동행'],
      likeCount: 14,
      commentCount: 6,
      createdAt: '어제'
    }
  ],
  offRecordQuestions: [
    {
      id: 'q-1',
      author: '익명오시',
      question: 'AGF 토요일 현장권 구매하면 몇 시쯤 입장 가능한가요?',
      answer: '공식 가이드라인에 따르면 사전 예매자 입장 완료 후 11:30부터 잔여 현장권 입장이 시작됩니다. 단, 조기 매진될 가능성이 높으니 9시 전 대기를 권장합니다.',
      source: 'AGF 2026 공식 FAQ 공지사항 (agfkorea.com/notice/14)',
      status: 'official', // official | sourced | user | pending
      verifiedCount: 38
    },
    {
      id: 'q-2',
      author: '피규어탐험가',
      question: '메가박스 체인소맨 1주차 특전 색지 아직 수량 남아있나요?',
      answer: '홍대입구점 기준 15일 14:00 잔여수량 150장 확인 제보 있었습니다. 코엑스는 오늘 오전 소진되었습니다.',
      source: '현장 관람객 다수 영수증 인증 제보',
      status: 'user',
      verifiedCount: 12
    }
  ],
  defaultBudget: {
    eventId: 'evt-1',
    eventTitle: 'AGF 2026 (Anime X Game Festival)',
    ticket: 27000,
    transport: 12000,
    food: 15000,
    goods: [
      { id: 'g-1', name: '샬레 공식 아크릴 디오라마', price: 28000, booth: 'A-01' },
      { id: 'g-2', name: '홀로라이브 한정 B2 태피스트리', price: 35000, booth: 'B-08' },
      { id: 'g-3', name: '동인 일러스트집 & 엽서세트', price: 18000, booth: 'D-22' }
    ],
    other: 5000
  },
  defaultThemeLabs: [
    {
      id: 'lab-1',
      eventId: 'evt-2',
      eventTitle: '제5회 일러스타 페스 방문기',
      date: '2026-05-12',
      images: ['https://images.unsplash.com/photo-1563089145-599997674d42?w=500&auto=format&fit=crop&q=80'],
      review: '원하던 작가님 신간 전부 구매 성공! 일찍 가서 대기한 보람이 있었습니다. 부스 동선 미리 짠 게 신의 한 수였네요.',
      purchasedGoods: ['신간 일러스트북 2종', '아크릴 키링 4개', '장패드'],
      amountSpent: 84000,
      isPublic: true,
      likeCount: 31
    }
  ]
};
