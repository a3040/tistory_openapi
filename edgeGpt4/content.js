console.log(`js 불림, 폴더구조확인용 content.js`);

function insertDiv(){
    var div = document.createElement("div");
    div.style.height = "100px";
    div.style.backgroundColor = "blue";
  
    var body = document.body;
    var lastChild = body.lastElementChild;
  
    // body 요소의 맨 마지막에 div 요소를 추가합니다.
    body.insertBefore(div, lastChild.nextSibling);
}

// $(document).ready(function () {    
// });

function jinsertDiv(){
    var div = $("<div></div>").css({
        "height": "100px",
        "background-color": "red"
    });
    
    var lastChild = $("body").children().last();
    
    // body 요소의 맨 마지막에 div 요소를 추가합니다.
    lastChild.after(div);
}

jinsertDiv();
insertDiv();



chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.from === 'popup') {
        try {
            console.log('메시지 수신1:', message);
            sendResponse('메시지를 수신했습니다.');
        }catch(error){
            console.error(error);
        }
    }
});