import express from 'express';
import axios from 'axios';

const app = express();

const client_id = '<앱의clent_id>';
const redirect_uri='https://a3040.tistory.com/';
const state_param ='dummy';

app.get('/', (req, res) => {
    const loc=`https://www.tistory.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&state=${state_param}`;

    console.log( loc );

  res.send(`Hello, World!
    <a href=${loc}>티스토리로긴</a>`);
});


app.listen(3000, () => {
  console.log('Server started on port 3000');
});

console.log(`Hello`);