'use server';
/**
 * @fileOverview A Genkit flow for generating persuasive marketing messages tailored to specific audience niches.
 *
 * - generateMarketingMessage - A function that handles the marketing message generation process.
 * - GenerateMarketingMessageInput - The input type for the generateMarketingMessage function.
 * - GenerateMarketingMessageOutput - The return type for the generateMarketingMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const GenerateMarketingMessageInputSchema = z.object({
  offerDescription: z.string().describe('A detailed description of the marketing offer.'),
  audienceNiche: z.string().describe('The specific audience niche this message should target.'),
});
export type GenerateMarketingMessageInput = z.infer<typeof GenerateMarketingMessageInputSchema>;

// Output Schema
const GenerateMarketingMessageOutputSchema = z.object({
  marketingMessage: z.string().describe('The persuasive marketing message generated for the offer and audience.'),
});
export type GenerateMarketingMessageOutput = z.infer<typeof GenerateMarketingMessageOutputSchema>;

// Wrapper function
export async function generateMarketingMessage(input: GenerateMarketingMessageInput): Promise<GenerateMarketingMessageOutput> {
  return generateMarketingMessageFlow(input);
}

// Prompt definition
const marketingMessagePrompt = ai.definePrompt({
  name: 'marketingMessagePrompt',
  input: {schema: GenerateMarketingMessageInputSchema},
  output: {schema: GenerateMarketingMessageOutputSchema},
  prompt: `Você é um especialista em marketing com uma vasta experiência em criar mensagens persuasivas e impactantes.
Sua tarefa é criar uma mensagem de marketing altamente envolvente e persuasiva para a seguinte oferta, adaptada para o nicho de público especificado.

Considere os seguintes pontos ao criar a mensagem:
- Destaque os benefícios e o valor da oferta.
- Use uma linguagem que ressoe com o público-alvo.
- Inclua uma chamada clara para ação.
- Seja conciso e direto.

Descrição da Oferta: {{{offerDescription}}}
Nicho de Público: {{{audienceNiche}}}

Sua resposta deve ser um objeto JSON com uma única chave 'marketingMessage' contendo a mensagem gerada.`,
});

// Flow definition
const generateMarketingMessageFlow = ai.defineFlow(
  {
    name: 'generateMarketingMessageFlow',
    inputSchema: GenerateMarketingMessageInputSchema,
    outputSchema: GenerateMarketingMessageOutputSchema,
  },
  async (input) => {
    const {output} = await marketingMessagePrompt(input);
    if (!output) {
      throw new Error('Failed to generate marketing message.');
    }
    return output;
  }
);
