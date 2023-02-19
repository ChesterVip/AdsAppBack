import {AdRecord} from "../records/ad/ad.record";
import {pool} from "../utils/db";
import {AdEntity} from "../types";

afterAll(async () => {
    await pool.end();
})

const defaultObj = {
    name: "Test Name",
    description: "blah",
    url: "http:://fgfalke.eu",
    price: 69,
    lat: 50,
    lon: 30,
}


test("AdRecord returns data from database for one entry", async () => {

    const ad = await AdRecord.getOne("1d5f554c-a71e-11ed-9ca8-36e73c20932e");
    console.log(ad);
    expect(ad).toBeDefined();
    expect(ad.id).toBe("1d5f554c-a71e-11ed-9ca8-36e73c20932e")
    expect(ad.name).toBe("FGFALKE")
    expect(ad.description).toBe("Mariusz Sokołowski");
    expect(ad.price).toBe(69.00);
    expect(ad.url).toBe("maniek.com");
    expect(ad.lat).toBe(50.1225771);
    expect(ad.lon).toBe(20.6684285);
});

test("ADRecord returns null from database for unexisting entry.", async () => {
    const ad = await AdRecord.getOne("");
    expect(ad).toBeNull();
});

test("AdRecord.findAll from database for All entries.", async () => {
    const ads = await AdRecord.findAll("");
    expect(ads[0].id).toBeDefined();
});
//
test("AdRecord.findAll from database for existing entry.", async () => {
    const ads = await AdRecord.findAll("a");
    console.log(ads);
    expect(ads).not.toEqual([]);
    expect(ads[0].id).toBeDefined();
})
test("AdRecord.findAll from database for not existing entry for sure.", async () => {
    const ads = await AdRecord.findAll("asdfghjklqwertyuiopzxcvbnm,./");
    expect(ads).toEqual([]);
})

test("AdRecord.findAll from database for not existing entry for sure.", async () => {
    const ads = await AdRecord.findAll("");
    expect((ads[0] as AdEntity).price).toBeUndefined();
    expect((ads[0] as AdEntity).description).toBeUndefined();
})

test("AdRecord.insert to database new Record and returns new UUID.", async () => {
    const ad = new AdRecord({
        ...defaultObj,
    })
    await ad.insert();

    expect(ad.id).toBeDefined();
    expect(typeof ad.id).toBe("string");
})

test("AdRecord.getOne check new Record and returns new Object.", async () => {
    const ad = new AdRecord({
        ...defaultObj,
    })
    await ad.insert();
    const foundRecord = await AdRecord.getOne(ad.id);
    expect(foundRecord).toBeDefined();
    expect(foundRecord).not.toBeNull();
    expect(foundRecord.id).toBe(ad.id);
})