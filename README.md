# 🃏 Calculadora Balatro

Una aplicación web moderna que replica la interfaz auténtica de Balatro para calcular y analizar el poder de las manos de poker. Desarrollada con Bootstrap 5.3.3 y JavaScript vanilla, incluye efectos CRT y tipografía del juego original.

## ✨ Características

### 🎯 Calculadora de Manos de Poker
- **Análisis en tiempo real** de 9 tipos de manos de poker
- **Valores oficiales de Balatro** basados en Planet Cards del juego
- **Sistema de niveles** con escalado auténtico por tipo de mano
- **Resultados inmediatos** mostrados en campos naranjas como en el juego
- **Ranking automático** ordenado por poder total

### 🎨 Interfaz Auténtica de Balatro
- **Tipografía oficial**: Fuentes Orbitron y JetBrains Mono
- **Efectos CRT**: Líneas de escaneo, parpadeo y resplandor
- **Colores del juego**: Paleta oscura con acentos naranjas y púrpuras
- **Layout horizontal**: Filas que replican exactamente la interfaz del juego
- **Animaciones suaves**: Efectos hover y transiciones como en Balatro

### 📊 Sistema de Cálculo Avanzado
- Cálculo instantáneo: `Chips × Multiplicador = Poder Total`
- **Sistema de niveles**: 15 niveles por mano con escalado oficial
- **Valores Planet Cards**: Bonificaciones exactas del juego original
- **Formateo de números**: K para miles, M para millones
- **Actualización en tiempo real** del ranking y recomendaciones

### � Experiencia de Usuario
- **Botones de ajuste**: +/- para modificar valores fácilmente  
- **Campos de entrada**: Inputs directos para valores personalizados
- **Responsive design**: Adaptado para móviles, tablets y escritorio
- **Atajos de teclado**: Ctrl+R para recalcular, Ctrl+Enter para actualizar

## 🚀 Configuración para GitHub Pages

### Paso 1: Subir archivos al repositorio
```bash
git add .
git commit -m "Add Balatro Calculator v1.0"
git push origin main
```

### Paso 2: Activar GitHub Pages
1. Ve a **Settings** en tu repositorio
2. Scroll hasta **Pages**
3. En **Source**, selecciona **Deploy from a branch**
4. Selecciona branch **main** y folder **/ (root)**
5. Haz clic en **Save**

### Paso 3: Acceder a tu app
Tu calculadora estará disponible en:
```
https://tu-usuario.github.io/nombre-del-repo
```

## 🎮 Manos de Poker Oficiales de Balatro

Valores base implementados según los Planet Cards oficiales del juego:

| Mano                 | Chips Base | Multiplicador | Total    | Planet Card |
| -------------------- | ---------- | ------------- | -------- | ----------- |
| **Escalera Corrida** | 100        | x8            | **800**  | Eris        |
| **Póker**            | 60         | x7            | **420**  | Ceres       |
| **Full House**       | 40         | x4            | **160**  | Venus       |
| **Color**            | 35         | x4            | **140**  | Neptune     |
| **Escalera**         | 30         | x4            | **120**  | Uranus      |
| **Tercia**           | 30         | x3            | **90**   | Earth       |
| **Doble Par**        | 20         | x2            | **40**   | Saturn      |
| **Par**              | 10         | x2            | **20**   | Mercury     |
| **Carta Más Alta**   | 5          | x1            | **5**    | Pluto       |

### Sistema de Niveles

Cada mano puede subir hasta **Nivel 15** con escalado específico:

- **Par**: +15 Chips, +1 Mult por nivel (Mercury)
- **Doble Par**: +20 Chips, +1 Mult por nivel (Saturn) 
- **Tercia**: +20 Chips, +2 Mult por nivel (Earth)
- **Escalera**: +30 Chips, +3 Mult por nivel (Uranus)
- **Color**: +15 Chips, +2 Mult por nivel (Neptune)
- **Full House**: +25 Chips, +2 Mult por nivel (Venus)
- **Póker**: +30 Chips, +3 Mult por nivel (Ceres)
- **Escalera Corrida**: +40 Chips, +3 Mult por nivel (Eris)
- **Carta Más Alta**: +10 Chips, +1 Mult por nivel (Pluto)

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica moderna
- **CSS3** - Efectos CRT, animaciones y gradientes avanzados
- **JavaScript ES6+** - Lógica de calculadora con clases y módulos
- **Bootstrap 5.3.3** - Framework CSS responsivo
- **Bootstrap Icons** - Iconografía consistente
- **Google Fonts**: 
  - **Orbitron** - Tipografía futurista principal de Balatro
  - **JetBrains Mono** - Fuente monoespaciada para números
- **Efectos Visuales**:
  - Líneas de escaneo CRT animadas
  - Efectos de resplandor y parpadeo
  - Backdrop blur y sombras profundas
  - Transiciones suaves y hover effects

## 📱 Características Responsivas

- **Móviles** (< 768px): Layout de una columna optimizado
- **Tablets** (768px - 992px): Layout de dos columnas
- **Escritorio** (> 992px): Layout completo de tres columnas

## 🎯 Funcionalidades Futuras

- [ ] **Calculadora de Jokers** - Integración de efectos de jokers con las manos
- [ ] **Simulador de Blinds** - Cálculo de score necesario por nivel
- [ ] **Guía de Planet Cards** - Información detallada de cada carta planeta
- [ ] **Analizador de Builds** - Evaluación de sinergias entre jokers y manos
- [ ] **Modo Endless** - Cálculo de scaling para niveles infinitos
- [ ] **Historial de Partidas** - Guardar y comparar configuraciones
- [ ] **Exportar/Importar** - Compartir builds como código o imagen
- [ ] **Calculadora de Ante** - Progresión de dificultad por nivel
- [ ] **Base de Datos de Cartas** - Catálogo completo con efectos

## 📋 Estructura del Proyecto

```
balatro-calculator/
├── index.html           # Página principal con layout auténtico
├── styles.css           # Estilos CRT y paleta de Balatro  
├── script.js            # Calculadora con valores oficiales
├── utils.js             # Utilidades de exportación/importación
├── README.md            # Documentación completa
├── DEPLOYMENT.md        # Guía de despliegue en GitHub Pages
└── _config.yml          # Configuración de Jekyll
```

## 🎲 Uso de la Aplicación

### Interfaz Principal

La calculadora replica fielmente la interfaz de Balatro:

- **Filas horizontales**: Cada mano se muestra en una fila como en el juego
- **Controles de nivel**: Botones -/+ y campo de nivel (Nvl. 1-15)
- **Pills azules y rojas**: Chips (azul) y multiplicador (rojo) editables
- **Resultado naranja**: Valor calculado inmediato (chips × mult)
- **Ranking automático**: Panel lateral con orden por poder total

### Cálculo Básico

1. **Ajusta valores**: Modifica chips y multiplicadores de cada mano
2. **Cambia niveles**: Usa Planet Cards para escalar manos específicas  
3. **Ve resultados**: Los valores naranjas muestran el poder calculado
4. **Analiza ranking**: Las mejores manos aparecen primero en el panel
5. **Lee recomendaciones**: Obtén consejos estratégicos automáticos

### Características Especiales

- **Valores oficiales**: Datos exactos del código fuente de Balatro
- **Escalado auténtico**: Planet Cards implementados correctamente
- **Estilo CRT**: Efectos visuales que recrean la pantalla del juego
- **Responsive**: Funciona perfectamente en móviles y tablets
- **Tiempo real**: Todo se actualiza instantáneamente al cambiar valores

### Atajos de Teclado
- `Ctrl/Cmd + R`: Recalcular todos los resultados
- `Ctrl/Cmd + Enter`: Recalcular y mostrar notificación

### Reset de Valores
- **Reset individual**: Botón "Reset" en cada mano para restaurar valores por defecto
- **Recálculo**: Botón "Recalcular" para actualizar todos los resultados

## 🔗 Enlaces

- [Balatro (Juego Oficial)](https://www.playbalatro.com/)
- [Bootstrap Documentation](https://getbootstrap.com/docs/5.3/)
- [GitHub Pages Guide](https://pages.github.com/)

## 📄 Licencia

Este proyecto es una herramienta no oficial para la comunidad de Balatro. Desarrollado con ❤️ para ayudar a los jugadores a optimizar sus estrategias.

---

**¡Que tengas buenas manos! 🃏✨**