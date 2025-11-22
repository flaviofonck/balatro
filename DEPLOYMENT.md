# 🚀 Guía Rápida de Despliegue en GitHub Pages

## ✅ Checklist Previo
- [ ] Todos los archivos están en la carpeta del proyecto
- [ ] Git está configurado en tu sistema
- [ ] Tienes una cuenta de GitHub

## 📁 Archivos Creados
```
balatro/
├── index.html         # Página principal
├── styles.css         # Estilos personalizados  
├── script.js          # Lógica principal
├── utils.js           # Utilidades adicionales
├── README.md          # Documentación
├── _config.yml        # Configuración Jekyll
├── .gitignore         # Archivos a ignorar
└── DEPLOYMENT.md      # Esta guía
```

## 🌐 Pasos para Subir a GitHub Pages

### 1. Crear Repositorio en GitHub
1. Ve a [github.com](https://github.com) y haz login
2. Click en **"New Repository"**
3. Nombre: `balatro-calculator` (o el que prefieras)
4. Descripción: `Calculadora de manos de poker para Balatro`
5. Público ✅
6. NO marcar "Initialize with README"
7. Click **"Create Repository"**

### 2. Subir Archivos (Método Web - Fácil)
1. En tu nuevo repositorio, click **"uploading an existing file"**
2. Arrastra todos los archivos de la carpeta `balatro/`
3. Commit message: `Initial version of Balatro Calculator`
4. Click **"Commit new files"**

### 3. Activar GitHub Pages
1. En tu repositorio, ve a **Settings** (pestaña)
2. Scroll hacia abajo hasta **"Pages"** (menú izquierdo)
3. En **Source**, selecciona **"Deploy from a branch"**
4. Branch: **main** 
5. Folder: **/ (root)**
6. Click **"Save"**

### 4. ¡Listo! 🎉
Tu calculadora estará disponible en:
```
https://tu-usuario.github.io/balatro-calculator
```

⏱️ **Tiempo de propagación**: 5-10 minutos

## 🛠️ Método Alternativo (Git Command Line)

Si prefieres usar comandos de Git:

```bash
# 1. Navegar a tu carpeta
cd "c:\Users\flavi\OneDrive - GEAM\Python\balatro"

# 2. Inicializar Git
git init

# 3. Agregar archivos
git add .

# 4. Primer commit
git commit -m "Initial version of Balatro Calculator"

# 5. Conectar con GitHub (reemplaza TU-USUARIO y TU-REPO)
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git

# 6. Subir archivos
git branch -M main
git push -u origin main
```

## 🔧 Personalización Opcional

### Cambiar el dominio personalizado
1. En **Settings > Pages**
2. En **Custom domain**, ingresa tu dominio
3. Marca **"Enforce HTTPS"**

### Configurar Google Analytics (opcional)
Agrega esto antes de `</head>` en `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🐛 Solución de Problemas

### La página no carga
- ✅ Verifica que `index.html` esté en la raíz del repositorio
- ✅ Espera 5-10 minutos para la propagación
- ✅ Verifica que GitHub Pages esté activado

### Los estilos no cargan
- ✅ Asegúrate de que `styles.css` esté en la misma carpeta que `index.html`
- ✅ Verifica que no haya errores en la consola del navegador (F12)

### JavaScript no funciona
- ✅ Verifica que `script.js` y `utils.js` estén en la misma carpeta
- ✅ Abre las herramientas de desarrollador (F12) para ver errores

## 📱 Probar Localmente

Para probar antes de subir:
1. Abre `index.html` directamente en tu navegador
2. O usa un servidor local:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (si tienes npm)
   npx serve .
   ```
3. Ve a `http://localhost:8000`

## 🔄 Actualizaciones Futuras

Para actualizar tu calculadora:
1. Modifica los archivos localmente
2. Ve a tu repositorio en GitHub
3. Click en el archivo que quieres editar
4. Click en el ícono del lápiz ✏️
5. Haz tus cambios
6. Scroll abajo, agrega descripción del cambio
7. Click **"Commit changes"**

¡Los cambios se reflejarán automáticamente en tu sitio!

## 🎯 Funcionalidades Incluidas

✅ **Calculadora de Manos de Poker**
- 9 tipos de manos predefinidos
- Configuración en tiempo real
- Ranking automático
- Recomendaciones estratégicas

✅ **Interfaz Moderna**
- Diseño responsivo (móvil, tablet, escritorio)
- Bootstrap 5.3.3
- Animaciones CSS
- Iconos Bootstrap

✅ **Características Avanzadas**
- Exportar/Importar configuraciones
- URLs compartibles
- Almacenamiento local
- Atajos de teclado

✅ **Optimizado para GitHub Pages**
- Sin dependencias del servidor
- Carga rápida
- SEO friendly

---

**¡Que disfrutes tu nueva calculadora de Balatro! 🃏✨**

¿Necesitas ayuda? Abre un Issue en tu repositorio de GitHub.