import { Category } from "./category";
import { Listable } from "./listable";
import { Section } from "./section";

export interface Item extends Listable {
    manufacturer: string;
    year: number;
    section?: Section;
    category?: Category;
}