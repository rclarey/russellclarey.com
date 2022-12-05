const start = (hue: string, light: boolean) =>
  `hsl(${hue}, 35%, ${light ? "65" : "25"}%)`;
const end = (hue: string, light: boolean) =>
  `hsl(${hue}, 35%, ${light ? "47" : "17"}%)`;

export function setFavicon(hue: string) {
  const favicon = document.querySelector<HTMLLinkElement>("link[rel=icon]");
  const ctx = document.querySelector<HTMLCanvasElement>("#favicon-canvas")
    ?.getContext("2d");
  if (!ctx || !favicon) {
    return;
  }

  const light = document.body.classList.contains("light-mode");
  const grad = ctx.createLinearGradient(0, 0, 32, 32);
  grad.addColorStop(0, start(hue, light));
  grad.addColorStop(1, end(hue, light));
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.ellipse(16, 16, 16, 16, 0, 0, 2 * Math.PI);
  ctx.fill();
  favicon.href = ctx.canvas.toDataURL("image/png");
}
