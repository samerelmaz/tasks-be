Esta es una app de manejo de tareas creada con Express y MongoDB

## Correr local

Para correr en entorno local, primero es necesario instalar las dependencias:

```bash
npm install
```

Luego, es necesario setear las variables de entorno. Para ello, crear un archivo .env con las variables. Las variables necesarias se pueden conseguir en el archivo .env.example.

Una vez esto, ya se puede correr el proyecto localmente. Para ello, correr:

```bash
npm run dev
```

Finalmente, se pueden testear los endpoints en [http://localhost:{PORT}/api](http://localhost:{PORT}/api).

## Swagger

La documentación de Swagger se puede encontrar en /api/docs (local): [http://localhost:{PORT}/api/docs](http://localhost:{PORT}/api/docs) o [https://tasks-be-4xs4.onrender.com/api/docs](https://tasks-be-4xs4.onrender.com/api/docs)

## Tests

Para correr los tests, basta con ejecutar:

```bash
npm run test
```

## App desplegada

Si se quiere probar la app desplegada, se puede visitar [https://tasks-be-4xs4.onrender.com](https://tasks-be-4xs4.onrender.com)

Nota: Ya que está desplegada en la versión gratis de Render, la api puede experimentar delays en la primera carga luego de tiempo de inactividad. Si la app tarda en responder al inicio, esperar hasta que responda, puede tardar hasta 1 minuto. Luego de eso las respuestas deben ser más rapidas.
