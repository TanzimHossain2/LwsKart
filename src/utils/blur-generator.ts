import { getPlaiceholder } from "plaiceholder";


async function getBlurData(src: any) {

  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );

  const data = await getPlaiceholder(buffer);
  return data;
}

export { getBlurData };



import axios from 'axios';

export async function getBase64ImageUrl(url: string): Promise<string> {
  const response = await axios.get(url, {
    responseType: 'arraybuffer'
  });
  const buffer = Buffer.from(response.data, 'binary').toString('base64');
  return `data:image/jpeg;base64,${buffer}`;
}

export default getBase64ImageUrl;



