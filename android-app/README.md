# En Verde para Android

GitHub arma la APK solo cada vez que cambia la app (ver `.github/workflows/apk.yml`).
La APK lleva dentro la misma página que la web (`index.html`) y habla con el mismo servidor.

Descarga siempre la última: https://github.com/NovaCenterApp/en-verde/releases/latest/download/EnVerde.apk

La firma usa dos secretos del repositorio (Settings → Secrets and variables → Actions):
`KEYSTORE_B64` y `KEYSTORE_PASS`. No los borres: sin la misma firma, la APK nueva no se instala encima de la vieja.
