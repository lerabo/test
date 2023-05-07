export enum EAppRoles {
  INSTRUCTOR = 'INSTRUCTOR',
  STUDENT = 'STUDENT',
}
export interface IJWTPayload {
  id: string;
  role: EAppRoles[];
}
