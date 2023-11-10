export interface OpenAIResponse {
  title: string;
  ingredientsAmount: string;
  stepsToCook: string;
  timeToCook: string;
  difficulty: string;
  imageUrl: string;
}
export class Recipe {
  title: string;
  ingredientsAmount: string[];
  stepsToCook: string[];
  timeToCook: string;
  difficulty: string;
  imageUrl: string;
}
