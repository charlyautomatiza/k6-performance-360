import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  scenarios: {
    crocodiles: {
      executor: 'per-vu-iterations',
      vus: 10,
      iterations: 20,
      maxDuration: '40s',
    },
  },
};

export default function () {
  http.get('https://test-api.k6.io/public/crocodiles');
  // El tiempo total de iteración
  // es el tiempo de espera + el tiempo para finalizar la request
  // Inyectamos una espera de 500ms
  sleep(0.5);
}
