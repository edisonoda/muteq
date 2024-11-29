import { Item } from "./item";
import { Listable } from "./listable";

export interface Section extends Listable {
    _items: Array<Item>;
}