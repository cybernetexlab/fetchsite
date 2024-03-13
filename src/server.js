// Fetch microservice

const handler = async (request) => {
  let GET = request['url'];

  const isClientURI = GET.includes('=');
  if (isClientURI === false) GET = '=nasa.gov';
  const domain = GET.split('=')[1]; // microservice.dev/?req=domain
  const url = `http://${domain}`;

  try {
    const fetchResponse = await fetch(url);
    const html = await fetchResponse.text();
    return new Response(html, { headers: { 'content-type': 'text/html' } });
  } catch (err) {
    if (err instanceof TypeError) {
      return new Response("Don't worry");
    }
  }
};

Deno.serve({ port: 3000 }, handler);
