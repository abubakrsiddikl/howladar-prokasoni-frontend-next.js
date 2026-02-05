

export type TRole = "ADMIN" | "STORE_MANAGER" | "CUSTOMER";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  picture: string;
  isDeleted: boolean;
  isActive: string;
  isVerified: boolean;
  phone: string;
  role: TRole;
  auths: Auth[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Auth {
  provider: string;
  providerId: string;
}

export interface IValidationErrorResponse {
  success: false;
  errors: {
    field: string | number | symbol;
    message: string;
  }[];
}

export interface ILoginResponse {
  accessToken: string;
  user: IUser;
}
