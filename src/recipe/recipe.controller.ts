// recipe.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe } from './types/recipe.entity';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post('generate')
  async generateRecipe(@Body() ingredients: string[]): Promise<Recipe> {
    return this.recipeService.generateRecipe(ingredients);
  }
}
