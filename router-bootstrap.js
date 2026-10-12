(() => {
  const loadBundle = async () => {
    const script = document.createElement("script");

    if (window.location.protocol === "file:") {
      script.src = "./script.js";
      document.body.append(script);
      return;
    }

    try {
      const response = await fetch("./script.js");
      if (!response.ok) throw new Error(`Bundle request failed: ${response.status}`);

      let source = await response.text();
      const browserHistoryGuard = 'if(w.location.protocol==="file:"){';
      const hashHistoryGuard = 'if(w.location.protocol==="file:"||w.location.pathname==="/"||w.location.pathname.startsWith("/Second-Serve-BBS")){';

      if (!source.includes(browserHistoryGuard)) {
        throw new Error("The bundled router could not be patched for static hosting.");
      }

      source = source.replace(browserHistoryGuard, hashHistoryGuard);
      script.textContent = source;
      document.body.append(script);
    } catch (error) {
      console.error("SecondServe could not start:", error);
    }
  };

  loadBundle();
})();
