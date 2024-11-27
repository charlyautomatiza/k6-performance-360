import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    stages: [
      { duration: '10s', target: 10 },
      { duration: '15s', target: 10 },
      { duration: '15s', target: 30 },
      { duration: '10s', target: 0 }
    ]
}

export default function () {
    http.get('https://test.k6.io');
    sleep(1);
}
