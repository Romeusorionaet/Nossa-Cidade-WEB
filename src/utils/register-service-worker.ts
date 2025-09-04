export function registerSW() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/scripts/sw.js")
      .then(() => console.log("SW registrado e ativo ✅"))
      .catch((err) => console.error("Falha ao registrar SW ❌", err));
  } else {
    console.log("Service worker not supported ❌");
  }
}
