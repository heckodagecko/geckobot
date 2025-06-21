export interface DataItem<T extends object> {
  selected?: boolean
  data: T
}

export enum DataFormMode {
  Create = 'Create',
  Update = 'Update',
}

export enum NotificationType {
  Default,
  Info,
  Success,
  Warning,
  Error,
}

export interface Notification {
  type: NotificationType
  message: string
}

export type HexColor = `#${string}`
