import express from 'express';
import axios from 'axios';

const app = express();

const client_id = '<App ID>';
const redirect_uri = 'https://a3040.tistory.com/';
const client_secret = '<Secret Key>';
const state_param = 'dummy';
let code = '';
let access_token = '';

app.get('/get_token', async (req, res) => {
  const tcode = req.query.code;
  code = tcode; //전역변수에 추가

  const loc = `https://www.tistory.com/oauth/access_token?
  client_id=${client_id}
  &client_secret=${client_secret}
  &redirect_uri=${redirect_uri}
  &code=${code}
  &grant_type=authorization_code`;
  try{
    const awaitRes = await axios.get(loc);
    console.log( awaitRes.data );
    access_token = awaitRes.data.access_token; 
  }catch(error){console.error(error);}

  res.send(`${access_token}`);
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
  res.send(`Hello, World!
    <a href=${loc}>티스토리로긴</a>|<a href=/set_code>로컬에코드입력</a>`);
});


app.listen(3000, () => {
  console.log('Server started on port http://localhost:3000');
});

console.log(`Hello`);