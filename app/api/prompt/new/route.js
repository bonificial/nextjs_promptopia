import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();
  console.log("requesting with ", { userId, prompt, tag });
  try {
    await connectToDB();
    const newPrompt = new Prompt({ creator: userId, prompt, tag });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (e) {
    return new Response("Failed to create a new Prompt", { status: 500 });
  }
};
