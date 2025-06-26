# Integración con OpenWeatherMap

Esta integración permite mostrar información del clima en tiempo real para los destinos de los vuelos, tanto en las tablas de vuelos como en los PDFs de itinerarios.

## Configuración

### 1. Obtener API Key de OpenWeatherMap

1. Ve a [OpenWeatherMap](https://openweathermap.org/)
2. Crea una cuenta gratuita
3. Ve a tu perfil y genera una API key
4. La API key gratuita permite hasta 1000 llamadas por día

### 2. Configurar Variables de Entorno

Crea o actualiza tu archivo `.env` en la raíz del proyecto:

```env
PUBLIC_OPENWEATHER_API_KEY=tu_api_key_aqui
```

### 3. Instalar Dependencias

Las dependencias necesarias ya están incluidas en el proyecto. No se requieren instalaciones adicionales.

## Funcionalidades

### 1. Clima en Tablas de Vuelos

- **InFlight**: Muestra el clima del destino para vuelos en curso
- **DepartingSoon**: Muestra el clima del destino para vuelos próximos a partir
- **WeatherBadge**: Componente compacto que muestra icono, temperatura y tooltip con detalles

### 2. Clima en PDFs de Itinerarios

- **Departure Weather**: Clima en el momento de salida
- **Arrival Weather**: Clima en el momento de llegada
- Incluye temperatura actual, máxima, mínima y descripción

### 3. Componentes Disponibles

#### WeatherCard
Componente completo para mostrar información detallada del clima:

```tsx
<WeatherCard
  latitude={40.7128}
  longitude={-74.0060}
  arrivalTime="2024-01-15T14:30:00Z"
  location="New York"
  showForecast={true}
/>
```

#### WeatherBadge
Componente compacto para tablas:

```tsx
<WeatherBadge
  latitude={40.7128}
  longitude={-74.0060}
  arrivalTime="2024-01-15T14:30:00Z"
  location="New York"
/>
```

## Servicios Disponibles

### getWeatherData(latitude, longitude)
Obtiene el clima actual para una ubicación.

### getWeatherForTime(latitude, longitude, targetTime)
Obtiene el clima para una ubicación y momento específico (útil para horarios de llegada).

### getWeatherForecast(latitude, longitude)
Obtiene el pronóstico de 5 días para una ubicación.

## Iconos del Clima

Los iconos se muestran como emojis según el código de clima de OpenWeatherMap:

- ⛈️ Tormenta
- 🌧️ Lluvia
- ❄️ Nieve
- 🌫️ Niebla/Bruma
- ☀️ Cielo despejado
- 🌤️ Pocas nubes
- ⛅ Nubes dispersas
- ☁️ Nublado

## Manejo de Errores

- Si no hay API key configurada, se muestra un mensaje de advertencia
- Si falla la conexión, se muestra un icono genérico
- Los errores se registran en la consola para debugging

## Límites de la API

- **Plan Gratuito**: 1000 llamadas por día
- **Plan Pagado**: Hasta 1,000,000 llamadas por día

## Optimizaciones Implementadas

1. **Caching**: Los datos del clima se almacenan en el estado del componente
2. **Lazy Loading**: Solo se cargan los datos cuando son necesarios
3. **Error Handling**: Manejo robusto de errores con fallbacks
4. **Responsive Design**: Los componentes se adaptan a diferentes tamaños de pantalla

## Ejemplo de Uso Completo

```tsx
import WeatherCard from '../components/cards/WeatherCard';

function FlightDetails({ flight }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h3>Información del Vuelo</h3>
        {/* ... otros detalles del vuelo ... */}
      </div>
      
      <WeatherCard
        latitude={parseFloat(flight.second_latitude)}
        longitude={parseFloat(flight.second_longitude)}
        arrivalTime={flight.arrivaltime}
        location={flight.to}
        showForecast={true}
        className="h-fit"
      />
    </div>
  );
}
```

## Notas Importantes

1. **Coordenadas**: Asegúrate de que los vuelos tengan coordenadas válidas (latitude/longitude)
2. **Zona Horaria**: Los datos del clima se obtienen en la zona horaria local del destino
3. **Idioma**: Los datos se obtienen en español (lang=es)
4. **Unidades**: Las temperaturas se muestran en Celsius (units=metric)

## Troubleshooting

### El clima no se muestra
1. Verifica que la API key esté configurada correctamente
2. Revisa la consola del navegador para errores
3. Confirma que las coordenadas del vuelo sean válidas

### Datos incorrectos
1. Verifica que las coordenadas correspondan al aeropuerto correcto
2. Confirma que la hora de llegada esté en formato ISO
3. Revisa los logs de la API en OpenWeatherMap

### Rendimiento lento
1. Considera implementar caching más agresivo
2. Evalúa actualizar a un plan pagado de OpenWeatherMap
3. Optimiza las llamadas para evitar requests innecesarios 