export interface ProjectSourceFile {
  readonly id: number;
  filename: string;
  mimetype?: string | null;
  size: number;
  isDirectory: boolean;
  isExportable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectExportFile {
  readonly id: number;
  filename: string;
  mimetype: string;
  size: number;
  url: string;
  createdAt: string;
}
