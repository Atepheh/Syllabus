import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {RealisedSubject} from "../model/realised.subject";
import {RealisationInfo, RealisationInfoPage} from "../model/realisation.info";

@Injectable({
  providedIn: 'root'
})
export class RealisationService {

  constructor(private http: HttpClient) {
  }

  getActiveRealisations(page: number | undefined) {
    return this.http.get<RealisationInfoPage>(`${environment.apiUrl}/realisations?page=${page}&size=8`)
  }

  getArchivedRealisations(page: number | undefined) {
    return this.http.get<RealisationInfoPage>(`${environment.apiUrl}/realisations/archived?page=${page}&size=8`)
  }

  getRealisedSubjects() {
    return this.http.get<RealisedSubject[]>(`${environment.apiUrl}/realisations/me`)
  }

  getRealisationInfo(id: number) {
    return this.http.get<RealisationInfo>(`${environment.apiUrl}/realisations/${id}`)
  }

  archiveRealisation(realisationId: number) {
    return this.http.delete(`${environment.apiUrl}/realisations/${realisationId}`)
  }
}
