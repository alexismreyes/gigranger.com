export interface JobCategory {
  id?: number;
  name: string;
  description: string;
}

export interface Job {
  id?: number;
  name: string;
  description: string;
  categoryId: number;
  companyId: number;
  salary: number;
  requirements: string;
  emailContact: string;
  phoneContact: string;
  vacancies: number;
  createdBy: number;
}

export interface SnackStatus {
  open: boolean;
  action?: string;
  message?: string;
  severity?: 'success' | 'error';
  source?: string;
}

export type Token = string | null;

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: number | string;
  resumeUrl: string;
}

export interface LoggedUser {
  user: User;
  token: Token;
}

export interface Company {
  id?: number;
  name: string;
  address: string;
  description: string;
  email: string;
  phone: string;
  website?: string;
  foundationDate: string;
  employeesAvgNumber: number;
  /* active: boolean; */
  /* logoUrl: string; */
}

export interface JobApplication {
  id?: number;
  userId: number;
  jobId: number;
  statusId: number;
  requestDate: string;
  comment?: string; //added here just to allow JobsApplicationList to receive the comment when updated status
}

export interface JobApplicationHistory {
  id?: number;
  jobAppId: number;
  updatedBy: number;
  updatedAt: string;
  comment: string;
  updatedStatus: number;
}

export interface Status {
  id?: number;
  name: string;
  description: string;
}

export interface Role {
  id?: number;
  name: string;
  description?: string;
}

export interface JobFilterState {
  searchQuery: string;
  selectedCategory: string;
  selectedCompany: string;
  minSalary: string;
  maxSalary: string;
}
