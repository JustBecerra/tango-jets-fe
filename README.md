Como levantar el proyecto:
1 - npm install
2 - npm start
3 - Test
Crear una branch antes de comenzar una tarea:

    1 - git checkout -b nombredelarama

una vez que haya terminado con la tarea
1 - git add .
2 - git commit -m "mensaje resumiendo lo hecho en el commit"
3 - git push

Traer nuevos cambios de la rama actual:
1 - git pull --rebase

Como eliminar rama:
1 - moverse a otra rama
2 - git branch -d nombrederama (para borrar rama local)
3 - git branch -D nombrederama (para forzar el borrado)
4 - git push origin --delete nombrederama (borrar rama remota)
