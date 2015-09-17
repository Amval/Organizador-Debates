## Colecciones

### Estructura

Las colecciones están definidas mediante variables globales. Una alternativa sería utilizar un espacio de nombres que contuviera las colecciones, esquemas y demás artefactos.

```javascript
collections = {
  Ideas: // ...

};
schemas = {
  IdeaSchema: // ...

}
```
Sin embargo el uso de variables globales para las colecciones (omitiendo "var" en la declaración) es una práctica común y aceptada dentro de la comunidad de Meteor.

### Esquemas

Para los esquemas se utiliza el paquete "SimpleSchema" de Aldeed, que permite realizar validaciones frente al servidor, y sobre todo declarar el aspecto que tendrá el documento.

### Autovalores del esquema

Son funciones utilizadas por la función `_.processForm` para poblar automáticamente el documento con valores acordes al esquema.

#### Validación automática

Existen paquetes para la validación y lectura automática de formularios a partir del esquema, pero la documentación resultaba liosa y poco intuitiva.

Las funciones `_.processForm` y `_.newDocument` se encargan de realizar algo similar.
