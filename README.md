# División de Gastos 💸

Aplicación web para dividir gastos de forma equitativa entre varios participantes. Calcula automáticamente quién le debe cuánto a quién, minimizando el número de transacciones necesarias.

## ✨ Funcionalidades

- **Agregar participantes** con el monto que cada uno pagó
- **Eliminar participantes** individualmente
- **Cálculo automático** del total, promedio por persona y deudas
- **Transacciones mínimas**: el algoritmo greedy optimiza la cantidad de pagos necesarios
- **Persistencia local**: los datos se guardan en `localStorage` y sobreviven recargas de página
- Soporte para participantes que **no pagaron nada** (monto = 0)
- Si un participante ya existe, el monto se **acumula** en lugar de duplicar la entrada

## 🛠️ Tecnologías

| Tecnología | Versión | Rol |
|---|---|---|
| [React](https://react.dev/) | 18.x | Framework de UI |
| [Vite](https://vitejs.dev/) | 8.x | Bundler y servidor de desarrollo |
| [Tailwind CSS](https://tailwindcss.com/) | 3.x | Estilos |
| [PostCSS](https://postcss.org/) | 8.x | Procesamiento de CSS |

## 📦 Instalación

### Requisitos previos

- Node.js >= 18
- npm >= 9

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/martinb28/division-gastos_react.git
cd division-gastos_react

# 2. Instalar dependencias
npm install
```

## 🚀 Uso

### Servidor de desarrollo

```bash
npm run dev
```

La app estará disponible en [http://localhost:5173](http://localhost:5173).

### Build de producción

```bash
npm run build
```

Los archivos optimizados se generan en la carpeta `dist/`.

### Previsualizar el build de producción

```bash
npm run preview
```

## 🧪 Tests

Los tests cubren la lógica central del algoritmo de cálculo de deudas (`calculateDebts`).

```bash
# Ejecutar tests (requiere vitest o jest configurado)
npm test
```

### Casos cubiertos

| Caso | Resultado esperado |
|---|---|
| Sin participantes | Array vacío |
| Un solo participante | Sin deudas |
| Todos pagaron lo mismo | Sin deudas |
| Dos personas con diferencia | 1 transacción |
| 3 personas, balances distintos | Mínimas transacciones |
| Un pagador, dos deudores | 2 transacciones hacia el acreedor |
| Inmutabilidad | No modifica el array original |

## 📁 Estructura del proyecto

```
division-gastos_react/
├── index.html              # Entry point de Vite
├── vite.config.js          # Configuración de Vite
├── tailwind.config.js      # Configuración de Tailwind CSS
├── postcss.config.js       # Configuración de PostCSS
├── package.json
├── public/                 # Archivos estáticos
└── src/
    ├── main.jsx            # Bootstrap de React
    ├── App.jsx             # Componente raíz + lógica de estado
    ├── App.test.js         # Tests del algoritmo de deudas
    ├── index.css           # Estilos globales
    ├── components/
    │   ├── Form.jsx            # Formulario para agregar participantes
    │   ├── ParticipantList.jsx # Lista de participantes con opción de eliminar
    │   └── Results.jsx         # Resumen: total, promedio y transacciones
    └── utils/
        └── calculateDebts.js   # Algoritmo greedy de cálculo de deudas
```

## 🧠 Algoritmo de cálculo

El cálculo de deudas usa un **algoritmo greedy de dos punteros** con complejidad `O(n log n)`:

1. Se calcula el **promedio** del gasto total entre todos los participantes
2. Se obtiene el **balance** de cada uno: `balance = monto_pagado - promedio`
   - Balance positivo → acreedor (pagó de más)
   - Balance negativo → deudor (pagó de menos)
3. Se ordenan acreedores (desc) y deudores (asc) por balance
4. Se emparejan con dos punteros, generando la **menor cantidad posible de transacciones**

## 📝 Licencia

Uso personal / académico.
