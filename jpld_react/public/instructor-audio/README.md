# Audios del instructor — flujo de trabajo

Esta carpeta vive dentro de `public/` a propósito: Create React App copia todo lo que hay
en `public/` tal cual al `build/` de producción, así que estos audios quedan servidos y
listos para deploy sin pasos extra.

## 1. Estructura de audio (ya cargada)

```
public/instructor-audio/
  {N}-{Escenario}/
    Nivel 1/   (palabras)        → a.mp3  b.mp3  c.mp3   (+ a.m4a b.m4a c.m4a originales)
    Nivel 2/   (frases cortas)   → a.mp3  b.mp3  c.mp3
    Nivel 3/   (frases largas)   → a.mp3  b.mp3  c.mp3
```

63 audios (7 escenarios × 3 niveles de dificultad × 3 escenas). Cada `.mp3` es una
conversión de su `.m4a` original (hecha con `ffmpeg`, calidad `-qscale:a 2`); los `.m4a`
se conservan como respaldo pero el código usará los `.mp3` para mantener consistencia con
`public/audios` y `public/sounds`.

Mapeo carpeta → `level` usado en el código (`Level.jsx`, `LevelSelector.jsx`):

| carpeta | `level` | escenario |
|---|---|---|
| `7-Selva` | 0 | Selva |
| `1-Escuela` | 1 | Escuela/Estadio |
| `2-Playa` | 2 | Playa |
| `3-Casa` | 3 | Casa |
| `4-Baño` | 4 | Higiene |
| `5-Transportes` | 5 | Transporte |
| `6-Parque` | 6 | Parque |

Y `Nivel 1/2/3` → `sub 0/1/2`, `a/b/c` → `escena 0/1/2` (mismo orden que `animalSets` /
`audioSets` en el código: primer/segundo/tercer elemento del nivel).

## 2. Timestamps de sílaba (`syllable_timestamps_template.csv`)

367 filas, una por cada sílaba de cada una de las 63 frases, extraídas directo del texto
que ya está en `Level.jsx` (mismos acentos, misma partición por guiones que usa la
animación hoy). No hay que escribir texto, solo llenar la última columna.

Columnas:

| columna | qué es |
|---|---|
| `nivel`, `sub`, `escena` | identifican el nivel/dificultad/escena |
| `archivo_audio` | ruta relativa a esta carpeta del mp3 al que corresponde esa fila (ej. `7-Selva/Nivel 1/a.mp3`) |
| `indice_silaba` | orden de la sílaba dentro de la frase (0-based) |
| `texto_silaba` | la sílaba tal cual aparece en pantalla |
| `inicio_segundos` | **⬅️ esto es lo que hay que llenar** |

### Cómo llenar `inicio_segundos`

1. Abre el `.mp3` (o `.m4a`) indicado en `archivo_audio` en un editor que muestre el tiempo
   en segundos (Audacity es gratis y funciona bien: al hacer clic en la forma de onda
   muestra la posición exacta, con decimales).
2. Para cada sílaba del texto de esa frase, ubica en qué segundo empieza a pronunciarse
   (ej. `1.24`).
3. Escribe ese número en la fila correspondiente (mismo `archivo_audio` + `indice_silaba`).
4. No hace falta poner el fin de cada sílaba — el fin de una es el inicio de la siguiente,
   y la última dura hasta que termina el audio.

Se puede editar el CSV en Excel/Google Sheets/Numbers sin problema, es texto plano separado
por comas.

## 3. Cuando esté listo

Con el CSV lleno, hago el cambio en `LevelOverlay.jsx` para que `handleRepeatSound`
reproduzca el archivo completo de la frase y resalte cada sílaba en su segundo
correspondiente, en vez de reproducir archivos separados por sílaba como hace hoy.
