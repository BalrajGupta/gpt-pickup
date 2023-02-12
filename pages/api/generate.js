import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix =  `Imagine you are a personal development coach helping men be more confident, get more dates, & flirt better.
Write 5 personal pick up lines to impress a woman.
Example 1: Sometimes you hit the ball out of the park, sometimes you make it to first base...Either way you're going home.
Example 2: I was blinded by your beauty; I’m going to need your name and phone number for insurance purposes.
Imagine the girl has the following as her Tinder bio: `;

const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}\n`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.66,
    max_tokens: 300,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  // Send over the Prompt #2's output to our UI instead of Prompt #1's.
  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;