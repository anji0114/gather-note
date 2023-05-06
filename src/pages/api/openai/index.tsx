import openai from "@/utils/openai";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { message } = req.body;

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: message,
  });

  return res.status(200).json({ content: completion.data.choices[0].message?.content });
};

export default handler;