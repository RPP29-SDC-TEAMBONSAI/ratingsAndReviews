import http from 'k6/http';
import { sleep } from 'k6';
export let options = {
  vus: 100,
  duration: '30s',
};


export default function () {
for (let i = 2700000; i < 2700100; i++) {
  http.get(`http://localhost:3000/reviews?page=1&count=5&sort=newest&product_id=${i}`);
}
  sleep(1);
}

// export default function () {
//   for (let i = 2700000; i < 2700100; i++) {
//     http.get(`http://localhost:3000/reviews/meta?product_id=${i}`);
//   }
//     sleep(1);
//   }