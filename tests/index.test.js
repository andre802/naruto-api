const {app, mongoose} = require('../lib/routes/server');
const supertest = require('supertest');
jest.setTimeout(50000)

// test("GET /characters", async () => {
//     await supertest(app).get('/characters')
//         .expect(200)
//         .then(resp => {
//             // Check type and length
//             expect(resp.body.length).toEqual(606);
//             expect(Array.isArray(resp.body.names).valueOf)
//             // Check data
//             expect(resp.body.names[0]).toBe("A (First Raikage)")
//             // Not 'Zori' due to ordering with special characters
//             expect(resp.body.names[resp.body.length-1]).toBe("Ūhei")
//         })
// })

// test("GET /characters/:character", async () => {
//     let names = await supertest(app).get('/characters').
//         then(resp => {
//             return resp.body.names;
//         });
//     names.forEach(async name => {
//         let url = `/characters/${encodeURI(name)}`;
//         await supertest(app).get(url).expect(200)
//             .then(resp => {
//                 expect(Array.isArray(resp.body.images))
//             })
//     })
// })
// test("GET /clans", async () => {
//     await supertest(app).get('/clans')
//         .expect(200)
//         .then(resp => {
//             expect(resp.body.length).toEqual(50);
//             expect(Array.isArray(resp.body.names).valueOf);

//             expect(resp.body.names[0]).toBe("Aburame Clan");
//             expect(resp.body.names[resp.body.length - 1]).toBe("Ōtsutsuki Clan");
//         })
// })

// test("GET /clans/:clan", async () => {
//     let names = await supertest(app).get('/clans').
//                 then(resp => {
//                    return resp.body.names;
//                 })
//                 .catch(e => {
//                     console.error(e);
//                 })
//     names.forEach(async name => {
//                     let url = `/clans/${encodeURI(name)}`;
//                     await supertest(app).get(url).expect(200)
//                     .then(resp => {
//                         expect(Array.isArray(resp.body.images))
//                     })
//             })
// })

test("GET /jutsus", async () => {
    await supertest(app).get('/jutsus')
        .then(resp => resp.body)
        .then(body => {
            expect(body.length == 796)
            expect(Array.isArray(body.names))
        })
})

test("GET /jutsus/:jutsu", async () => {
    let jutsus = await supertest(app).get('/jutsus')    
                .then(resp => resp.body.names)
    jutsus.forEach(async jutsu => {
        let url = `/jutsus/${encodeURIComponent(jutsu)}`;
        await supertest(app).get(url)
            .expect(200)
            .then(resp => resp.body)
            .then(body => {
                expect(Array.isArray(body.images))
            })

    })
})
afterAll(async () => {
    await mongoose.connection.close()
    
})
