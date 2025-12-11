import { IBook } from "./book.type";

export interface IAuthor {
  _id: string;
  name: string;
  slug: string;
  books?: IBook[];
  totalBooks?: string;
  bio: string;
  birthDate: string;
  profileImage: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
