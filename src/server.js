// Fetch microservice

const CURRENT = Deno.version.deno;

const SUPPORT = {
  '1.41.2': true,
};

const print = (...critical) => console.log([...critical].join(''));

if (!SUPPORT[CURRENT]) {
  print('Tested on Deno version: ', ...Object.keys(SUPPORT));
  print('You have installed ', CURRENT);
}

const handler = async (request) => {
  let GET = request['url'];

  const isClientURI = GET.includes('=');
  if (isClientURI === false) GET = '=nasa.gov';
  const domain = GET.split('=')[1]; // microservice.dev/?req=domain
  const url = 'http://'.concat(domain);

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
