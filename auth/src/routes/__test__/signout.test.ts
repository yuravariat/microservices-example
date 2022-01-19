import request from "supertest";
import { app } from '../../app';

it('test@test.com signout', async () => {

  const cookie = await global.signup();

  const res = await request(app)
  .get('/api/users/signout')
  .set('Cookie', cookie)
  .expect(200);

  expect(res.get('Set-Cookie')).toBeDefined();
});
