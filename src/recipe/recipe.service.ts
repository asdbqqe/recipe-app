// recipe.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recipe, RecipeDocument } from './types/recipe.entity';
import { ConfigService } from '@nestjs/config';

import OpenAI from 'openai';

@Injectable()
export class RecipeService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
    private configService: ConfigService,
  ) {}

  async generateRecipe(ingredients: string | string[]): Promise<Recipe> {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    const organization = this.configService.get<string>('OPENAI_ORGANIZATION');

    const openai = new OpenAI({
      apiKey: apiKey,
      organization: organization,
    });
    console.log(ingredients);

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `Please create a recipe with this ${ingredients} and return in JSON format with this structure: title - string, ingredientsAmount - array string, stepsToCook - is array string, timeToCook - is string with hour and minutes, difficulty - string, imageUrl - generate image`,
        },
      ],
      model: 'gpt-3.5-turbo',
    });

    const responseContent = chatCompletion.choices[0].message.content;

    console.log(responseContent);

    const recipe = JSON.parse(responseContent);

    const response = await openai.images.generate({
      prompt: recipe.title,
      size: '256x256',
      n: 1,
    });

    const imageUrl = response.data[0].url;

    const generatedRecipe = new this.recipeModel({
      title: recipe.title || 'Unknown',
      ingredientsAmount: recipe.ingredientsAmount,
      stepsToCook: recipe.stepsToCook || [],
      timeToCook: recipe.timeToCook || 'Unknown',
      difficulty: recipe.difficulty || 'Unknown',
      imageUrl: imageUrl,
    });

    await generatedRecipe.save();
    return generatedRecipe;
  }
}
