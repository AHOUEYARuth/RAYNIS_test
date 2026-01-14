/* eslint-disable prettier/prettier */
/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import "../app/routes/main_routes.js"

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
