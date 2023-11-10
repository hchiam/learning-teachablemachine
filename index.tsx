Bun.serve({
  fetch(req) {
    const url = new URL(req.url);

    if (url.pathname.endsWith("/") || url.pathname.endsWith("/index.html"))
      return new Response(Bun.file(import.meta.dir + "/index.html"));

    /*
      Note: you must also provide paths for metadata.json and weights.bin for the demo to work,
      not just to model.json,
      otherwise you'll get an error like "Uncaught (in promise) RangeError: buffer length for Float32Array should be a multiple of 4"
      https://github.com/tensorflow/tfjs/issues/8056
      */
    if (url.pathname.endsWith("/my_model/model.json"))
      return new Response(Bun.file(import.meta.dir + "/my_model/model.json"));

    if (url.pathname.endsWith("/my_model/metadata.json"))
      return new Response(
        Bun.file(import.meta.dir + "/my_model/metadata.json")
      );

    if (url.pathname.endsWith("/my_model/weights.bin"))
      return new Response(Bun.file(import.meta.dir + "/my_model/weights.bin"));

    // all other routes
    return new Response("Hello!");
  },
});
