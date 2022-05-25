# Authors
Jose Farfan

# Ejecucion
La solución propuesta se basa en un modelo básico que gestiona los datos de los inyectores. Para la solución particular del problema se ejecutaron tres endpoits.
## API
## Listar Inyectores
Permite listar los datos de los inyectores actuales, incluyendo el porcentaje de daño de cada uno
```text
GET /api/inyectors/
```

###A ctualizar porcentaje de daño del inyector
Permite modificar el porcentaje de daño de un inyector por su identificador
```text
PUT /api/inyectors/<inyectorId>
```
```json
<porcentaje_de_daño>
```
### Calcular flujo
Permite calcular el flujo por inyector para un porcentaje de velocidad pasado como parámetro. Previo al calculo es necesario actualizar el porcentaje de daño de cada inyector mediante en endpoint mencionado anteriormente
```text
GET http://localhost:3000/api/inyectors/calcFlow/<porcentaje_de_velocidad_esperado>
```

# Comando Ejecución
```text
npm run dev
```
# Comando Pruebas
```text
npm test
```
## Ejemplo caso 7 
Daño inyector A 0%, B 0%, C 30%; Porcentaje de velocidad 140% 
```text
curl -X PUT -H 'Content-Type: application/json' -i http://localhost:3000/api/inyectors/updateDamagePercentage/1 --data 0
curl -X PUT -H 'Content-Type: application/json' -i http://localhost:3000/api/inyectors/updateDamagePercentage/2 --data 0
curl -X PUT -H 'Content-Type: application/json' -i http://localhost:3000/api/inyectors/updateDamagePercentage/3 --data 30

curl -X GET -i http://localhost:3000/api/inyectors/calcFlow/140
```