import {AdEntity, NewAdEntity} from "../../types";
import {ValidationError} from "../../utils/errors";
import {pool} from "../../utils/db";
import {FieldPacket} from "mysql2";

type AdRecordResults = [AdEntity[], FieldPacket[]];
export class AdRecord implements AdEntity {

    public id: string;
    public name: string;
    public description: string;
    public price: number;
    public url: string;
    public lat: number;
    public lon: number;

    constructor(obj: NewAdEntity) {
        if (!obj.name || obj.name.length > 100){
            throw new ValidationError("Nazwa Ogłoszenia powinna zawierać od min 1 do 100 znaków");
        }
        if (obj.description.length > 1000){
            throw new ValidationError("Treść Ogłoszenia nie może przekraczać  1000 znaków");
        }
        if (obj.price < 0 || obj.price > 10_000_000){
            throw new ValidationError("Cena musi miescić sie w przedziale od 0 do 10.000.000")
        }
        // @TODO: Check if URL is Valid

        if (!obj.url || obj.url.length > 100){
            throw new ValidationError("Link nie może być pusty raz nie dłuższy niż 100 znaków!")
        }
        if ((typeof obj.lat !== "number") || (typeof obj.lon !== "number")){
            throw new ValidationError("NIe można zlokalizować ogłoszenia");
        }

        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.price = obj.price;
        this.url = obj.url;
        this.lat = obj.lat;
        this.lon = obj.lon;
    }

    static async getOne(id: string): Promise<AdRecord | null>{

        const [result] =
            await pool.execute("Select * From `ads` WHERE id = :id", {id}) as AdRecordResults;

        return result.length > 0 ? new AdRecord(result[0]) : null;
    }
}
