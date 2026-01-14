/* eslint-disable prettier/prettier */

import User from "#models/user";
export class AuthService {

  async createUser(data: any){
    const user = new User()
    user.lastName = data.last_name
    user.firstName = data.first_name
    user.email = data.email
    user.password = data.password

    await user.save()
    return user
  }

}