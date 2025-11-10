const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const Bug = require('../../src/models/bug');

beforeEach(async () => {
  await Bug.deleteMany(); // Clear the database before each test
});

let mongod;
let app;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  process.env.MONGO_URI = uri;

  // require server after setting MONGO_URI
  app = require('../../src/index_for_test'); // a thin version that exports `app` without listen
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

afterEach(async () => {
  // cleanup DB
  const { collections } = mongoose.connection;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

test('POST /api/bugs creates a bug', async () => {
  const res = await request(app)
    .post('/api/bugs')
    .send({ title: 'Test bug', description: 'details' });
  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty('data.id');
  expect(res.body.title).toBe('Test bug');
});

test('GET /api/bugs returns list', async () => {
  await request(app).post('/api/bugs').send({ title: 'Bug1' });
  const res = await request(app).get('/api/bugs');
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBe(1);
});
