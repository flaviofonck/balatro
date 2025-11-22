# 🃏 Calculadora Balatro

Una aplicación web moderna para calcular y analizar el poder de las manos de poker en Balatro, desarrollada con Bootstrap 5.3.3 y JavaScript vanilla.

## ✨ Características

### 🎯 Calculadora de Manos de Poker
- **Análisis en tiempo real** de 9 tipos de manos de poker
- **Configuración personalizable** de valores base y multiplicadores
- **Ranking automático** ordenado por poder total
- **Recomendaciones estratégicas** basadas en los resultados

### 📊 Análisis de Datos
- Cálculo instantáneo: `Valor Base × Multiplicador = Poder Total`
- Comparación visual con rankings y badges
- Sistema de colores para identificar rápidamente las mejores manos
- Análisis de brechas de poder entre manos

### 🎨 Interfaz Moderna
- **Diseño responsivo** para móviles, tablets y escritorio
- **Bootstrap 5.3.3** con componentes modernos
- **Animaciones suaves** y transiciones CSS
- **Iconos Bootstrap** para mejor UX

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

## 🎮 Manos de Poker por Defecto

| Mano                 | Valor Base | Mult | Total    |
| -------------------- | ---------- | ---- | -------- |
| **Color**            | 95         | x12  | **1140** |
| **Escalera**         | 90         | x10  | **900**  |
| **Tercia**           | 90         | x9   | **810**  |
| **Escalera Corrida** | 100        | x8   | **800**  |
| **Full House**       | 80         | x8   | **640**  |
| **Póker**            | 60         | x7   | **420**  |
| **Carta Más Alta**   | 45         | x5   | **225**  |
| **Par**              | 25         | x3   | **75**   |
| **Doble Par**        | 20         | x2   | **40**   |

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con gradientes y animaciones
- **JavaScript ES6+** - Lógica de la aplicación
- **Bootstrap 5.3.3** - Framework CSS responsivo
- **Bootstrap Icons** - Iconografía consistente
- **Google Fonts (Roboto)** - Tipografía moderna

## 📱 Características Responsivas

- **Móviles** (< 768px): Layout de una columna optimizado
- **Tablets** (768px - 992px): Layout de dos columnas
- **Escritorio** (> 992px): Layout completo de tres columnas

## 🎯 Funcionalidades Futuras

- [ ] **Analizador de Jokers** - Calcular sinergias entre jokers y manos
- [ ] **Guía de Estrategia** - Tips y consejos avanzados
- [ ] **Simulador de Rondas** - Simular diferentes escenarios de juego
- [ ] **Historial de Configuraciones** - Guardar y cargar setups personalizados
- [ ] **Modo Oscuro** - Tema alternativo para mejor experiencia nocturna
- [ ] **Exportar Resultados** - Compartir análisis como imagen o PDF

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar la calculadora:

1. Fork el repositorio
2. Crea una branch para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Add nueva funcionalidad'`)
4. Push a la branch (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📋 Estructura del Proyecto

```
balatro-calculator/
├── index.html          # Página principal
├── styles.css          # Estilos personalizados
├── script.js           # Lógica de la aplicación
└── README.md           # Este archivo
```

## 🎲 Uso de la Aplicación

### Cálculo Básico
1. **Ajusta valores**: Modifica los valores base y multiplicadores de cada mano
2. **Ve resultados en tiempo real**: Los totales se actualizan automáticamente
3. **Analiza el ranking**: Las manos se ordenan por poder total
4. **Lee las recomendaciones**: Obtén consejos estratégicos basados en tus configuraciones

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