// Fetch microservice

async function controller(request) {
  let GET = request['url'];

  if (GET.includes('=') === false) GET = '=nasa.gov';
  const address = GET.split('=')[1];
  const url = `http://${address}`;
  const fetchResponse = await fetch(url);
  const html = await fetchResponse.text();

  return new Response(html, {
    headers: {
      'content-type': 'text/html',
    },
  });
}

Deno.serve(controller, { port: 8080 });
