import type {
  GetAllOptionsPagination,
  GetAllOptionsSortable,
} from "../../service";
import type { ProjectExportFile, ProjectSourceFile } from "../data";

export interface GetAllProjectSourceFilesOptions
  extends GetAllOptionsPagination,
    GetAllOptionsSortable<ProjectSourceFile> {}

export interface GetAllProjectExportFilesOptions
  extends GetAllOptionsPagination,
    GetAllOptionsSortable<ProjectExportFile> {}

export interface CreateProjectSourceFolder {
  name: string;
}
