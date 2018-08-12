/**
 * @author Semper
 */
import {Ranking} from "./Ranking";

export class Rankings {

    male: Array<Ranking>;
    female: Array<Ranking>;
    ok: boolean;

    constructor(male, female, ok) {
        this.male = male;
        this.female = female;
        this.ok = ok
    }
}