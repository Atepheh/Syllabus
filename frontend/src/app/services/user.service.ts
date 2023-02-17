import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User, UserPage} from "../model/user";
import {AuthService} from "./auth.service";
import {TokenPage} from "../model/token";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User | undefined

  constructor(private http: HttpClient,
              private authService: AuthService) {
    if (this.authService.authenticated.value) {
      this.getLoggedInUser()
    } else {
      this.authService.authenticated.subscribe((authenticated) => {
        if (authenticated) {
          this.getLoggedInUser()
        } else {
          this.user = undefined
        }
      })
    }
  }

  generateCodes(amount: number, role: string, schoolClassId: number | undefined) {
    if (schoolClassId) {
      return this.http.post(`${environment.apiUrl}/users/tokens`, {
        amount: amount,
        role: role,
        schoolClassId: schoolClassId
      })
    } else {
      return this.http.post(`${environment.apiUrl}/users/tokens`, {
        amount: amount,
        role: role,
      })
    }
  }

  getAllActiveUsers(page: number | undefined) {
    return this.http.get<UserPage>(`${environment.apiUrl}/users?size=10&page=${page}&sort=lastName,firstName`)
  }

  getAllArchivedUsers(page: number | undefined) {
    return this.http.get<UserPage>(`${environment.apiUrl}/users/archived?size=10&page=${page}&sort=lastName,firstName`)
  }

  getAllActiveStudents(page: number | undefined) {
    return this.http.get<UserPage>(`${environment.apiUrl}/users/students?size=10&page=${page}&sort=lastName,firstName`)
  }

  getAllActiveTeachers(page: number | undefined) {
    return this.http.get<UserPage>(`${environment.apiUrl}/users/teachers`)
  }

  getAllActiveOffices(page: number | undefined) {
    return this.http.get<UserPage>(`${environment.apiUrl}/users/offices`)
  }

  getAllActiveDirectors(page: number | undefined) {
    return this.http.get<UserPage>(`${environment.apiUrl}/users/directors`)
  }

  getAllArchivedStudents(page: number | undefined) {
    return this.http.get<UserPage>(`${environment.apiUrl}/users/students/archived`)
  }

  getAllArchivedTeachers(page: number | undefined) {
    return this.http.get<UserPage>(`${environment.apiUrl}/users/teachers/archived`)
  }

  getAllArchivedOffices(page: number | undefined) {
    return this.http.get<UserPage>(`${environment.apiUrl}/users/offices/archived`)
  }

  getAllArchivedDirectors(page: number | undefined) {
    return this.http.get<UserPage>(`${environment.apiUrl}/users/directors/archived`)
  }


  getAllNotSupervisingActiveTeachers() {
    return this.http.get<User[]>(`${environment.apiUrl}/users/teachers/free?sort=lastName,firstName`)
  }

  getStudentTokens(page: number | undefined) {
    return this.http.get<TokenPage>(`${environment.apiUrl}/users/tokens/students?page=${page}&sort=createdAt`)
  }

  getTeacherTokens(page: number | undefined) {
    return this.http.get<TokenPage>(`${environment.apiUrl}/users/tokens/teachers?page=${page}&sort=createdAt`)
  }

  getOfficeTokens(page: number | undefined) {
    return this.http.get<TokenPage>(`${environment.apiUrl}/users/tokens/offices?page=${page}&sort=createdAt`)
  }

  getDirectorTokens(page: number | undefined) {
    return this.http.get<TokenPage>(`${environment.apiUrl}/users/tokens/directors?page=${page}&sort=createdAt`)
  }

  getLoggedInUserObservable() {
    return this.http.get<User>(`${environment.apiUrl}/users/me`)
  }

  getLoggedInUser() {
    this.http.get<User>(`${environment.apiUrl}/users/me`).subscribe((result) => {
      this.user = result;
    })
  }

  updateAbout(newAbout: string) {
    return this.http.put(`${environment.apiUrl}/users/me/description`, {description: newAbout}, {observe: "response"})
  }

  changePassword(oldPassword: string, newPassword: string) {
    return this.http.put(`${environment.apiUrl}/users/me/password`, {
      oldPassword: oldPassword,
      newPassword: newPassword
    }, {observe: "response"})
  }

  archiveUser(userId: number | undefined) {
    return this.http.delete(`${environment.apiUrl}/users/${userId}`)
  }
}
