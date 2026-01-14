/* eslint-disable prettier/prettier */

const TasksController = ()=> import('#controllers/tasks_controller')
import { middleware } from "#start/kernel"
import router from "@adonisjs/core/services/router"


export const TaskRoutes = () => {
    router.group(()=> {
        router.post('/', [TasksController, 'store']),
        router.put('/:id', [TasksController, 'update']).where('id', router.matchers.uuid()),
        router.delete('/:id', [TasksController, 'delete']).where('id', router.matchers.uuid()),
        router.get('/', [TasksController, 'index']),
        router.get('/:id', [TasksController, 'show']).where('id', router.matchers.uuid()),
        router.post('/validate/:id', [TasksController, 'validate']).where('id', router.matchers.uuid()),
        router.post(('/reject/:id'), [TasksController, 'reject']).where('id', router.matchers.uuid())
    }).prefix('/tasks').use(middleware.auth({ guards: ['api'] }))
}