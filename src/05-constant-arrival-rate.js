import http from 'k6/http';

export const options = {
  scenarios: {
    crocodiles: {
      executor: 'constant-arrival-rate',
      // Duración de la prueba
      duration: '30s',
      // ¿Cuántas iteraciones por timeUnit
      rate: 30,
      // Start `rate` iterations per second
      timeUnit: '1s',
      // VUs pre-establecidos antes de comenzar la prueba
      preAllocatedVUs: 5,
      // Máximo de 50 VUs para sostener la definida
      // tasa de llegada constante.
      maxVUs: 50,
    },
  },
};

export default function () {
  http.get('https://test-api.k6.io/public/crocodiles');
}
