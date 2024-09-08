[![Deployment Pipeline](https://github.com/CesarGarces/monoRepo-turboRepo/actions/workflows/ci.yml/badge.svg?branch=main&event=deployment_status)](https://github.com/CesarGarces/monoRepo-turboRepo/actions/workflows/ci.yml)

# Monorepo con Turborepo

Este proyecto es un **monorepo** creado utilizando **Turborepo**. Contiene dos proyectos principales: **Proyecto1**, una aplicación en React, y **Proyecto2**, una biblioteca de componentes reutilizables para gestionar popups. Ambos proyectos se gestionan de forma modular siguiendo principios de **Arquitectura Limpia** y **Patrones de Diseño**.

## Estructura del Monorepo

- **Proyecto1**: Aplicación principal desarrollada en **React**.
- **Proyecto2**: Biblioteca de componentes reutilizables que gestiona popups, utilizando **Zustand** como solución de estado global, desarrollado en **React**.

## Tecnologías Utilizadas

- **Turborepo**: Para gestionar y optimizar el monorepo.
- **React**: Desarrollo de la aplicación principal (**Proyecto1**).
- **Zustand**: Gestión de estado global en la biblioteca de popups (**Proyecto2**).
- **TypeScript**: Tipado estático para una mejor experiencia de desarrollo.
- **Vite**: Para la construcción y desarrollo rápido de **Proyecto1**.
- **ESLint**: Asegura la consistencia del código y mejores prácticas.
- **Clean Architecture y Patrones de Diseño**: Implementados para mantener el código modular y escalable.
- **Custom Hooks**: Hooks personalizados para manejar la lógica interna de los popups.
- **Jest**: Para la implementación de **tests unitarios**.
- **CI/CD**: Integración continua (CI) y entrega continua (CD) configuradas para garantizar despliegues automáticos y pruebas de calidad con Github ACtion y despliegue en vercel.

## CI/CD
El proyecto está configurado con CI/CD usando herramientas como GitHub Actions. Esto asegura que cada vez que se haga un push o pull request a la rama principal, se ejecuten automáticamente:

- Linting: Asegura que el código sigue las mejores prácticas.
- Tests Unitarios: Verifica que todo el código funcione correctamente.
- Build: Se compila el proyecto para producción.
Los errores se reportarán automáticamente, bloqueando el despliegue hasta que todos los chequeos sean aprobados.

## Estructura de Carpetas
```
/apps
  /proyecto1        # Aplicación principal en React
/packages
  /proyecto2        # Biblioteca de popups en React
    /components     # Componentes para lanzar tipos de popups
    /hooks          # accede al store exponiendo los métodos de crear y eliminar popups
```
## Características Clave
- Modularidad: Cada proyecto es independiente, pero puede interconectarse fácilmente.
- Patrones de Diseño: Implementación de patrones que garantizan escalabilidad y mantenibilidad.
- Custom Hooks: Los hooks personalizados facilitan el manejo de la lógica de los popups.
- Pruebas Unitarias: Cada funcionalidad está cubierta con tests unitarios para garantizar la calidad del código.
- CI/CD: Implementación de CI/CD para mantener un flujo de trabajo automatizado y confiable.

## Instalación
1. Clona el repositorio.
2. Instala las dependencias del proyecto:

```bash
npm install
```

## Comandos Disponibles
```bash
npm run dev
npm run lint
npm run test
```