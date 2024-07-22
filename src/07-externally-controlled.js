import http from 'k6/http';

export const options = {
  scenarios: {
    crocodiles: {
      executor: 'externally-controlled',
      vus: 10,
      maxVUs: 50,
      duration: '10m',
    },
  },
};

export default function () {
  http.get('https://test-api.k6.io/public/crocodiles');
}
