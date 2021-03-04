import chai from "chai";
import chaiHttp from "chai-http";
import app from '../app.js';
// const app = require('../app');

chai.use(chaiHttp);

const { expect } = chai;

    describe('Employee Tests', () => {
        it('should save new employee record in database', (done) => {
            const employee = {
                first_name: 'Yusuff',
                last_name: 'Ogundeji',
                email: 'temyuph@gmail.com',
                password: 'Temilorun123',
                image: 'https://res.cloudinary.com/temiogundeji/image/upload/v1611710642/image-upload/computed-filename-using-request.png',
                department_id: 1,
                address: '14, ifeloju street, off-ajia road, Gbaremu Ibadan.',
                created_on: '2021-01-27T18:23:00.380Z',
                modified_on: '2021-01-27T18:23:00.381Z'
            };

            chai.request(app)
                .post('/api/v1/auth/user')
                .set('Accept', 'application/json')
                .send(employee)
                .end((err, res) => {
                    expect(res.status).to.equal(201);
                    done();
                });
        });

        it('should not create an employee account with incomplete parameters', (done) => {
            const employee = {
                first_name: 'Yusuff',
                last_name: 'Ogundeji',
                email: 'temyuph@gmail.com',
            }

            chai.request(app)
            .post('/api/v1/auth/user')
            .set('Accept', 'application/json')
            .send(employee)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
        });
    });

