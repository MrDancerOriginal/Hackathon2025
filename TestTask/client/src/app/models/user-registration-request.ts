export interface UserRegistrationRequestDto {
  name: string;
  email: string;
  password: string;
  role: string; // 'Shelter' or 'Volunteer'
}
