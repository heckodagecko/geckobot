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

export interface CreateProjectTag {
  name: string;
  color?: string | null;
}

export interface UpdateProjectTag {
  name?: string;
  color?: string | null;
}

export interface ProjectTag {
  readonly id: number;
  name: string;
  color?: string | null;
}

export type ProjectFileCategory = "exports" | "sources";

export interface ProjectFile {
  readonly id: number;
  category: ProjectFileCategory;
  filename: string;
  mimetype: string;
}
