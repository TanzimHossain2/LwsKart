import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const dynamic= "force-dynamic";

export async function GET(req : NextRequest) {

const {searchParams} = new URL(req.url)

const hasTitle = searchParams.has('title')
const hasDescription = searchParams.has('description')

const title = hasTitle ? searchParams.get('title') : 'Welcome to You LWSKART'
const description = hasDescription ? searchParams.get('description') : 'Here you can find all the products you need.'


  return new ImageResponse(
    (
      <div tw="flex flex-col justify-center items-center w-full h-full  bg-teal-500 text-black p-8">
        <h3 tw="text-5xl font-bold mb-4">
          {title}
        </h3>
        <p tw="text-2xl">
          {description}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
