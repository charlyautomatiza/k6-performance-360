import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  scenarios: {
    crocodiles: {
      executor: 'shared-iterations',
      vus: 10,
      iterations: 450, // ejemplo ok: 300
      maxDuration: '30s', // ejemplo ok: '45s'
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
