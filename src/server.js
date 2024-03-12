// Fetch microservice

async function handler(request) {
  let GET = request['url'];

  const isClientURI = GET.includes('=');
  if (isClientURI === false) GET = '=nasa.gov';
  const domain = GET.split('=')[1]; // microservice.dev/?req=domain
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
