import request from "supertest";
import { app } from '../../app';

it('test@test.com current user', async () => {

  const cookie = await global.signup();

  const res = await request(app)
  .get('/api/users/currentuser')
  .set('Cookie', cookie)
  .expect(200);

  expect(res.body.currentUser.email).toEqual('test@test.com');
});

it('not authenticated', async () => {

  const res = await request(app)
  .get('/api/users/currentuser')
  .expect(401);

  expect(res.body.currentUser).toEqual(undefined);
});
