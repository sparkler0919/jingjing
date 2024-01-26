let currentQuestionIndex = 0;
let wrongAnswers = 0; // 用于跟踪答错的次数
let currentQuestions = []; // 存储当前要回答的问题

const allQuestions = [
    { question: "紀念日是幾月幾號？", options: ["5/20", "3/23", "1/29", "9/19"], correctOption: 1 },
    { question: "我們距離多遠？", options: ["0", "10000", "8787", "9587"], correctOption: 3 },
    { question: "皇帝殿東峰三角點的牌子上面寫幾公尺？", options: ["593", "822", "1079", "420"], correctOption: 0 },
    { question: "布魯塞爾賭場會員卡上曾品融的名字?", options: ["PIN JUNG", "TSENG PINJUNG", "TSENG PIN", "TSENG"], correctOption: 2 },
    { question: "曾品融在歐洲最喜歡的一間餐廳是什麼料理？", options: ["法餐", "印度菜", "捷克菜", "義大利料理"], correctOption: 1 },
    { question: "曾品融的MBTI最常出現？", options: ["ENFJ", "ESFP", "ENFP", "ENTP"], correctOption: 0 },
    { question: "曾品融最喜歡的狗狗品種？", options: ["拉布拉多", "雪松", "黃金", "柴犬"], correctOption: 2 },
    { question: "沈菁菁驗出2條線是什麼時候？", options: ["5/24", "4/21", "5/8", "4/29"], correctOption: 0 },
    { question: "第一次捉i是在哪裡？", options: ["挪威", "宜蘭", "北投", "嘉義"], correctOption: 2 },
    { question: "在台南一起吃了哪間牛肉湯？", options: ["文章", "西羅殿", "六千", "鬍鬚忠"], correctOption: 1 },
    { question: "某年聖誕節前去聽布萊梅當天吃了什麼？", options: ["烤玉米", "松露薯條", "起司馬鈴薯", "熱狗堡"], correctOption: 1 },
    { question: "半路的貓貓叫什麼名字？", options: ["胖虎", "喵喵", "小黑", "不要臉"], correctOption: 3 },
    { question: "福隆沙灘電影院看什麼電影？", options: ["王牌冤家", "疫起", "電子情書", "戀戀筆記本"], correctOption: 0 },
    { question: "2022年花蓮行沒有去哪裡？", options: ["七星潭", "吉安慶修院", "鯉魚潭", "台開心農場"], correctOption: 0 },
    { question: "科智宜蘭包棟去哪間民宿？", options: ["希望之丘", "鬧鐘關掉", "房角石", "51宅宅"], correctOption: 2 },
    { question: "台北最頂咖哩飯？", options: ["小仺館", "YOLO", "通庵", "小灶咖"], correctOption: 3 },
    { question: "彰化最頂肉圓？", options: ["阿璋", "北門口", "阿三", "北門"], correctOption: 1 },
    { question: "嘉義我們沒有去哪裡？", options: ["穀谷", "水中古厝", "白人牙膏", "民國火雞肉飯"], correctOption: 0 },
    { question: "台中一起吃了哪間燒肉？", options: ["雲火醇燒", "澄居", "屋馬", "脂板前"], correctOption: 0 },
    { question: "曾品融最常去的咖啡廳？", options: ["星巴克", "dreamers", "喜鵲", "半路咖啡"], correctOption: 3 },
];

function getRandomQuestions() {
    // 随机打乱题目顺序
    const shuffledQuestions = allQuestions.slice();
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }
    // 选择前5个问题
    return shuffledQuestions.slice(0, 7);
}

function checkAnswer(selectedOption) {
    const currentQuestion = currentQuestions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correctOption) {
        // 答案正确
        document.getElementById("feedback").innerText = '答案正確，寶貝太棒了！';
        currentQuestionIndex++; // 进行下一题
        if (currentQuestionIndex < currentQuestions.length) {
            setTimeout(displayQuestion, 1500); // 延迟显示下一题
        } else {
            displayCongratulations(); // 显示恭喜完成消息并在新窗口中打开网页
        }
    } else {
        // 答案不正确
        document.getElementById("feedback").innerText = '錯錯錯，再來一次！';
        currentQuestionIndex = 0; // 返回第一题
        wrongAnswers++; // 增加答错次数
        setTimeout(function () {
            currentQuestions = getRandomQuestions(); // 获取新的随机问题集合
            displayQuestion(); // 显示第一题
        }, 1500);
    }
}


function displayQuestion() {
    if (currentQuestionIndex < currentQuestions.length) {
        const currentQuestion = currentQuestions[currentQuestionIndex];
        document.getElementById("question").innerText = currentQuestion.question;

        // 设置选项按钮的文本
        const optionsButtons = document.querySelectorAll("#options button");
        for (let i = 0; i < optionsButtons.length; i++) {
            optionsButtons[i].innerText = currentQuestion.options[i];
        }

        document.getElementById("feedback").innerText = '';
    } else {
        // 完成所有问题，不显示任何内容
        document.getElementById("game").innerHTML = "";
    }
}

function displayCongratulations() {
    const correctFeedback = document.getElementById("feedback");
    correctFeedback.innerText = `恭喜完成挑戰！寶寶答错了：${wrongAnswers} 次。`;
    correctFeedback.style.display = 'block';

    // 显示"獎勵"按钮
    const rewardButton = document.getElementById("rewardButton");
    if (rewardButton) {
        rewardButton.style.display = 'block';
    }

    // 延迟1.5秒后在新窗口中打开网页
    setTimeout(function () {
        window.open("https://pse.is/4ygx4z", "_blank");
    }, 1500);
}

function openReward() {
    window.open("https://pse.is/4ygx4z", "_blank");
}

window.onload = function () {
    currentQuestions = getRandomQuestions(); // 初始化随机问题集合
    displayQuestion(); // 显示第一题
};