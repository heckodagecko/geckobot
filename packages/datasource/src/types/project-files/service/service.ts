import type { ProjectExportFilesService } from "./export";
import type { ProjectSourceFilesService } from "./source";

export interface ProjectFilesService {
  exports: ProjectExportFilesService;
  sources: ProjectSourceFilesService;
}
