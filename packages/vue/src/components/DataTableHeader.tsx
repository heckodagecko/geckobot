import type { SetupContext } from 'vue'
import type { JSX } from 'vue/jsx-runtime'

interface DataTableHeaderProps {
  selectable?: boolean
  selected?: boolean
  disabled?: boolean
  headers: string[]
}

interface DataTableHeaderEvents {
  selectAll(): void
}

export default function DataTableHeader(
  props: DataTableHeaderProps,
  { slots, emit }: SetupContext<DataTableHeaderEvents>,
) {
  const cells: JSX.Element[] = []

  if (props.selectable) {
    cells.push(
      <th>
        <input
          type="checkbox"
          class="checkbox checkbox-primary"
          checked={props.selected}
          disabled={props.disabled}
          onChange={() => emit('selectAll')}
        />
      </th>,
    )
  }

  cells.push(...props.headers.map((header) => <th>{header}</th>))

  if (slots.actions != null) {
    cells.push(<th>Actions</th>)
  }

  return <tr>{cells}</tr>
}
