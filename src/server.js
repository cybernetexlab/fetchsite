// Fetch microservice

async function handler(request) {
  let GET = request['url'];

  if (GET.includes('=') === false) GET = '=nasa.gov';
  const domain = GET.split('=')[1];
  const url = `http://${domain}`;
  const fetchResponse = await fetch(url);
  const html = await fetchResponse.text();

  return new Response(html, {
    headers: {
      'content-type': 'text/html',
    },
  });
}

Deno.serve(handler, { port: 8080 });
