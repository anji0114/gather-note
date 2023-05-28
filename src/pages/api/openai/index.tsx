import { OpenAIStream } from "@/utils/openai";

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const { message } = (await req.json()) as {
    message?: any;
  };

  const payload = {
    model: "gpt-3.5-turbo",
    messages: message,
    temperature: 0.9,
    max_tokens: 300,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;
