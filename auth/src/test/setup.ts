import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from "supertest";
import { app } from '../app';

let mongo: MongoMemoryServer;

jest.setTimeout(60000);

beforeAll(async () => {

    process.env.JWT_KEY = 'mykey';

    mongo = new MongoMemoryServer();
    await mongo.start();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri); //, {
   //     useNewUrlParser: true,
   //     useUnifiedTopology: true
   // });
});

beforeEach(async () => {
    // reset all data
    const collections = await mongoose.connection.db.collections();
    for(let collection of collections){
        collection.deleteMany({});
    }
});

afterAll(async () => {
    // stop
    await mongo.stop();
    await mongoose.connection.close();
});

declare global {
    var signup: () => Promise<string[]>;
}

global.signup = async () => {
    const res = await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: '1234'
    })
    .expect(201);

    const cookie = res.get('Set-Cookie');
    expect(cookie).toBeDefined();
    return cookie || [];
}
