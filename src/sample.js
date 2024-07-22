import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  discardresponsebodies: true,
  scenarios: {
    contacts: {
      executor: 'ramping-vus',
      startvus: 10,
      stages: [
        { duration: '30s', target: 10 },
        { duration: '30s', target: 0 },
      ],
      gracefulRampDown: '1s',
    },
  },
};

export default function () {
  http.get('https://test.k6.io/contacts.php');
  // Añadimos sleep con mayor duración que el gracefulRampDown
  // para que las iteraciones sean más largas que el rampdown
  sleep(5);
}
