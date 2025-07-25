import { NextResponse } from 'next/server';
import clientPromise from '../../utils/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('onlyfans');
    const modelsCollection = db.collection('models');
    // Get unique categories
    const categories = await modelsCollection.distinct('category');
    return NextResponse.json({ categories });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: get up to 20 models for a given category
export async function POST(request) {
  try {
    const { category, skip = 0, limit = 12 } = await request.json();
    if (!category) {
      return NextResponse.json({ error: 'Category is required' }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db('onlyfans');
    const modelsCollection = db.collection('models');
    const models = await modelsCollection
      .find({ category })
      .skip(Number(skip))
      .limit(Number(limit))
      .project({
        _id: 0,
        model_name: 1,
        image_url: 1,
        model_description: 1,
        price: 1,
        text_small: 1,
        category: 1
      })
      .toArray();
    return NextResponse.json({ models });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 
