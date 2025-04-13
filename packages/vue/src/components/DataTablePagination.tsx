import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronLeft, faChevronRight, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import type { SetupContext } from 'vue'
import type { JSX } from 'vue/jsx-runtime'

interface DataTablePaginationProps {
  currentPage: number
  totalPages: number
}

interface DataTablePaginationEvents {
  nextPage(): void
  goToPage(value: number): void
  previousPage(): void
}

const slots = 4

const middleSequence = (middle: number, count: number, min: number, max: number) => {
  const sequence = []
  for (let i = middle - count; i <= middle + count; i++) {
    if (i >= min && i <= max) {
      sequence.push(i)
    }
  }
  return sequence
}

function getPageNumbers(currentPage: number, totalPages: number) {
  const pages: (number | null)[] = middleSequence(currentPage, slots, 1, totalPages)

  if (pages[0] !== 1) {
    pages[0] = 1
  }

  if (pages[1] !== 2) {
    pages[1] = null
  }

  if (pages[pages.length - 2] !== totalPages - 1) {
    pages[pages.length - 2] = null
  }

  if (pages[pages.length - 1] !== totalPages) {
    pages[pages.length - 1] = totalPages
  }

  return pages
}

export default function DataTablePagination(
  props: DataTablePaginationProps,
  { emit }: SetupContext<DataTablePaginationEvents>,
) {
  const buttons: JSX.Element[] = []

  if (props.currentPage > 1) {
    buttons.push(
      <button class="join-item btn" onClick={() => emit('previousPage')}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>,
    )
  }

  getPageNumbers(props.currentPage, props.totalPages).forEach((page) => {
    buttons.push(
      page != null ? (
        <button
          class={`join-item btn ${props.currentPage === page ? 'btn-active' : ''}`}
          onClick={() => emit('goToPage', page)}
        >
          {page}
        </button>
      ) : (
        <button class="join-item btn btn-disabled">
          <FontAwesomeIcon icon={faEllipsis} />
        </button>
      ),
    )
  })

  if (props.currentPage < props.totalPages) {
    buttons.push(
      <button class="join-item btn" onClick={() => emit('nextPage')}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>,
    )
  }

  return <div class="join">{buttons}</div>
}
