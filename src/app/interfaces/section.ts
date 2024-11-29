import { Listable } from "./listable";

export interface Section extends Listable {
    items: Array<number>;
}