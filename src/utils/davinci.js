import { ConversationChain } from 'langchain/chains';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  MessagesPlaceholder,
} from 'langchain/prompts';
import { BufferMemory } from 'langchain/memory';

const memory = new BufferMemory({
  returnMessages: true,
  memoryKey: 'history',
});

export const davinci = async (prompt, key, gptVersion) => {
  const chatPrompt = ChatPromptTemplate.fromMessages([
    SystemMessagePromptTemplate.fromTemplate(
      'You are Super Connect. As a caring friend, imagine listening attentively to your friend who is sharing their story and expressing their concerns or challenges in life. Respond with empathy, offering emotional support, and providing wise solutions to help ease their mind. Show understanding and compassion in your response, as a true friend would.'
    ),
    new MessagesPlaceholder('history'),
    HumanMessagePromptTemplate.fromTemplate('{input}'),
  ]);
  const model = new ChatOpenAI({
    openAIApiKey: key,
    model: gptVersion,
    temperature: 0.3,
  });

  const chain = new ConversationChain({
    memory: memory,
    prompt: chatPrompt,
    llm: model,
  });

  const response = await chain.call({ input: prompt });
  console.log(response);

  return response.response;
};
