import { defineComponent, ref, type SetupContext } from 'vue'

import DataTableHeader from '@/components/DataTableHeader'
import DataTableRow from '@/components/DataTableRow'
import { toReadable } from '@/utils'
import type { DataItem } from '@/types'

interface DataTableProps<T extends object> {
  selectable?: boolean
  columns?: (keyof T)[] | [keyof T, string][] | null
  items: T[]
  loading?: boolean
}

const DataTable = defineComponent({
  props: {},
  setup(props, { slots }) {
    const items = ref<DataItem<T>[]>([])

    const keys: (keyof T)[] = []
    const headers: string[] = []

    if (props.columns == null || props.columns.length === 0) {
      const entries = Object.keys(props.items[0].data)

      for (let i = 0; i < entries.length; i++) {
        const element = entries[i]

        keys.push(element as keyof T)
        headers.push(toReadable(element))
      }
    } else {
      for (let i = 0; i < props.columns.length; i++) {
        const element = props.columns[i]

        if (Array.isArray(element)) {
          keys.push(element[0])
          headers.push(element[1])
        } else {
          keys.push(element)
          headers.push(toReadable(String(element)))
        }
      }
    }

    return (
      <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table class="table">
          <thead>
            <DataTableHeader selectable={props.selectable} headers={headers}>
              {slots}
            </DataTableHeader>
          </thead>
          <tbody>
            {props.loading ? (
              <tr>
                <td class="text-center" colspan="100%">
                  <span class="loading loading-ring loading-md"></span>
                </td>
              </tr>
            ) : props.items.length === 0 ? (
              <tr>
                <td class="text-center" colspan="100%">
                  {slots['no-items']?.() || 'No items found.'}
                </td>
              </tr>
            ) : (
              props.items.map(({ data }, index) => (
                <DataTableRow selectable={props.selectable} columns={keys} data={data} key={index}>
                  {slots}
                </DataTableRow>
              ))
            )}
          </tbody>
        </table>
      </div>
    )
  },
})

export default DataTable
