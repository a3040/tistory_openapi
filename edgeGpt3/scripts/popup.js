console.log(`팝업 js 불림, 폴더구조확인용 scripts/popup.js`);

function send_to_content(msg) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log("현재탭에 붙어있는 content에 msg보냄");
        const response = chrome.tabs.sendMessage(
            tabs[0].id,
            {
                from: 'popup',
                to: 'content',
                msg: msg,
                // topics: extactTopics
            },
            function (response) {
                console.log(response);
                // window.close();
            }
        );
    })
}

const sendMsg = document.getElementById("sendMsg");
if (sendMsg) {
    sendMsg.onclick = function () {
        console.log("clicked");
        send_to_content(`전송하기`);
    };
}
