import { Item } from "./item";
import { Listable } from "./listable";

export interface Category extends Listable {
    items: Array<Item>;
}