
# Rimac Native - Cotizador de Seguros de Salud

Aplicación **móvil y web** desarrollada con **React Native + Expo** para cotizar seguros de salud de manera rápida, intuitiva y 100% online.

---
## URL
[https://rimac-native.vercel.app](https://rimac-native.vercel.app/)
## Imagenes
<div style="display: flex; gap: 10px;">
  <img src="https://i.imgur.com/ADfjTHB.png" height="300" width="500"/>
  <img src="https://i.imgur.com/N81z3tf.png" height="300"/>
</div>


## ✨ Características

| ✅ Funcionalidad | Descripción |
|-----------------|-------------|
| 📱 Multiplataforma | Compatible con **iOS, Android y Web** |
| 🎨 Diseño Responsive | Layout flexible con Styled Components |
| 💾 Persistencia | Caché local con AsyncStorage |
| 🧠 Estado Global | Gestión con **Zustand** |
| ✅ Form Validations | Validación de DNI y celular en tiempo real |
| 🔄 Flujo Optimizado | Carrusel interactivo de planes |
| 🧪 Calidad | Tests unitarios e integración con Jest |

---

## 🛠 Tecnologías

| Tipo | Stack |
|------|-------|
| Framework | React Native (0.81.5) + Expo (54.0.20) |
| Lenguaje | TypeScript (5.9.2) |
| Estilos | Styled Components (6.1.19) |
| Estado | Zustand (5.0.8) |
| Navegación | React Navigation (7.x) |
| Almacenamiento | AsyncStorage (2.2.0) |
| Testing | Jest + React Native Testing Library |

---

## 📦 Requisitos Previos

- Node.js **v20+**
- npm o yarn
- Expo CLI
- Xcode (iOS)
- Android Studio (Android)

---

## 🚀 Instalación

```bash
# Clonar repositorio
git clone https://github.com/bdanielmr/rimac-native.git
cd rimac-native

# Instalar dependencias
npm install

## 💻 Ejecución

`# Iniciar proyecto 
npx expo start --web`

## 🧪 Testing

`npm run test  
npm run test:coverage # Cobertura` 

----------

## 🏗 Arquitectura

-   Basado en **Atomic Design**
    
-   **Zustand** como estado global
    
-   **AsyncStorage** como caché
    
-   Hooks reutilizables
    
-   Arquitectura desacoplada y modular
