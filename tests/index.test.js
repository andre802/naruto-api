const app = require('../lib/routes/server');
const supertest = require('supertest');

test("GET /characters", async () => {
    await supertest(app).get('/characters')
        .expect(200)
        .then(resp => {
            // Check type and length
            expect(resp.body.length).toEqual(606);
            expect(Array.isArray(resp.body.names).valueOf)
            // Check data
            expect(resp.body.names[0]).toBe("Ten-Tails")
            expect(resp.body.names[resp.body.length-1]).toBe("Zōri")
        })
})

test("GET /clans", async () => {
    await supertest(app).get('/clans')
        .expect(200)
        .then(resp => {
            expect(resp.body.length).toEqual(50);
            expect(Array.isArray(resp.body.names).valueOf);

            expect(resp.body.names[0]).toBe("Aburame Clan");
            expect(resp.body.names[resp.body.length - 1]).toBe("Ōtsutsuki Clan");
        })
})

