import { Router } from 'express';
import { asyncHandler } from '../../../shared/lib/asyncHandler';
import { storyController } from '../controller/product.controller';

const storiesRouter = Router();
storiesRouter.post('/', asyncHandler(storyController.createStory));

storiesRouter.get('/', (req, res) => {
  res.status(405).json({ message: 'Use POST method to create stories' });
});

export default storiesRouter;