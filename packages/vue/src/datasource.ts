import { MockDatasource as Datasource } from '@geckobot/datasource'

// import Datasource from '@geckobot/datasource-express'

const datasource = new Datasource(/* import.meta.env.VITE_API_URL */)

export default datasource
