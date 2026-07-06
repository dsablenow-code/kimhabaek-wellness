// 1. 변증 데이터 및 질문 구성
const DIAGNOSIS_QUESTIONS = [
    { id: 1, type: "어혈", text: "생리 시 덩어리 피가 많이 섞여 나오거나 갈색 찌꺼기가 나오나요?" },
    { id: 2, type: "어혈", text: "생리통이 콕콕 찌르거나 칼로 베이는 듯 극심하며 진통제로도 잘 안 듣나요?" },
    { id: 3, type: "혈허", text: "앉았다 일어날 때 눈앞이 핑 돌거나 두통/어지러움이 자주 있나요?" },
    { id: 4, type: "혈허", text: "입술이 계절에 상관없이 항상 트고 피부가 유독 거칠고 건조한가요?" },
    { id: 5, type: "양허", text: "평소 아랫배나 손발이 얼음장처럼 차고 추위를 유독 심하게 타나요?" },
    { id: 6, type: "양허", text: "외출 후 급격히 에너지가 고갈되어 일찍 귀가할 정도로 극도의 피로를 느끼나요?" },
    { id: 7, type: "습담", text: "아침과 저녁의 체중 차이가 크고 몸이나 다리가 쉽게 붓나요?" },
    { id: 8, type: "습담", text: "생리 전에 유독 폭식/과식을 하거나 단것/식욕이 크게 당기나요?" },
    { id: 9, type: "기울", text: "스트레스를 받거나 신경을 쓰면 생리통 강도가 눈에 띄게 달라지나요?" },
    { id: 10, type: "기울", text: "생리 전 짜증이 폭발하거나 감정 기복이 심해 가슴이 답답하고 한숨을 자주 쉬나요?" }
];

// 2. 한방 변증별 성격 및 원료 맵핑
const CONSTITUTION_INFO = {
    "어혈": {
        name: "어혈형 (혈행 불통)",
        desc: "혈액 순환이 쉽게 막히고 골반강 내 혈액이 정체되어 통증이 콕콕 찌르듯 강하게 나타나는 유형입니다. 생리혈의 덩어리가 많고 안색이 어두운 편입니다.",
        ingredients: ["당귀", "천궁", "구절초", "홍화"],
        baseTea: "구절초 작약차",
        flavor: "구수한 꽃 향과 은은한 단맛, 부드러운 목 넘김",
        teaDesc: "골반강 내 혈액 순환을 활발히 하고 자궁 평활근 이완을 돕는 구절초를 베이스로, 긴장된 근육을 이완하는 작약을 혼합하여 생리 전후 통증과 혈행을 강력히 케어합니다.",
        routine: "생리 예정일 5일 전부터 하루 2회(오전 식후, 저녁 취침 전) 따뜻하게 우려 마시면 아랫배 순환에 큰 도움을 줍니다."
    },
    "혈허": {
        name: "혈허형 (에너지 부족)",
        desc: "체내 영양과 혈액이 전체적으로 부족하여 쉽게 피로해지며 피부, 손발톱, 입술이 쉽게 건조해지는 유형입니다. 생리가 끝날 때쯤 컨디션이 저하되는 경향이 있습니다.",
        ingredients: ["당귀", "숙지황", "작약", "대추"],
        baseTea: "대추 당귀차",
        flavor: "은은한 단맛과 약재 특유의 깊고 편안한 향",
        teaDesc: "체내 영양 물질을 보충하는 대추와 보혈(補血)의 대표 약재인 당귀를 혼합하여, 생리 주기로 인해 소모된 혈액과 진액을 보충하고 전신 온기를 회복시킵니다.",
        routine: "생리 시작 직후부터 생리가 끝난 후 7일간 매일 아침 따뜻하게 섭취하시는 것이 가장 효과적입니다."
    },
    "양허": {
        name: "양허형 (냉증/기력 고갈)",
        desc: "우리 몸의 난로 역할을 하는 양기가 부족하여 몸과 아랫배가 얼음장처럼 차갑고 남들에 비해 추위를 극도로 타며 면역력이 크게 저하된 유형입니다.",
        ingredients: ["인삼", "계피", "생강", "감초"],
        baseTea: "인삼 생강계피차",
        flavor: "매콤하고 알싸한 생강 맛에 달콤한 감초 향의 어우러짐",
        teaDesc: "몸의 심부 온도를 올려주는 생강과 계피를 베이스로 하며, 원기를 회복시키는 인삼을 더해 만성 냉증을 완화하고 소화와 대사 능력을 촉진합니다.",
        routine: "평소 매일 오전 시간에 1잔씩 따뜻하게 복용하는 데일리 습관으로 자리 잡으면 냉증 개선에 탁월합니다."
    },
    "습담": {
        name: "습담형 (노폐물 정체)",
        desc: "체내 대사가 잘 이루어지지 않아 불필요한 노폐물(습담)이 몸에 쌓여 잘 붓고, 몸이 무겁고 식욕이 과도하게 증가하는 유형입니다. 비만 혹은 부종이 동반됩니다.",
        ingredients: ["귤피", "율무", "포공영", "맥아"],
        baseTea: "귤피 율무차",
        flavor: "상큼한 귤 향과 율무 특유의 고소한 바디감",
        teaDesc: "몸속 불필요한 수분 배출을 돕고 부종을 빼주는 율무에, 막힌 기를 통하게 하여 소화를 돕는 귤피(진피)를 배합해 몸을 가볍게 만들어 줍니다.",
        routine: "부종이 심해지는 황체기(생리 전 14일) 동안 커피 대신 수시로 우려 음용하는 것을 적극 권장합니다."
    },
    "기울": {
        name: "기울형 (스트레스 민감)",
        desc: "정서적인 스트레스로 인해 기운이 소통되지 못하고 가로막혀, 생리 전 감정 기복이 유독 심하고 아랫배나 가슴이 팽만하며 한숨을 자주 쉬는 유형입니다.",
        ingredients: ["박하", "향부자", "목향", "매실"],
        baseTea: "박하 향부자차",
        flavor: "화하고 상쾌한 민트의 향과 쌉싸름한 한방 향",
        teaDesc: "가로막힌 기운을 맑게 흩어주는 박하엽과 뭉친 울화를 다스려 여성 호르몬 안정을 돕는 한의학 핵심 약재 향부자를 혼합하여 정서적 이완을 돕습니다.",
        routine: "가슴이 답답하고 기분 기복이 심해지는 오후 시간대나 생리 일주일 전에 마셔 기분 전환과 신경 안정을 도모하세요."
    }
};

// 3. 상황별 조언 텍스트 데이터베이스
const SITUATION_GUIDES = {
    normal: {
        title: "기본 생활 가이드",
        desc: "생리 주기에 따라 무리하지 않는 선에서 균형 잡힌 생활을 유지하세요. 찬물 샤워나 찬 음료를 피하고 아랫배를 따뜻하게 하는 것이 좋습니다."
    },
    exam: {
        title: "시험기간 (두뇌 회전 & 스트레스 케어)",
        desc: "시험 스트레스로 목과 어깨의 긴장이 심해지고 머리가 맑지 못할 수 있습니다. 뇌 혈류 순환을 돕고 두뇌 피로를 개선하기 위해 카페인 음료 대신 따뜻한 대추차나 박하차를 자주 음용하세요. 목 뒤에 가벼운 온열 찜질을 병행하면 집중력 향상에 시너지를 냅니다."
    },
    marathon: {
        title: "마라톤 (고강도 신체 활동 & 젖산 분해)",
        desc: "근육 피로와 관절 부하가 심해지는 기간입니다. 젖산 분해를 돕는 구연산 성분이 풍부한 매실이나 모과를 우려 복용하여 회복을 앞당기고, 하체 골반 고관절 부위를 중심으로 깊은 스트레칭을 15분 이상 진행하세요. 생리 중 고강도 달리기는 가급적 피하길 권장합니다."
    },
    pregnancy: {
        title: "임신준비 (착상 환경 구축 & 체온 케어)",
        desc: "자궁 내막의 혈류량을 증가시키고 착상 환경을 따뜻하게 만드는 것이 가장 중요한 시기입니다. 쑥, 구절초, 당귀 처럼 보혈(補血) 및 혈행 개선 효과가 검증된 성분을 따뜻하게 마시고 찬 에어컨 바람이나 찬 음식을 차단하세요. 매일 저녁 15분간 미지근한 물로 족욕을 해 전신 순환을 돕는 것도 좋습니다."
    },
    recuperation: {
        title: "수술요양 (소모된 기혈 보강 & 비위 돋우기)",
        desc: "수술이나 질병으로 소모된 원기와 정체된 어혈을 맑게 다스릴 요양 시기입니다. 비위의 기운을 다스려 소화 흡수율을 높여주는 인삼이나 귤피(진피)차를 연하게 우려 섭취하시고, 소화가 잘되는 미음 위주의 식단을 구성하세요. 격렬한 육체 운동은 절대 금지하며 누워서 충분한 숙면을 취해야 합니다."
    },
    stress: {
        title: "극심스트레스 (막힌 기운 소통 & 감정 해울)",
        desc: "정서적 울화로 기운이 가로막혀 가슴 답답함과 소화 불량이 동반되는 상태입니다. 가슴 속에 가로막힌 열을 가볍게 흩어주는 박하와 한방 해울(解鬱) 핵심인 향부자를 음용하며, 하루 5분씩 편안한 자세로 눈을 감고 배가 크게 움직이도록 복식호흡을 진행해 자율신경계 균형을 되찾으세요."
    },
    insomnia: {
        title: "잠못자요 (심장 안정 & 신경 렉스)",
        desc: "심장이 두근거리거나 생각과 잡념이 많아 뇌가 각성되어 있는 상태입니다. 뇌 세포 안정을 돕는 L-테아닌이 풍부한 웰니스 성분과 마음을 차분히 보듬어 주는 산조인(볶은 씨앗)을 복용하세요. 취침 2시간 전부터 스마트폰 화면을 차단하고 어깨 주위를 마사지하여 긴장을 풀어주어야 합니다."
    }
};

// 4. SCI급 학술 연구 논문 데이터베이스 (Research Evidence)
const paperEvidenceDB = {
    "PCOS": [
        {
            title: "한약재 복합물과 식물성 에스트로겐의 호르몬 감수성 조절 기전 연구",
            source: "Journal of Ethnopharmacology, 2024",
            summary: "당귀와 작약 추출물 내 활성 성분이 난소 내 에스트로겐 수용체(ER-beta) 결합을 촉진하고 혈중 LH/FSH 비율을 정상화하여 배란 장애 및 다낭성 난소 양상 개선에 기여함을 입증함.",
            lifestyleTip: "💡 추천 가이드: 인슐린 저항성을 예방하기 위해 정제 탄수화물을 제한하고, 주 150분 이상의 유산소 운동을 병행하면 웰니스 차와 시너지를 낼 수 있습니다."
        }
    ],
    "어혈": [
        {
            title: "구절초 추출물의 자궁 평활근 수축 억제 활성 및 진통 효능 기전 분석",
            source: "Korean Journal of Herbology, 2023",
            summary: "생리통 모델에서 구절초 추출물이 칼슘 채널 차단을 통해 옥시토신으로 유도된 자궁 평활근의 과도한 수축 수치를 최대 61% 유의미하게 억제하고 염증성 인자(COX-2)를 하향 조절함을 확인.",
            lifestyleTip: "💡 추천 가이드: 생리 예정일 5일 전부터는 하복부에 아침저녁 20분씩 온열 패치나 핫팩을 부착하여 골반강 평활근을 이완해 주세요."
        }
    ],
    "혈허": [
        {
            title: "대추-당귀 복합 처방의 조혈 작용 및 말초 혈행 개선 효능",
            source: "Phytotherapy Research, 2022",
            summary: "당귀의 Decursin 성분이 적혈구 생성 인자(EPO) 발현을 유도하여 만성 혈허 유도 동물 모델에서 헤모글로빈 수치를 정상 수준으로 회복하고, 말초 미세 혈류 순환 속도를 28% 가속시킴.",
            lifestyleTip: "💡 추천 가이드: 생리가 끝난 후에는 철분과 비타민 B12가 풍부한 붉은 살코기, 시금치 섭취를 늘리고 저혈압 방지를 위해 수분을 충분히 보충하세요."
        }
    ],
    "양허": [
        {
            title: "생강-계피 추출물의 체내 에너지 대사 활성화 및 심부 체온 조절 분석",
            source: "Phytomedicine, 2023",
            summary: "진저롤(Gingerol)과 신남알데하이드(Cinnamaldehyde)의 열 생성 작용이 갈색지방 세포의 활성화를 유도하고, 심부 체온을 유의미하게 상승시켜 말초 냉증 및 면역 저하를 차단하는 경로 입증.",
            lifestyleTip: "💡 추천 가이드: 아침 기상 직후 찬물 음용을 피하고, 족욕을 통해 신부 체 온도를 유지하는 루틴을 일상화하십시오."
        }
    ],
    "습담": [
        {
            title: "율무 및 진피 추출물의 체내 노폐물 배출 및 림프 순환 촉진 효과",
            source: "Journal of Natural Medicines, 2022",
            summary: "율무 내 Coixol 성분이 신장 사구체 여과율을 높여 염분 및 노폐물 배출을 촉진하고, 진피(귤껍질) 추출물이 림프 및 위장관 운동을 활성화하여 만성 부종과 복부 팽만감을 완화함.",
            lifestyleTip: "💡 추천 가이드: 부종이 올라오는 생리 일주일 전부터는 밀가루와 짠 음식을 완전히 통제하고, 오전 가벼운 폼롤러 스트레칭을 10분 진행해 주세요."
        }
    ],
    "기울": [
        {
            title: "향부자 및 박하 향기 요법의 자율신경계 안정 및 스트레스 호르몬 감소 유효성",
            source: "Alternative Therapies in Medicine, 2024",
            summary: "향부자 에센셜 성분이 가바(GABA) 수용체 활성을 자극하여 뇌 내 코티솔(스트레스 호르몬) 농도를 35% 감소시키고 교감신경의 과흥분을 억제하여 PMS 감정 변화 및 생리통 완화에 기여함.",
            lifestyleTip: "💡 추천 가이드: 기분 기복이 심해질 때는 하루 5분씩 복식 호흡을 실시하고 커피 대신 천연 허브티의 아로마를 맡으며 섭취하는 리츄얼을 만드세요."
        }
    ]
};

// 5. 애플리케이션 상태 관리 (State)
let appState = {
    userProfile: {
        painPoint: "DYSMENORRHEA",
        constitution: "",          // 변증 체질 (최초 판정)
        lastPeriodDate: "2026-06-25",
        cycleLength: 28,
        dailyLogs: []              // 데일리 컨디션 로그
    },
    currentView: "dashboard-view",
    currentQuestionIndex: 0,
    answers: {},
    currentSituation: "normal",    // 가이드 상황 탭 상태
    calendarYear: 2026,
    calendarMonth: 6 // 0-indexed (6 = 7월)
};

// 6. 초기화 함수
document.addEventListener("DOMContentLoaded", () => {
    loadData();
    initNavigation();
    initForms();
    initModal();
    initSituationTabs();
    initCalendarNav();
    
    // 현재 년/월을 마지막 생리일 기준으로 디폴트 셋업
    const lastPDate = new Date(appState.userProfile.lastPeriodDate);
    appState.calendarYear = lastPDate.getFullYear();
    appState.calendarMonth = lastPDate.getMonth();

    if (!appState.userProfile.constitution) {
        switchView("diagnosis-view");
        document.getElementById("mainNav").style.display = "none";
        setupDiagnosis();
    } else {
        switchView("dashboard-view");
        document.getElementById("mainNav").style.display = "flex";
        renderDashboard();
    }
});

// 7. 내비게이션 및 뷰 스위칭
function initNavigation() {
    const navButtons = document.querySelectorAll(".nav-btn:not(.reset-btn)");
    navButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            navButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            switchView(btn.dataset.target);
        });
    });

    document.getElementById("reDiagnoseBtn").addEventListener("click", () => {
        if(confirm("기존 자가진단 기록과 데일리 로그가 리셋됩니다. 다시 진단하시겠습니까?")) {
            localStorage.clear();
            location.reload();
        }
    });
}

function switchView(viewId) {
    appState.currentView = viewId;
    const views = document.querySelectorAll(".content-view");
    views.forEach(view => {
        view.classList.remove("active");
        if (view.id === viewId) {
            view.classList.add("active");
        }
    });

    if (viewId === "dashboard-view") {
        renderDashboard();
    } else if (viewId === "tea-view") {
        renderTeaRecommendations();
    } else if (viewId === "science-view") {
        // 인포그래픽 바 애니메이션 리셋/구동
        const bar = document.querySelector(".fill-blue");
        if (bar) {
            bar.style.width = "0%";
            setTimeout(() => bar.style.width = "35%", 100);
        }
    }
}

// 8. 자가진단 구현
function setupDiagnosis() {
    const goStep2Btn = document.getElementById("goStep2Btn");
    const backStep1Btn = document.getElementById("backStep1Btn");
    const nextQuestionBtn = document.getElementById("nextQuestionBtn");

    goStep2Btn.addEventListener("click", () => {
        const selectedPain = document.querySelector('input[name="painPoint"]:checked').value;
        appState.userProfile.painPoint = selectedPain;
        
        document.getElementById("diag-step-1").classList.remove("active");
        document.getElementById("diag-step-2").classList.add("active");
        
        appState.currentQuestionIndex = 0;
        renderQuestion();
    });

    backStep1Btn.addEventListener("click", () => {
        if (appState.currentQuestionIndex > 0) {
            appState.currentQuestionIndex--;
            renderQuestion();
        } else {
            document.getElementById("diag-step-2").classList.remove("active");
            document.getElementById("diag-step-1").classList.add("active");
        }
    });

    nextQuestionBtn.addEventListener("click", () => {
        const selectedChoice = document.querySelector(".choice-btn.selected");
        if (!selectedChoice) {
            alert("질문에 대한 답변을 선택해 주세요.");
            return;
        }

        const score = parseInt(selectedChoice.dataset.value);
        const currentQ = DIAGNOSIS_QUESTIONS[appState.currentQuestionIndex];
        appState.answers[currentQ.id] = score;

        if (appState.currentQuestionIndex < DIAGNOSIS_QUESTIONS.length - 1) {
            appState.currentQuestionIndex++;
            renderQuestion();
        } else {
            submitDiagnosis();
        }
    });
}

function renderQuestion() {
    const q = DIAGNOSIS_QUESTIONS[appState.currentQuestionIndex];
    const container = document.getElementById("questionContainer");
    
    const percent = ((appState.currentQuestionIndex) / DIAGNOSIS_QUESTIONS.length) * 100;
    document.getElementById("progressBar").style.width = `${percent}%`;

    container.innerHTML = `
        <div class="question-card-inner">
            <p class="question-text">${q.id}. ${q.text}</p>
            <div class="choice-buttons">
                <button class="choice-btn" data-value="0">아닙니다 (없음)</button>
                <button class="choice-btn" data-value="1">가끔 그렇습니다 (보통)</button>
                <button class="choice-btn" data-value="2">자주 그렇습니다 (심함)</button>
            </div>
        </div>
    `;

    const choiceButtons = container.querySelectorAll(".choice-btn");
    choiceButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            choiceButtons.forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
        });
    });

    if (appState.answers[q.id] !== undefined) {
        const score = appState.answers[q.id];
        const prevSelected = container.querySelector(`.choice-btn[data-value="${score}"]`);
        if (prevSelected) prevSelected.classList.add("selected");
    }

    const nextBtn = document.getElementById("nextQuestionBtn");
    if (appState.currentQuestionIndex === DIAGNOSIS_QUESTIONS.length - 1) {
        nextBtn.textContent = "자가진단 완료";
    } else {
        nextBtn.textContent = "다음";
    }
}

function submitDiagnosis() {
    document.getElementById("diag-step-2").classList.remove("active");
    document.getElementById("diag-loading").classList.add("active");

    let scores = { "어혈": 0, "혈허": 0, "양허": 0, "습담": 0, "기울": 0 };
    DIAGNOSIS_QUESTIONS.forEach(q => {
        const val = appState.answers[q.id] || 0;
        scores[q.type] += val;
    });

    let topConstitution = "어혈";
    let maxScore = -1;
    for (let key in scores) {
        if (scores[key] > maxScore) {
            maxScore = scores[key];
            topConstitution = key;
        }
    }

    setTimeout(() => {
        appState.userProfile.constitution = topConstitution;
        saveData();

        document.getElementById("diag-loading").classList.remove("active");
        document.getElementById("mainNav").style.display = "flex";
        document.querySelector('.nav-btn[data-target="dashboard-view"]').classList.add("active");
        
        switchView("dashboard-view");
    }, 1500);
}

// 12. ⭐️ 중요: 28일간의 누적 다이어리 점수 + 자가진단을 결합해 실시간으로 월경 유형 갱신
function computeCurrentConstitution() {
    const profile = appState.userProfile;
    const base = profile.constitution; // 자가진단 기초체질
    
    // 최근 28일(한 주기) 동안의 데일리 로그 획득
    const recentLogs = getRecentLogs(28);
    
    // 변증별 누적 가중치 스코어 객체 (기본 자가진단 가중치를 베이스로 5점 할당)
    let scoreBoard = { "어혈": 0, "혈허": 0, "양허": 0, "습담": 0, "기울": 0 };
    scoreBoard[base] = 5; 

    // 최근 28일 로그의 증상 체크 합산
    recentLogs.forEach(log => {
        if (log.symptoms) {
            if (log.symptoms.bloodClots) scoreBoard["어혈"] += 1;
            if (log.symptoms.severePain) scoreBoard["어혈"] += 1;
            
            if (log.symptoms.dizziness) scoreBoard["혈허"] += 1;
            if (log.symptoms.drySkin) scoreBoard["혈허"] += 1;
            
            if (log.symptoms.coldBody) scoreBoard["양허"] += 1;
            if (log.symptoms.extremeFatigue) scoreBoard["양허"] += 1;
            
            if (log.symptoms.bloating) scoreBoard["습담"] += 1;
            if (log.symptoms.overeating) scoreBoard["습담"] += 1;
            
            if (log.symptoms.stressPain) scoreBoard["기울"] += 1;
            if (log.symptoms.moodSwings) scoreBoard["기울"] += 1;
        }
    });

    // 최고 점수를 가진 변증 유형을 동적 유형으로 결정
    let finalConstitution = base;
    let maxScore = -1;
    for (let key in scoreBoard) {
        if (scoreBoard[key] > maxScore) {
            maxScore = scoreBoard[key];
            finalConstitution = key;
        }
    }

    return { type: finalConstitution, logCount: recentLogs.length };
}

// 13. 대시보드 렌더링
function renderDashboard() {
    // 28일 연산 기반의 현재 월경 유형 획득
    const computed = computeCurrentConstitution();
    const info = CONSTITUTION_INFO[computed.type];

    // 오늘 나의 월경 유형 영역 렌더링
    document.getElementById("reportTypeName").textContent = info.name;
    document.getElementById("reportTypeDesc").textContent = info.desc;
    
    // 약재 뱃지들
    const ingredientsContainer = document.getElementById("reportIngredients");
    ingredientsContainer.innerHTML = "";
    info.ingredients.forEach(ing => {
        const badge = document.createElement("span");
        badge.className = "badge badge-crimson";
        badge.textContent = ing;
        ingredientsContainer.appendChild(badge);
    });

    // 오늘 날짜 및 가이드 렌더링
    document.getElementById("currentLogDate").textContent = `오늘: ${getTodayDateString()}`;
    
    calculateCycle();
    renderCalendar();
    renderSituationGuide();
}

// 14. 캘린더 기능 구현 (달력형 주기 기록기)
function initCalendarNav() {
    document.getElementById("prevMonthBtn").addEventListener("click", () => {
        if (appState.calendarMonth === 0) {
            appState.calendarMonth = 11;
            appState.calendarYear--;
        } else {
            appState.calendarMonth--;
        }
        renderCalendar();
    });

    document.getElementById("nextMonthBtn").addEventListener("click", () => {
        if (appState.calendarMonth === 11) {
            appState.calendarMonth = 0;
            appState.calendarYear++;
        } else {
            appState.calendarMonth++;
        }
        renderCalendar();
    });
}

function renderCalendar() {
    const year = appState.calendarYear;
    const month = appState.calendarMonth;
    
    document.getElementById("calendarTitle").textContent = `${year}년 ${month + 1}월`;

    const container = document.getElementById("calendarDays");
    container.innerHTML = "";

    // 월의 첫날 요일 및 총 일수 계산
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    // 1. 공백 일 채우기
    for (let i = 0; i < firstDayIndex; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.className = "cal-day empty";
        container.appendChild(emptyCell);
    }

    // 2. 날짜 셀 채우기
    const lastPeriodDate = new Date(appState.userProfile.lastPeriodDate);
    const cycleLength = appState.userProfile.cycleLength;
    const todayStr = getTodayDateString();

    for (let day = 1; day <= totalDays; day++) {
        const cellDate = new Date(year, month, day);
        const cellDateStr = formatDate(cellDate);

        const dayCell = document.createElement("div");
        dayCell.className = "cal-day";
        dayCell.textContent = day;

        // 오늘 마크
        if (cellDateStr === todayStr) {
            dayCell.classList.add("today");
        }

        // 마지막 생리일 기준 주기의 특정 상태 판단 (생리 활성일 5일간, 생리 예정일)
        const diffTime = cellDate - lastPeriodDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays >= 0) {
            const modDay = diffDays % cycleLength;
            if (modDay >= 0 && modDay < 5) {
                // 생리 중인 기간 (5일간 활성 마킹)
                dayCell.classList.add("period-active");
            } else if (modDay === cycleLength - 1 || modDay === cycleLength - 2) {
                // 생리 직전 예정일 마킹
                dayCell.classList.add("period-expected");
            }
        } else {
            // 과거 일수 역산
            const modDayNegative = (cycleLength + (diffDays % cycleLength)) % cycleLength;
            if (modDayNegative >= 0 && modDayNegative < 5) {
                dayCell.classList.add("period-active");
            }
        }

        // 클릭 이벤트 등록 -> 이 날짜를 생리 시작일로 세팅
        dayCell.addEventListener("click", () => {
            if (confirm(`${month + 1}월 ${day}일을 마지막 생리 시작일로 설정하시겠습니까?`)) {
                appState.userProfile.lastPeriodDate = cellDateStr;
                saveData();
                renderDashboard();
            }
        });

        container.appendChild(dayCell);
    }
}

// 15. 상황별 조언 탭 로직
function initSituationTabs() {
    const tabs = document.querySelectorAll(".guide-tab-btn");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            appState.currentSituation = tab.dataset.situation;
            renderSituationGuide();
        });
    });
}

function renderSituationGuide() {
    const sit = appState.currentSituation;
    const data = SITUATION_GUIDES[sit];
    const container = document.getElementById("guideContentBox");
    
    // 현재 주기 정보를 획득해 생활 팁과 탭을 결합 렌더링
    const currentDay = calculateCurrentCycleDay();
    let cycleTip = "";
    if (currentDay >= 1 && currentDay <= 5) {
        cycleTip = "자궁 순환을 돕고 소모되는 철분 보충을 위한 식단 구성과 하복부 핫팩이 중요한 구간입니다.";
    } else if (currentDay >= 6 && currentDay <= 12) {
        cycleTip = "에너지가 최대로 올라가는 활성 구간이므로 활동량을 늘리기에 아주 유리합니다.";
    } else if (currentDay >= 13 && currentDay <= 15) {
        cycleTip = "호르몬 과도기이므로 무리하지 않는 골반 순환 요가 등을 권장합니다.";
    } else {
        cycleTip = "생리전 부종과 예민함이 심해지는 황체기입니다. 정제 짠 음식을 피하고 가벼운 림프 배출에 신경 쓰세요.";
    }

    container.innerHTML = `
        <div class="special-guide-box">
            <h4>📢 ${data.title}</h4>
            <p>${data.desc}</p>
        </div>
        <div class="guide-item">
            <span class="guide-icon">⏳</span>
            <div class="guide-text">
                <h4>현재 주기 맞춤 생활 팁 (주기 ${currentDay}일차)</h4>
                <p>${cycleTip}</p>
            </div>
        </div>
    `;
}

function calculateCurrentCycleDay() {
    const profile = appState.userProfile;
    const lastDate = new Date(profile.lastPeriodDate);
    const today = new Date(getTodayDateString());
    const diffTime = Math.abs(today - lastDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) % profile.cycleLength;
    return diffDays === 0 ? profile.cycleLength : diffDays;
}

// 16. 주기 계산기
function calculateCycle() {
    const profile = appState.userProfile;
    const lastDate = new Date(profile.lastPeriodDate);
    const today = new Date(getTodayDateString());
    
    const diffTime = Math.abs(today - lastDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) % profile.cycleLength;
    const currentDay = diffDays === 0 ? profile.cycleLength : diffDays;

    document.getElementById("cycleDayCount").textContent = `주기 ${currentDay}일차`;

    let phase = "";
    let phaseText = "";
    let ddayText = "";

    const nextPeriodDate = new Date(lastDate);
    nextPeriodDate.setDate(lastDate.getDate() + profile.cycleLength);
    const timeToNext = nextPeriodDate - today;
    const daysToNext = Math.ceil(timeToNext / (1000 * 60 * 60 * 24));
    
    if (daysToNext <= 0) {
        ddayText = "D-Day";
    } else {
        ddayText = `D-${daysToNext}`;
    }

    if (currentDay >= 1 && currentDay <= 5) {
        phase = "menstrual";
        phaseText = "월경기";
    } else if (currentDay >= 6 && currentDay <= 12) {
        phase = "follicular";
        phaseText = "여포기";
    } else if (currentDay >= 13 && currentDay <= 15) {
        phase = "ovulatory";
        phaseText = "배란기";
    } else {
        phase = "luteal";
        phaseText = "황체기";
    }

    document.getElementById("cyclePhase").textContent = phaseText;
    document.getElementById("cycleDDay").textContent = ddayText;
    document.getElementById("guidePhaseBadge").textContent = phaseText;

    const points = document.querySelectorAll(".timeline-point");
    points.forEach(pt => {
        pt.classList.remove("active");
        if (pt.dataset.phase === phase) {
            pt.classList.add("active");
        }
    });

    const percent = (currentDay / profile.cycleLength) * 100;
    document.querySelector(".cycle-circle").style.background = `conic-gradient(var(--color-primary-dark) ${percent}%, rgba(176, 73, 76, 0.15) ${percent}%)`;
}

// 17. 일일 다이어리 체크 폼 처리
function initForms() {
    const form = document.getElementById("dailyLogForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // 체크박스 유무에 맞춰 변증 증상 데이터 세팅
        const log = {
            date: getTodayDateString(),
            isPeriod: document.getElementById("logIsPeriod").checked,
            symptoms: {
                bloodClots: document.getElementById("sym_bloodClots").checked,
                severePain: document.getElementById("sym_severePain").checked,
                dizziness: document.getElementById("sym_dizziness").checked,
                drySkin: document.getElementById("sym_drySkin").checked,
                coldBody: document.getElementById("sym_coldBody").checked,
                extremeFatigue: document.getElementById("sym_extremeFatigue").checked,
                bloating: document.getElementById("sym_bloating").checked,
                overeating: document.getElementById("sym_overeating").checked,
                stressPain: document.getElementById("sym_stressPain").checked,
                moodSwings: document.getElementById("sym_moodSwings").checked
            }
        };

        const index = appState.userProfile.dailyLogs.findIndex(l => l.date === log.date);
        if (index > -1) {
            appState.userProfile.dailyLogs[index] = log;
        } else {
            appState.userProfile.dailyLogs.push(log);
        }

        saveData();
        alert("오늘의 월경 상태 기록이 누적 저장되었습니다!\n누적된 28일치 데이터를 기준으로 월경 유형 판정이 실시간 갱신됩니다.");
        
        // 렌더링 갱신
        renderDashboard();
    });
}

// 18. 나의 추천 티 & 논문 근거 렌더링
function renderTeaRecommendations() {
    // 28일 누적 변증 연산 결과 가져오기
    const computed = computeCurrentConstitution();
    const constitutionType = computed.type;

    let algorithmReason = "기본 진단 반영 추천";
    if (computed.logCount > 0) {
        algorithmReason = `최근 28일 데이터 분석 반영 (${computed.logCount}일 기록 누적)`;
    }

    const tea = CONSTITUTION_INFO[constitutionType];
    document.getElementById("teaAlgorithmBadge").textContent = algorithmReason;
    document.getElementById("recommendTeaName").textContent = tea.baseTea;
    document.getElementById("recommendTeaFlavor").textContent = `풍미: ${tea.flavor}`;
    document.getElementById("recommendTeaDesc").textContent = tea.teaDesc;
    document.getElementById("recommendTeaRoutine").textContent = tea.routine;

    // 논문 과학적 근거 렌더링
    const evidenceContainer = document.getElementById("evidenceCardsContainer");
    evidenceContainer.innerHTML = "";

    const papers = paperEvidenceDB[constitutionType] || [];
    papers.forEach(paper => {
        renderPaperCard(evidenceContainer, paper);
    });

    if (appState.userProfile.painPoint === "PCOS") {
        const pcosPapers = paperEvidenceDB["PCOS"] || [];
        pcosPapers.forEach(paper => {
            // 중복 렌더링 배제
            if (!papers.some(p => p.title === paper.title)) {
                renderPaperCard(evidenceContainer, paper);
            }
        });
    }
}

function renderPaperCard(container, paper) {
    const card = document.createElement("div");
    card.className = "evidence-item-card";
    card.innerHTML = `
        <h4>${paper.title}</h4>
        <span class="evidence-source">출처: ${paper.source}</span>
        <p class="evidence-summary">${paper.summary}</p>
        <p class="evidence-lifestyle">${paper.lifestyleTip}</p>
    `;
    container.appendChild(card);
}

function getRecentLogs(days) {
    const logs = [...appState.userProfile.dailyLogs];
    // 날짜 기준 정렬
    logs.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // 오늘 기준 28일 이내의 로그만 필터
    const today = new Date(getTodayDateString());
    const limitDate = new Date(today);
    limitDate.setDate(today.getDate() - days);

    return logs.filter(log => new Date(log.date) >= limitDate);
}

// 19. 주기 설정 모달 처리
function initModal() {
    const modal = document.getElementById("cycleModal");
    const editBtn = document.getElementById("editCycleBtn");
    const closeBtn = document.getElementById("closeModalBtn");
    const saveBtn = document.getElementById("saveModalBtn");

    editBtn.addEventListener("click", () => {
        document.getElementById("modalLastPeriodDate").value = appState.userProfile.lastPeriodDate;
        document.getElementById("modalCycleLength").value = appState.userProfile.cycleLength;
        modal.classList.add("active");
    });

    closeBtn.addEventListener("click", () => modal.classList.remove("active"));
    
    saveBtn.addEventListener("click", () => {
        const lastDateInput = document.getElementById("modalLastPeriodDate").value;
        const cycleInput = parseInt(document.getElementById("modalCycleLength").value);

        if (!lastDateInput) {
            alert("마지막 생리 시작일을 입력해 주세요.");
            return;
        }

        appState.userProfile.lastPeriodDate = lastDateInput;
        appState.userProfile.cycleLength = cycleInput;

        saveData();
        modal.classList.remove("active");
        renderDashboard();
    });
}

// 20. 유틸리티 함수
function getTodayDateString() {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function saveData() {
    localStorage.setItem("dalngung_user_profile", JSON.stringify(appState.userProfile));
}

function loadData() {
    const saved = localStorage.getItem("dalngung_user_profile");
    if (saved) {
        try {
            appState.userProfile = JSON.parse(saved);
        } catch (e) {
            console.error("데이터 로드 에러:", e);
        }
    } else {
        appState.userProfile.lastPeriodDate = getTodayDateString();
    }
}
