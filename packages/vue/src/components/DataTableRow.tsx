import type { SetupContext } from 'vue'
import type { JSX } from 'vue/jsx-runtime'

interface DataTableRowProps<T extends object> {
  selectable?: boolean
  selected?: boolean
  columns?: (keyof T)[] | null
  data: T
}

interface DataTableRowEvents {
  'update:selected'(value: boolean): void
}

export default function DataTableRow<T extends object>(
  props: DataTableRowProps<T>,
  { slots, emit }: SetupContext<DataTableRowEvents>,
) {
  const keys = props.columns != null ? props.columns : (Object.keys(props.data) as (keyof T)[])

  const cells: JSX.Element[] = []

  if (props.selectable) {
    cells.push(
      <td>
        <input
          type="checkbox"
          class="checkbox checkbox-primary"
          checked={props.selected}
          onChange={(e) => emit('update:selected', (e.target as HTMLInputElement).checked)}
        />
      </td>,
    )
  }

  cells.push(
    ...keys.map((key) => {
      const slotName = `item.${String(key)}` as const
      const slotContent = slots[slotName]?.({ item: props.data })
      return <td>{slotContent || props.data[key]}</td>
    }),
  )

  if (slots.actions != null) {
    cells.push(<td>{slots.actions({ item: props.data })}</td>)
  }

  return <tr class={props.selected ? 'bg-base-300' : 'hover:bg-base-300'}>{cells}</tr>
}
