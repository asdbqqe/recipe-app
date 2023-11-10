import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Recipe extends Document {
  @Prop()
  title: string;

  @Prop([String])
  ingredientsAmount: string[];

  @Prop([String])
  stepsToCook: string[];

  @Prop()
  timeToCook: string;

  @Prop()
  difficulty: string;

  @Prop()
  imageUrl: string;
}

export type RecipeDocument = Recipe & Document;

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
