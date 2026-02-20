import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';
import { tools } from './tools';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  console.log("Messages are ",messages)
  //TODO TASK 1
    const context = `
College of Engineering Guindy offers courses like IT, CSE, ECE, EEE, Mechanical, Civil, Production, Industrial, and more.

Common factors students consider:
- Interest in coding, electronics, core engineering, or management
- Placement opportunities
- Higher studies plans (MS, MBA, research)
- Work-life balance and difficulty level
- Personal strengths in math, physics, or problem solving
`;

const systemPrompt = `You are a helpful academic guide for students choosing courses in College of Engineering Guindy under Anna University.
You ask students about their interests, strengths, and goals, then suggest the best-fit department with a short reason.
Always be crisp, max 2 sentences per reply.
Context:
${context}
`;

  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),

    //TODO TASK 2 - Tool Calling
     tools,            // Uncomment to enable tool calling
    // maxSteps: 5,      // Allow multi-step tool use (model calls tool → gets result → responds)
  });

  return result.toUIMessageStreamResponse();
}
