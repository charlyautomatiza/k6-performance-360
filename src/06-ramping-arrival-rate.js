import http from 'k6/http';

export const options = {
  scenarios: {
    crocodiles: {
      executor: 'ramping-arrival-rate',
      // Inicio iteraciones por `timeUnit`
      startRate: 100,
      // Inicia `startRate` iteraciones por minuto
      timeUnit: '1m',
      // Asignación previa de las VU necesarias.
      preAllocatedVUs: 60,
      stages: [
        // Iniciar 100 iteraciones por `timeUnit` durante el primer minuto.
        { target: 100, duration: '1m' },
        // Aumenta linealmente hasta iniciar 300 iteraciones por
        // `timeUnit` durante los siguientes dos minutos.
        { target: 300, duration: '2m' },
        // Disminuye linealmente hasta iniciar 30 iteraciones
        // por `timeUnit` en el último minuto.
        { target: 30, duration: '1m' },
      ],
    },
  },
};

export default function () {
  http.get('https://test-api.k6.io/public/crocodiles');
}
