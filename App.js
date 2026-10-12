export function startApplication() {
  const root = document.getElementById("root");
  if (!root) throw new Error('Missing application mount element: "root".');

  const bootstrap = document.createElement("script");
  bootstrap.src = `${import.meta.env.BASE_URL}router-bootstrap.js`;
  bootstrap.onerror = () => {
    console.error("SecondServe could not load its application bundle.");
  };
  document.body.append(bootstrap);
}
