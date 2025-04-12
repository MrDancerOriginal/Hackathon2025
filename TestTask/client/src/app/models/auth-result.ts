export interface AuthResult {
  result: boolean;
  token?: string;
  id?: string;
  errors?: string[];
}
