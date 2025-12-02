import { Request } from "express";

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthRequest extends Request {
  user?: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}
