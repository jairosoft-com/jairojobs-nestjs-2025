export interface JwtPayload {
  sub: string;
  email: string;
  roles: string[];
}

export interface RequestUser {
  userId: string;
  email: string;
  roles: string[];
}

export interface AuthRequest extends Request {
  user: RequestUser;
}
