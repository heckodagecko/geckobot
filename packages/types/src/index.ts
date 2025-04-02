export interface CreateProject {
  name: string;
  description?: string | null;
  startedAt?: string | null;
}

export interface UpdateProject extends CreateProject {}

export interface Project extends CreateProject {
  readonly _id: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface ProjectTag {
  readonly _id: number;
  name: string;
}

export type ProjectFileCategory = "exports" | "sources";

export interface ProjectFile {
  readonly _id: number;
  category: ProjectFileCategory;
  filename: string;
  mimetype: string;
}
