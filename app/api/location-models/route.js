import { NextResponse } from 'next/server';
import clientPromise from '../../utils/mongodb';

export async function POST(request) {
  try {
    const { location, skip = 0, limit = 40 } = await request.json();
    if (!location) {
      return NextResponse.json({ error: 'Location is required' }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db('onlyfans');
    const modelsCollection = db.collection('models-by-location');
    const models = await modelsCollection
      .find({ location: { $regex: `^${location}$`, $options: 'i' } })
      .skip(Number(skip))
      .limit(Number(limit))
      .project({
        _id: 0,
        model_name: 1,
        image_url: 1,
        model_description: 1,
        price: 1,
        text_small: 1,
        category: 1,
        location: 1
      })
      .toArray();
    return NextResponse.json({ models });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 