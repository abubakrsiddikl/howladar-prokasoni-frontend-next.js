import { IBook } from "./book.type";

export interface IGenre {
  _id?: string;
  name: string;
  books?: IBook[];
  slug?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
