'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//Route.on('/').render('welcome')
Route.group(()=> {
    Route.get('listar/:id','ProductoController.buscarPorId');
    Route.get('listar','ProductoController.listar');    
    Route.post('guardar','ProductoController.guardar');    
    Route.put('actualizar/:id','ProductoController.actualizar');
    Route.delete('eliminar/:id','ProductoController.eliminar');
}).prefix('productos');

