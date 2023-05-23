import express from 'express';
import axios from 'axios';

const app = express();

const client_id = '<App ID>';
const redirect_uri = 'https://a3040.tistory.com/';
const client_secret = '<Secret Key>';
const state_param = 'dummy';
let code = '';
let access_token = '';
const output = 'json';

const menu = `<a href=/>홈</a>|<a href=/set_code>로컬에코드입력</a>
|<a href="/get/blog/info">블로그정보얻기</a>
|<a href="/apis/category/list">카테고리정보얻기</a>
|<a href="/apis/post/write">블로그작성</a>
`;

app.get('/apis/post/write', async (req, res) => {
  const loc = `https://www.tistory.com/apis/post/write`;

  const title = "Post 연동한 타이틀";
  const content = `본문/////${title}`;
  const tag = 'tag, javascript, 티스토리';

  const postData = {
    'access_token': access_token,
    'output': output,
    'blogName': "a3040",
    'title': title,
    'content': content,
    'visibility': 3, //visibility: 발행상태 (0: 비공개 - 기본값, 1: 보호, 3: 발행)
    'category': '1102530',
    // 'published':published, published: 발행시간 (TIMESTAMP 이며 미래의 시간을 넣을 경우 예약. 기본값: 현재시간)
    // 'slogan':slogan, slogan: 문자 주소
    'tag': tag,
    // 'acceptComment':acceptComment, acceptComment: 댓글 허용 (0, 1 - 기본값)
    // 'password':password,acceptComment: 댓글 허용 (0, 1 - 기본값)
  }

  let view_html = `${menu}`;

  try {
    const awaitRes = await axios.post(loc, postData);
    console.log(awaitRes.data);

    const dataToString = JSON.stringify(awaitRes.data);
    view_html += `${dataToString}`;
  } catch (error) { console.error(error); }

  res.send(`${view_html}`);
});


app.get('/apis/category/list', async (req, res) => {
  const loc = `https://www.tistory.com/apis/category/list?access_token=${access_token}&output=${output}&blogName=a3040`;

  let view_html = `${menu}`;

  try {
    const awaitRes = await axios.get(loc);
    console.log(awaitRes.data);

    const dataToString = JSON.stringify(awaitRes.data);
    view_html += `${dataToString}`;
  } catch (error) { console.error(error); }

  res.send(`${view_html}`);
});

app.get('/get/blog/info', async (req, res) => {
  const loc = `https://www.tistory.com/apis/blog/info?access_token=${access_token}&output=${output}`;

  let view_html = `${menu}`;

  try {
    const awaitRes = await axios.get(loc);
    console.log(awaitRes.data);

    const dataToString = JSON.stringify(awaitRes.data);
    view_html += `${dataToString}`;
  } catch (error) { console.error(error); }

  res.send(`${view_html}`);
});

app.get('/get_token', async (req, res) => {
  const tcode = req.query.code;
  code = tcode; //전역변수에 추가

  const loc = `https://www.tistory.com/oauth/access_token?
  client_id=${client_id}
  &client_secret=${client_secret}
  &redirect_uri=${redirect_uri}
  &code=${code}
  &grant_type=authorization_code`;

  try {
    const awaitRes = await axios.get(loc);
    access_token = awaitRes.data.access_token;
  } catch (error) { console.error(error); }

  const view_html = `${menu} ${access_token}`;
  res.send(`${view_html}`);
});


app.get('/set_code', (req, res) => {
  const loc = `https://www.tistory.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&state=${state_param}`;
  res.send(`
  <form method='get' action='/get_token'>
  <input type='text' name='code' value='' />
  <button type='submit'>코드입력후토큰얻기</button>
  </form>
    <a href=${loc} target='_blank'>티스토리로긴</a>|<a href=/set_code>로컬에코드입력</a>
    `);
});

app.get('/', (req, res) => {
  const loc = `https://www.tistory.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&state=${state_param}`;
  res.send(`<a href='${loc}' target=_blank>티스토리로긴</a>|<a href=/set_code>로컬에코드입력</a>`);
});


app.listen(3000, () => {
  console.log('Server started on port http://localhost:3000');
});

console.log(`Hello`);