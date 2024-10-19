import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AddressResolver (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a new address', async () => {
    const createAddressMutation = `
      mutation {
        createNewAddress(addressInput: {
          userId: 1,
          street: "123 Main St",
          city: "Anytown",
          state: "Anystate",
          postalCode: "12345",
          country: "Country"
        }) {
          id
          street
          city
          state
          postalCode
          country
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: createAddressMutation })
      .expect(200);

    expect(response.body.data.createNewAddress).toBeDefined();
    expect(response.body.data.createNewAddress.street).toBe("123 Main St");
  });

  it('should fetch an address by ID', async () => {
    const fetchAddressQuery = `
      query {
        address(id: 1) {
          id
          street
          city
          state
          postalCode
          country
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: fetchAddressQuery })
      .expect(200);

    expect(response.body.data.address).toBeDefined();
    expect(response.body.data.address.id).toBe(1);
  });

  it('should update an address', async () => {
    const updateAddressMutation = `
      mutation {
        updateAddress(id: 1, addressInput: {
          street: "456 New St"
        }) {
          id
          street
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: updateAddressMutation })
      .expect(200);

    expect(response.body.data.updateAddress).toBeDefined();
    expect(response.body.data.updateAddress.street).toBe("456 New St");
  });

  it('should delete an address', async () => {
    const deleteAddressMutation = `
      mutation {
        deleteAddress(id: 1)
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: deleteAddressMutation })
      .expect(200);

    expect(response.body.data.deleteAddress).toBe(true);
  });
});
