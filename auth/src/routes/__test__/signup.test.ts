import request from "supertest";
import { app } from '../../app';

it('test@test.com signup', () => {
  return request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com',
    password: '1234'
  })
  .expect(201);
});

it('invalid email returns 400', () => {
  return request(app)
  .post('/api/users/signup')
  .send({
    email: 'test3test.com',
    password: '1234'
  })
  .expect(400);
});

it('empty password returns 400', () => {
  return request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com',
    password: ''
  })
  .expect(400);
});

it('password too long returns 400', () => {
  return request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com',
    password: '1111111111111111111111111111111111111'
  })
  .expect(400);
});

it('empty email and password returns 400', () => {
  return request(app)
  .post('/api/users/signup')
  .send({
    email: '',
    password: ''
  })
  .expect(400);
});

it('duplicate email returns 400', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '1234'
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '1234'
    })
    .expect(400);
});

it('test@test.com signup set cookies check', async () => {
  const res = await request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com',
    password: '1234'
  })
  .expect(201);

  expect(res.get('Set-Cookie')).toBeDefined();
});
