import express from 'express';
import axios from 'axios';

const app = express();

const client_id = 'a2bd78f8bc5789afa307f11f01a5ab88';
const redirect_uri = 'https://a3040.tistory.com/';
const state_param = 'dummy';
let code = '';


app.get('/get_token', (req, res) => {
  const loc = `https://www.tistory.com/oauth/access_token?
  client_id=${client_id}
  &client_secret={client-secret}
  &redirect_uri=${redirect_uri}
  &code={code}
  &grant_type=authorization_code`;


  res.send(`Hello, World!
    <input type='text' name='code' value='' />
    <button type='button'>코드입력후토큰얻기</button>
    <a href=${loc}>티스토리로긴</a>|<a href=/set_code>로컬에코드입력</a>
    `);
});


app.get('/set_code', (req, res) => {
  const loc = `https://www.tistory.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&state=${state_param}`;
  res.send(`Hello, World!
    <input type='text' name='code' value='' />
    <button type='button'>코드입력후토큰얻기</button>
    <a href=${loc}>티스토리로긴</a>|<a href=/set_code>로컬에코드입력</a>
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