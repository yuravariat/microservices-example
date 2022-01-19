import request from "supertest";
import { app } from '../../app';

it('test@test.com signin', async () => {
  await request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com',
    password: '1234'
  })
  .expect(201);

  await request(app)
  .post('/api/users/signin')
  .send({
    email: 'test@test.com',
    password: '1234'
  })
  .expect(200);
});

it('test@test.com signin wrong password', async () => {
  await request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com',
    password: '1234'
  })
  .expect(201);

  await request(app)
  .post('/api/users/signin')
  .send({
    email: 'test@test.com',
    password: '4321'
  })
  .expect(400);
});

it('email not exists returns 400', () => {
  return request(app)
  .post('/api/users/signin')
  .send({
    email: 'test3test.com',
    password: '1234'
  })
  .expect(400);
});

it('empty password returns 400', () => {
  return request(app)
  .post('/api/users/signin')
  .send({
    email: 'test@test.com',
    password: ''
  })
  .expect(400);
});

it('password is too long returns 400', () => {
  return request(app)
  .post('/api/users/signin')
  .send({
    email: 'test@test.com',
    password: '1111111111111111111111111111111111111'
  })
  .expect(400);
});

it('empty email and password returns 400', () => {
  return request(app)
  .post('/api/users/signin')
  .send({
    email: '',
    password: ''
  })
  .expect(400);
});
