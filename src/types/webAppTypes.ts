export type UserInformation = {
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  bio: string
}

export interface LoggedInUserInformation extends UserInformation {
  id: number
}