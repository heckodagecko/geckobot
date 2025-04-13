export interface DataItem<T extends object> {
  selected?: boolean
  data: T
}

export type DataFormMode = 'CREATE' | 'UPDATE'
