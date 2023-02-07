import {AdRecord} from "../records/ad/ad.record";

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

test("ADRecord returns null from database for unexisting entry." , async () =>{
    const ad = await AdRecord.getOne("");
    expect(ad).toBeNull();
});