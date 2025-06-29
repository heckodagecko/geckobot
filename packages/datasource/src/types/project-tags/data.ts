export type HexColor = `#${string}`;

export interface CreateProjectTag {
  name: string;
  color?: HexColor | null;
}

export interface UpdateProjectTag {
  name?: string;
  color?: HexColor | null;
}

export interface ProjectTag {
  readonly id: number;
  name: string;
  color?: HexColor | null;
  createdAt: string;
  updatedAt: string;
}
