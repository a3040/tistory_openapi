console.log(`js 불림, 폴더구조확인용 content.js`);

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.from === 'popup') {
        try {
            console.log('메시지 수신1:', message);
            sendResponse('메시지를 수신했습니다.');
            bridge(message.msg);
        }catch(error){
            console.error(error);
        }
    }
});

function bridge(msg){

    const gpt_textarea = document.querySelector('form textarea');            
    const gpt_button = document.querySelector('form button[class*="bottom"]')
    gpt_button.disabled = true;
    gpt_textarea.value = msg; 
    console.log(`수신한 msg->gpt에게 넘김:${msg}`);
    /*
    // 새로운 키보드 이벤트 생성
    const event = new KeyboardEvent('keydown', {
        key: 'Enter',
        keyCode: 13,
        code: 'Enter',
        which: 13,
        keyIdentifier: 'Enter',
        view: window,
        bubbles: true,
        cancelable: true,
    });
    
    // 이벤트를 원하는 요소로 보내기 
    gpt_textarea.dispatchEvent(event); 
    */
    console.log(`주석 해제후 gpt_textarea에 엔터 키보드 이벤트전송시 질문이 openai로 전송됨`);
}

function insertDiv(){
    var div = document.createElement("div");
    div.style.height = "100px";
    div.style.backgroundColor = "blue";
  
    var body = document.body;
    var lastChild = body.lastElementChild;
  
    // body 요소의 맨 마지막에 div 요소를 추가합니다.
    body.insertBefore(div, lastChild.nextSibling);
}

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
// insertDiv();


