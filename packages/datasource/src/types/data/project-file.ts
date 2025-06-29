export type ProjectFileCategory = "exports" | "sources";

export interface ProjectFile {
  readonly id: number;
  category: ProjectFileCategory;
  filename: string;
  mimetype: string;
}
