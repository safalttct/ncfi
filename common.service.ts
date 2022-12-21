
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../api.config';
import { Employee } from '../interfaces/employee.interface';
import { UserData } from '../modules/admin/components/user/manage-users/manage-users.component';
import { AuthService } from './auth.service';

@Injectable()
export class CommonService {

  getItemsObservable : Observable<Employee[]>
  getItemsConstructor : any;
  
  constructor(private http : HttpClient, private auth : AuthService   ){

    const GET_EMPLOYEES = "employee/getEmployees";
    //const UPDATE_EMPLOYEE = "employee/UpdateEmployee";

    this.getItemsObservable = Observable.create((observer: any) => {
      this.http.get<Employee[]>(API_CONFIG.BASE_URL + GET_EMPLOYEES).subscribe(response => {
        observer.next(response);
        observer.complete();
      }, (error) => {
        console.error(error)
        observer.error(false);
      });
    })

    this.getItemsConstructor = ():Observable<Employee[]> => {
      return this.http.get<Employee[]>(API_CONFIG.BASE_URL + GET_EMPLOYEES);
    }

  } // end of constructor 


  getItems(): Observable<Employee[]> {
    return this.http.get<Employee[]>(API_CONFIG.BASE_URL + API_CONFIG.EMPLOYEE.GET_EMPLOYEES);
  }

  postItem(postObj : any)  {
    return this.http.post(API_CONFIG.BASE_URL + API_CONFIG.EMPLOYEE.UPDATE_EMPLOYEE, postObj)
  }

  getAllUsers(): Observable<UserData[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.get<UserData[]>(API_CONFIG.BASE_URL + API_CONFIG.USERS.GET_ALL_USERS, {headers: headersInstance});
  }

  getAllNationalities(): Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.get<any[]>(API_CONFIG.BASE_URL + API_CONFIG.USERS.GET_ALL_NATIONALITIES, {headers: headersInstance});
  }

  getAllRoles() : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.get<any[]>(API_CONFIG.BASE_URL + API_CONFIG.USERS.GET_ALL_ROLES, {headers: headersInstance});
  }

  getAllPermissions() : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.get<any[]>(API_CONFIG.BASE_URL + API_CONFIG.USERS.GET_ALL_PERMISSIONS, {headers: headersInstance});
  }
  getUserPermissions(ID : string) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.get<any[]>(API_CONFIG.BASE_URL + API_CONFIG.USERS.GET_USER_PERMISSIONS+ID, {headers: headersInstance});
  }

  getRolePermissions(ID : string) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.get<any[]>(API_CONFIG.BASE_URL + API_CONFIG.USERS.GET_ROLE_PERMISSIONS+ID, {headers: headersInstance});
  }

  getAllDirectorates() : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken(),);
    return this.http.get<any[]>(API_CONFIG.BASE_URL + API_CONFIG.ORGANIZATION.GET_ALL_DIRECTORATES, {headers: headersInstance});
  }

  getDepartmentsByDirectorateId(id: any) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.post<any[]>(API_CONFIG.BASE_URL + API_CONFIG.ORGANIZATION.GET_DEPARTMENTS_BY_DIRECTORATE_ID + id, {headers: headersInstance});
  }

  registerUser(postObj : any) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.post<any[]>(API_CONFIG.BASE_URL + API_CONFIG.USERS.REGISTER_USER, postObj, {headers: headersInstance});
  }

  addRole(postObj : any) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.post<any[]>(API_CONFIG.BASE_URL + API_CONFIG.USERS.ADD_ROLE, postObj, {headers: headersInstance});
  }


  updateUser(ID:any, postObj : any) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.put<any[]>(API_CONFIG.BASE_URL + API_CONFIG.USERS.UPDATE_USER+ID, postObj, {headers: headersInstance});
  }

  updateRole(ID:any, postObj : any) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    console.log(API_CONFIG.BASE_URL + API_CONFIG.USERS.UPDATE_ROLE+ID);

    return this.http.put<any[]>(API_CONFIG.BASE_URL + API_CONFIG.USERS.UPDATE_ROLE+ID, postObj, {headers: headersInstance});
  }

  getUserById(ID : string) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.get<any[]>(API_CONFIG.BASE_URL + API_CONFIG.USERS.GET_USER_BY_ID+ID, {headers: headersInstance});
  }

  getAllProjects(secureuserid:any) : Observable<any[]> {
   
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    console.log(API_CONFIG.BASE_URL + API_CONFIG.PROJECTS.GET_ALL_PROJECTS+secureuserid);
    return this.http.get<any[]>(API_CONFIG.BASE_URL + API_CONFIG.PROJECTS.GET_ALL_PROJECTS+secureuserid, {headers: headersInstance});
  }

  getAllArchives(secureuserid:any) : Observable<any[]> {
   
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    console.log(API_CONFIG.BASE_URL + API_CONFIG.PROJECTS.GET_ALL_ARCHIVES);
    return this.http.get<any[]>(API_CONFIG.BASE_URL + API_CONFIG.PROJECTS.GET_ALL_ARCHIVES, {headers: headersInstance});
  }

  getAllTrackings(id: any) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.get<any[]>(API_CONFIG.BASE_URL + API_CONFIG.TRACKING.GET_ALL_TRACKINGS + id, {headers: headersInstance});
  }

  getAllObjectiveTypes() : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.get<any[]>(API_CONFIG.BASE_URL + API_CONFIG.PROJECTS.GET_OBJECTIVE_TYPES, {headers: headersInstance});
  }

  getObjectivesByType(id: any) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.get<any[]>(API_CONFIG.BASE_URL + API_CONFIG.PROJECTS.GET_OBJECTIVES_BY_TYPE + id, {headers: headersInstance});
  }

  getPriorities() : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.get<any[]>(API_CONFIG.BASE_URL + API_CONFIG.PROJECTS.PRIORITIES, {headers: headersInstance});
  }

  getProjectWorkflowStatusList() : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.get<any[]>(API_CONFIG.BASE_URL + API_CONFIG.PROJECTS.PROJECT_WORKFLOWS, {headers: headersInstance});
  }

  getAssignableUsers() : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.get<any[]>(API_CONFIG.BASE_URL + API_CONFIG.USERS.ASSIGNABLE_USERS, {headers: headersInstance});
  }

  registerProject(postObj : any) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.post<any[]>(API_CONFIG.BASE_URL + API_CONFIG.PROJECTS.REGISTER_PROJECT, postObj, {headers: headersInstance});
  }

  getProjectById(ID : string) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.get<any[]>(API_CONFIG.BASE_URL + API_CONFIG.PROJECTS.GET_PROJECT_BY_ID+ID, {headers: headersInstance});
  }

  getReportByType(ID : string) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.get<any[]>(API_CONFIG.BASE_URL + API_CONFIG.DASHBOARD.GET_REPORT+ID, {headers: headersInstance});
  }

  updateProject(ID:any, postObj : any) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.put<any[]>(API_CONFIG.BASE_URL + API_CONFIG.PROJECTS.UPDATE_PROJECT+ID, postObj, {headers: headersInstance});
  }

  getMilestonesByProject(ID:any): Observable<UserData[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.get<UserData[]>(API_CONFIG.BASE_URL + API_CONFIG.PROJECTS.MILESTONES.GET_MILESTONES_BY_PROJECT.replace("*", ID), {headers: headersInstance});
  }

  registerMilestone(postObj : any) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.post<any[]>(API_CONFIG.BASE_URL + API_CONFIG.PROJECTS.MILESTONES.REGISTER_MILESTONE, postObj, {headers: headersInstance});
  }

  documentMilestone(postObj : any,id:any) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.post<any[]>(API_CONFIG.BASE_URL + API_CONFIG.PROJECTS.MILESTONES.DOCUMENT_MILESTONE+id, postObj, {headers: headersInstance});
  }

  documentAction(postObj : any,id:any) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.post<any[]>(API_CONFIG.BASE_URL + API_CONFIG.PROJECTS.MILESTONES.DOCUMENT_ACTION+id, postObj, {headers: headersInstance});
  }


  documentProject(postObj : any,id:any) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.post<any[]>(API_CONFIG.BASE_URL + API_CONFIG.PROJECTS.DOCUMENT_PROJECT+id, postObj, {headers: headersInstance});
  }

  documentTask(postObj : any,id:any) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.post<any[]>(API_CONFIG.BASE_URL + API_CONFIG.TASKS.DOCUMENT_TASK+id, postObj, {headers: headersInstance});
  }

  downloadMilestone(postObj : any,id:any) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.post<any[]>(API_CONFIG.BASE_URL + API_CONFIG.PROJECTS.MILESTONES.DOWNLOAD_MILESTONE+id,postObj, {headers: headersInstance});
  }

  downloadAction(postObj : any,id:any) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.post<any[]>(API_CONFIG.BASE_URL + API_CONFIG.PROJECTS.MILESTONES.DOWNLOAD_ACTION+id,postObj, {headers: headersInstance});
  }

  downloadProject(postObj : any,id:any) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.post<any[]>(API_CONFIG.BASE_URL + API_CONFIG.PROJECTS.DOWNLOAD_PROJECT+id, postObj, {headers: headersInstance});
  }

  downloadTask(id:any) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.post<any[]>(API_CONFIG.BASE_URL + API_CONFIG.TASKS.DOWNLOADTASK+id, {headers: headersInstance});
  }


  registerTask(postObj : any) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.post<any[]>(API_CONFIG.BASE_URL + API_CONFIG.TASKS.REGISTER_TASK, postObj, {headers: headersInstance});
  }

  addPermission(postObj : any) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.post<any[]>(API_CONFIG.BASE_URL + API_CONFIG.USERS.ADD_PERMISSION, postObj, {headers: headersInstance});
  }

  addRolePermission(postObj : any) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.post<any[]>(API_CONFIG.BASE_URL + API_CONFIG.USERS.ADD_ROLE_PERMISSION, postObj, {headers: headersInstance});
  }


  // removePermission(postObj : any) : Observable<any[]> {
  //   let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
  //  .set('Accept-Language', this.auth.getLang());
    
  //   return this.http.post<any[]>(API_CONFIG.BASE_URL + API_CONFIG.USERS.REMOVE_PERMISSION, postObj, {headers: headersInstance});
  // }

  removePermission(postObj : any) {

    console.log('url '+API_CONFIG.BASE_URL + API_CONFIG.USERS.REMOVE_PERMISSION);
    console.log('obj '+JSON.stringify(postObj));
    return this.http.request('DELETE', API_CONFIG.BASE_URL + API_CONFIG.USERS.REMOVE_PERMISSION, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json','Authorization': this.auth.getToken()
      }),
      body: postObj
    });
   // return this.http.delete(API_CONFIG.BASE_URL + API_CONFIG.USERS.REMOVE_PERMISSION, postObj);
  }

  removeRolePermission(postObj : any) {

    console.log('url '+API_CONFIG.BASE_URL + API_CONFIG.USERS.REMOVE_ROLE_PERMISSION);
    console.log('obj '+JSON.stringify(postObj));
    return this.http.request('DELETE', API_CONFIG.BASE_URL + API_CONFIG.USERS.REMOVE_ROLE_PERMISSION, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json','Authorization': this.auth.getToken()
      }),
      body: postObj
    });
   // return this.http.delete(API_CONFIG.BASE_URL + API_CONFIG.USERS.REMOVE_PERMISSION, postObj);
  }

  changePassword(postObj : any) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json','Authorization': this.auth.getToken()})
    }
    console.log('url '+API_CONFIG.BASE_URL + API_CONFIG.USERS.CHANGE_PWD);
    console.log('obj '+postObj);
    return this.http.put(API_CONFIG.BASE_URL + API_CONFIG.USERS.CHANGE_PWD, postObj, httpOptions);
  }


  registerAction(postObj : any) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.post<any[]>(API_CONFIG.BASE_URL + API_CONFIG.ACTIONS.REGISTER_ACTION, postObj, {headers: headersInstance});
  }

  registerTracking(ID:any,postObj : any) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.post<any[]>(API_CONFIG.BASE_URL + API_CONFIG.TRACKING.REGISTER_TRACKING+ID, postObj, {headers: headersInstance});
  }

  getMilestoneById(ID : string) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.get<any[]>(API_CONFIG.BASE_URL + API_CONFIG.PROJECTS.MILESTONES.GET_MILESTONE_BY_ID+ID, {headers: headersInstance});
  }

  getTaskById(ID : string) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.get<any[]>(API_CONFIG.BASE_URL + API_CONFIG.TASKS.GET_TASK_BY_ID+ID, {headers: headersInstance});
  }

  getActionById(ID : string) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.get<any[]>(API_CONFIG.BASE_URL + API_CONFIG.ACTIONS.GET_ACTION_BY_ID+ID, {headers: headersInstance});
  }

  updateMilestone(ID:any, postObj : any) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.put<any[]>(API_CONFIG.BASE_URL + API_CONFIG.PROJECTS.MILESTONES.UPDATE_MILESTONE+ID, postObj, {headers: headersInstance});
  }

  updateTask(ID:any, postObj : any) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.put<any[]>(API_CONFIG.BASE_URL + API_CONFIG.TASKS.UPDATE_TASK+ID, postObj, {headers: headersInstance});
  }

  updateAction(ID:any, postObj : any) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.put<any[]>(API_CONFIG.BASE_URL + API_CONFIG.ACTIONS.UPDATE_ACTION+ID, postObj, {headers: headersInstance});
  }

  getDeleteToken(ID:any): Observable<any> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.get<any>(API_CONFIG.BASE_URL + API_CONFIG.SECURITY.GET_DELETE_TOKEN.replace("*", ID), { headers : headersInstance, responseType:  'text' as 'json'});
  }

  deleteMilestone(TOKEN:any): Observable<any> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.delete<any>(API_CONFIG.BASE_URL + API_CONFIG.PROJECTS.MILESTONES.DELETE_MILESTONE+TOKEN, {headers: headersInstance});
  }

  deleteProject(TOKEN:any): Observable<any> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.delete<any>(API_CONFIG.BASE_URL + API_CONFIG.PROJECTS.DELETE_PROJECT+TOKEN, {headers: headersInstance});
  }

  deleteTask(TOKEN:any): Observable<any> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.delete<any>(API_CONFIG.BASE_URL + API_CONFIG.TASKS.DELETE_TASK+TOKEN, {headers: headersInstance});
  }

  deleteRole(TOKEN:any): Observable<any> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.delete<any>(API_CONFIG.BASE_URL + API_CONFIG.USERS.DELETE_ROLE+TOKEN, {headers: headersInstance});
  }

  deleteAction(TOKEN:any): Observable<any> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.delete<any>(API_CONFIG.BASE_URL + API_CONFIG.ACTIONS.DELETE_ACTION+TOKEN, {headers: headersInstance});
  }

  getTasksByMilestone(ID : string) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.get<any[]>(API_CONFIG.BASE_URL + API_CONFIG.TASKS.GET_TASKS_BY_MILESTONE.replace("*", ID), {headers: headersInstance});
  }

  getActionsByTask(ID : string) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.get<any[]>(API_CONFIG.BASE_URL + API_CONFIG.ACTIONS.GET_ACTIONS_BY_TASK.replace("*", ID), {headers: headersInstance});
  }

  getProjectStatus() : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.get<any[]>(API_CONFIG.BASE_URL + API_CONFIG.DASHBOARD.PROJECT_STATUS, {headers: headersInstance});
  }

  getProjectsByPriority() : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.get<any[]>(API_CONFIG.BASE_URL + API_CONFIG.DASHBOARD.PROJECTS_BY_PRIORITY, {headers: headersInstance});
  }

  getMilestonesByQuarter() : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.get<any[]>(API_CONFIG.BASE_URL + API_CONFIG.DASHBOARD.MILESTONES_BY_QUARTER, {headers: headersInstance});
  }

  getTasksByMilestoneInQuarter(id: any) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.get<any[]>(API_CONFIG.BASE_URL + API_CONFIG.DASHBOARD.TASKS_BY_QUARTER + id, {headers: headersInstance});
  }
  getTasksStatusByQuarter(id: any) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.get<any[]>(API_CONFIG.BASE_URL + API_CONFIG.DASHBOARD.TASKS_STATUS_BY_QUARTER + id, {headers: headersInstance});
  }
  getMilestoneDataByQuarter(id: any) : Observable<any[]> {
    let headersInstance = new HttpHeaders().set('Authorization', this.auth.getToken())
    .set('Accept-Language', this.auth.getLang());
    return this.http.get<any[]>(API_CONFIG.BASE_URL + API_CONFIG.DASHBOARD.MILESTONE_DATA_BY_QUARTER + id, {headers: headersInstance});
  }

}