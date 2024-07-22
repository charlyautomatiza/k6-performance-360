import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '10s', target: 5 },
        { duration: '15s', target: 10 },
        { duration: '10s', target: 0 }
    ],
}

export default function () {
    const res = http.get('https://test.k6.io');
    check(res, {
        "response code was 200": (res) => res.status == 200,
    });
    sleep(1);
}
