import http from 'k6/http';
import { expect, describe } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';
import { SharedArray } from 'k6/data';

/* 
    El trabajo pesado (abrir y procesar archivos grandes por ejemplo)
    debe hacerse aquí.
    De esta manera sólo ocurrirá una vez y el resultado será compartido
    entre todas las VUs, ahorrando tiempo y memoria.
*/

const data = new SharedArray('input data', function (){
    return JSON.parse(open('../data/users.json')).users;
});

export const options = {
    stages: [
        { duration: '10s', target: 1 },
        { duration: '10s', target: 20 },
        { duration: '30s', target: 20 },
        { duration: '10s', target: 1 }
    ],
    thresholds: {
        // Errores http tienen que se menor al 1%
        http_req_failed: ['rate<0.01'],
        // 95% de las peticiones http tienen que responder en menos de 200ms
        http_req_duration: ['p(95)<200']
    }
};

export default function(){
    describe('API Cocodrilos', () => {
        describe('obtener lista de cocodrilos', ()=> {
            const response = http.get('https://test-api.k6.io/public/crocodiles');

            expect(response.status, 'status code').to.equal(200);
            expect(response).to.have.validJsonBody();
            expect(response.json().length, 'cantidad de cocodrilos').to.be.above(0);
        });

        describe('post ejemplo', () => {
            let username = data[Math.floor(Math.random() * data.length)].username;

            const response = http.post('https://httpbin.test.k6.io/post', username);

            expect(response.status, 'status code').to.equal(200);
            expect(response).to.have.validJsonBody();
            expect(response.json().data, 'valid username').to.be.equal(username);
        })
    });
}
