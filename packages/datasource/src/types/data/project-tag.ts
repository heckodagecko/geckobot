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
