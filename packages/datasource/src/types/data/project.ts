export interface CreateProject {
  name: string;
  description?: string | null;
  startedAt?: string | null;
}

export interface UpdateProject {
  name?: string;
  description?: string | null;
  startedAt?: string | null;
}

export interface Project {
  readonly id: number;
  name: string;
  description: string | null;
  startedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
