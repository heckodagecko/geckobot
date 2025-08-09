import MockDatasource from '@geckobot/datasource-mock'
import ExpressDatasource from '@geckobot/datasource-express'
import type Datasource from '@geckobot/datasource'

let datasource: Datasource

if (import.meta.env.VITE_API_URL || import.meta.env.MODE === 'production') {
  datasource = new ExpressDatasource(import.meta.env.VITE_API_URL!)
} else {
  datasource = new MockDatasource()
}

export default datasource
