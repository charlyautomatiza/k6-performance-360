<p align="center">
  <a href="https://www.twitch.tv/charlyautomatiza"><img alt="Twitch" src="https://img.shields.io/badge/CharlyAutomatiza-Twitch-9146FF.svg" style="max-height: 300px;"></a>
  <a href="https://discord.gg/wwM9GwxmRZ"><img alt="Discord" src="https://img.shields.io/discord/944608800361570315" style="max-height: 300px;"></a>
  <a href="http://twitter.com/char_automatiza"><img src="https://img.shields.io/badge/@char__automatiza-Twitter-1DA1F2.svg?style=flat" style="max-height: 300px;"></a>
  <a href="https://www.youtube.com/c/CharlyAutomatiza?sub_confirmation=1"><img src="https://img.shields.io/badge/CharlyAutomatiza-Youtube-FF0000.svg" style="max-height: 300px;" style="max-height: 300px;"></a>
  <a href="https://www.linkedin.com/in/gautocarlos/"><img src="https://img.shields.io/badge/Carlos%20 Gauto-LinkedIn-0077B5.svg" style="max-height: 300px;" style="max-height: 300px;"></a>
</p>

# Pruebas de Performance con K6

Este repositorio contiene scripts de pruebas de rendimiento desarrollados con K6 y una GitHub Actions para la ejecución continua de las pruebas en CI/CD.

## Contenido

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Ejecución de Pruebas](#ejecución-de-pruebas)
- [GitHub Actions](#github-actions)
- [Licencia](#licencia)

## Requisitos

Antes de ejecutar las pruebas, asegúrate de tener [K6](https://grafana.com/docs/k6/latest/) instalado en tu sistema.
Sigue las instrucciones en la [documentación oficial](https://grafana.com/docs/k6/latest/set-up/install-k6/).

## Instalación

1. Clone este repositorio en su máquina local:

```bash
git clone https://github.com/charlyautomatiza/k6-performance-360.git
```

2. Navega hasta el directorio del proyecto:

```bash
cd k6-performance-360
```

## Ejecución de Pruebas

Para realizar una ejecución local:

```bash
k6 run ./src/script.js
```

Para usar K6 WebDashboard:

```bash
K6_WEB_DASHBOARD=true k6 run ./src/script.js
```

Para guardar el reporte como un archivo HTML, podemos ejecutar el siguiente comando

```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run ./src/script.js
```

Para ejecutar un test de browser, podemos ejecutar el siguiente comando:

```bash
K6_BROWSER_HEADLESS=true k6 run ./src/browser.js
```

Observe que la variable de ambiente `K6_BROWSER_HEADLESS` debe ser definida como `true` para ser ejecutada en herramientas de integración contínua. Para ejecución y depuración en local, es útil usar la variable con el valor definido como `false` para ejecutar el browser en primer plano.

```bash
K6_BROWSER_HEADLESS=false k6 run ./src/browser.js
```

### Ejecución externa

Para probar los ejemplos de ejecución externa deberás tener instalado un cliente http como por ejemplo [Postman](https://www.postman.com/) o [Insomnia](https://insomnia.rest/).

**Importante**: todos los `cURLs` utilizados pueden ejecutarse desde la línea de comandos o también pueden importarse desde tu cliente de preferencia.

#### Validar el estado de una ejecución

Puedes utilizar una request de tipo GET mediante la API de K6

```powershell
curl --request GET \
  --url http://localhost:6565/v1/status \
  --header 'Content-Type: application/json'
```

#### Pausar una ejecución

Puedes utilizar una request de tipo PATCH a la API de K6, similar a la siguiente

```powershell
curl --request PATCH \
  --url http://localhost:6565/v1/status \
  --header 'Content-Type: application/json' \
  --data '{
    "data": {
      "attributes": {
        "paused": true
      },
      "id": "default",
      "type": "status"
    }
  }'
```

Se destaca lo siguiente del paso anterior:

- `paused: true` -> pausa la ejecución.

#### Reanudar y escalar una ejecución

Puedes utilizar una request de tipo PATCH a la API de K6, similar a la siguiente

```powershell
curl --request PATCH \
  --url http://localhost:6565/v1/status \
  --header 'Content-Type: application/json' \
  --data '{
    "data": {
        "attributes": {
            "paused": false,
            "vus": 40
        },
        "id": "default",
        "type": "status"
    }
}'
```

Se destaca lo siguiente del paso anterior:

- `paused: false` -> Reanuda la ejecución.
- `vus: 40` -> tiene que ser un valor mayor a la cantidad de VUs actual y menor o igual a la cantidad máxima de VUs definida en el script.

#### Recomendaciones

Este tipo de ejecución es una opción para simular carga distribuida desde múltiples generadores de , la API de K6 no proporcionará versatilidad para gestionar este tipo de ejecución desde una máquina host.

Para el caso de que se cuente con infra propia puede ser una opción a ser considerada en combinación, por ejemplo, con el uso e implementación de herramientas como [NGROK](https://ngrok.com/)

## GitHub Actions

Este repositorio incluye una GitHub Actions configurada para ejecutar pruebas continuamente en el branch principal. La acción está definida en el archivo [k6-runner.yml](.github/workflows/k6-runner.yml).

## Extensiones VSCode recomendadas

- [Conventional Commits for VSCode](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits)

- [GitHub Pull Requests](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)

- [Codeium: AI Coding](https://marketplace.visualstudio.com/items?itemName=Codeium.codeium)

- [SonarLint](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode)

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

- [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)

- [Postman](https://marketplace.visualstudio.com/items?itemName=Postman.postman-for-vscode)

## Licencia

Este proyecto está bajo la licencia Creative Commons CC0 1.0 Universal.
