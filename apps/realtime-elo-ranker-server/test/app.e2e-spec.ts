import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('PlayerController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/player (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/player')
      .send({ id: 'player1' })
      .expect(201)
      .expect((res) => {
        expect({
          id: res.body.id,
          rank: 1200
        })
      });
  });

  afterAll(async () => {
    await app.close();
  });
});