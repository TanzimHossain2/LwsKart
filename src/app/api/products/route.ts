export async function POST(request: Request) {
    return new Response('POST request received');
}

export async function GET(request: Request) {
    return  Response.json({ message: 'GET request received' });
}