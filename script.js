let currentQuestionIndex = 0;
let wrongAnswers = 0; // 用于跟踪答错的次数
let currentQuestions = []; // 存储当前要回答的问题

const allQuestions = [
    { question: "台湾的首都是？", options: ["台北", "高雄", "台中", "新北"], correctOption: 0 },
    { question: "2 + 2 等于多少？", options: ["4", "5", "6", "7"], correctOption: 0 },
    { question: "香蕉的颜色是？", options: ["红色", "绿色", "黄色", "蓝色"], correctOption: 2 },
    { question: "太阳升起的方向是？", options: ["东", "西", "南", "北"], correctOption: 0 },
    { question: "水的化学符号是？", options: ["O2", "H2O", "CO2", "N2"], correctOption: 1 },
    { question: "世界上最高的山是？", options: ["珠穆朗玛峰", "长白山", "喜马拉 Himalayas 山", "阿尔卑斯山"], correctOption: 0 },
];

function getRandomQuestions() {
    // 随机打乱题目顺序
    const shuffledQuestions = allQuestions.slice();
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }
    // 选择前5个问题
    return shuffledQuestions.slice(0, 5);
}

function checkAnswer(selectedOption) {
    const currentQuestion = currentQuestions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correctOption) {
        // 答案正确
        document.getElementById("feedback").innerText = '回答正确！';
        currentQuestionIndex++; // 进行下一题
        if (currentQuestionIndex < currentQuestions.length) {
            setTimeout(displayQuestion, 1500); // 延迟显示下一题
        } else {
            displayCongratulations(); // 显示恭喜完成消息并在新窗口中打开网页
        }
    } else {
        // 答案不正确
        document.getElementById("feedback").innerText = '回答不正确，返回第一题重新开始。';
        currentQuestionIndex = 0; // 返回第一题
        wrongAnswers++; // 增加答错次数
        setTimeout(function () {
            currentQuestions = getRandomQuestions(); // 获取新的随机问题集合
            displayQuestion(); // 显示第一题
        }, 1500);
    }
}

function displayCongratulations() {
    const correctFeedback = document.getElementById("feedback");
    correctFeedback.innerText = `恭喜完成！您答错了：${wrongAnswers} 题。`;
    correctFeedback.style.display = 'block';

    // 延迟1.5秒后在新窗口中打开网页
    setTimeout(function () {
        window.open("https://www.flyingvest.com.tw/company?0103b051_page=1", "_blank");
    }, 1500);
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

window.onload = function () {
    currentQuestions = getRandomQuestions(); // 初始化随机问题集合
    displayQuestion(); // 显示第一题
};