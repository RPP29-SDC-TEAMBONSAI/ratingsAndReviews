import http from 'k6/http';
import { sleep, group, check } from 'k6';
export let options = {
  vus: 1000,
  duration: '30s',
};

// const testGET = () => {
  // const getRandomIntInclusive = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
  // const id = getRandomIntInclusive(1, 1000000);
//   const res = http.get(`http://localhost:3000/reviews?page=1&count=5&sort=newest&product_id=${id}`);

//   sleep(1);
//   const checkRes = check(res, {
//     'status is 200 (there are reviews for this product id)': (r) => r.status === 200,
//     'sends valid data even if db request fails': (r) => r.body.includes('productName'),
//   });
// };

// export default () => {
//   group('GET request', () => {
//     testGET();
//   });

//   sleep(1);
// };
3769101
export default function () {

  const getRandomIntInclusive = (min, max) =>  {
   return Math.floor(Math.random() * (max - min + 1) + min);
  }
  const id = getRandomIntInclusive(500000, 100000);
  const headers = { 'Content-Type': 'application/json' };
  let data = {id: id}
  http.get(`http://localhost:3000/reviews?page=1&count=5&sort=newest&product_id=${id}`);
  // http.get(`http://localhost:3000/reviews/meta?product_id=${id}`);
  // http.put(`http://localhost:3000/reviews/${id}/report`, JSON.stringify(data), {headers, headers});

  sleep(1);
}


// gzip -c script.js | curl --data-binary @- -X POST -H "Content-Type: application/json" -H "X-Insert-Key: NRII-Wil3fXEC3wJWl6plFvLqXjheRVUgr3e6" -H "Content-Encoding: gzip" https://insights-collector.newrelic.com/v1/accounts/3294198/events