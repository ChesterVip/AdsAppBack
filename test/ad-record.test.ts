import {AdRecord} from "../records/ad/ad.record";


const defaultObj = {
    name: "Test Name",
    description: "blah",
    url: "http:://fgfalke.eu",
    price: 69,
    lat: 50,
    lon: 30,
}

test("Can build ADRECORD", () => {
    const ad = new AdRecord({
        ...defaultObj,
    })
    expect(ad.name).toBe("Test Name");
    expect(ad.description).toBe("blah");
    expect(ad.url).toBe("http:://fgfalke.eu");
})

test("Validates invalid price", () =>  {
    expect( () => new AdRecord({
                 ...defaultObj,
                 price: -98,
})).toThrow("Cena musi miescić sie w przedziale od 0 do 10.000.000")})
