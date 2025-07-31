import { NextResponse } from 'next/server';
import clientPromise from '../../utils/mongodb'; 

export async function POST(request) {
  try {
    const { modelIds = [] } = await request.json();

    if (modelIds.length === 0) {
      return NextResponse.json({ models: [] });
    }

    const client = await clientPromise;
    const db = client.db('onlyfans'); 
    const modelsCollection = db.collection('models');
    const modelsByLocationCollection = db.collection('models-by-location'); 

    const modelsFromMain = await modelsCollection.find({
      $or: [
        { id: { $in: modelIds } },
        { model_name: { $in: modelIds } }
      ]
    }).toArray();

    const modelsFromLocation = await modelsByLocationCollection.find({
      $or: [
        { id: { $in: modelIds } },
        { model_name: { $in: modelIds } }
      ]
    }).toArray();

    const combinedModelsMap = new Map();

    [...modelsFromMain, ...modelsFromLocation].forEach(model => {
      const key = model.model_name || model.id;
      if (key) {
        combinedModelsMap.set(key, model);
      }
    });
    
    const combinedModels = Array.from(combinedModelsMap.values());

    return NextResponse.json({ models: combinedModels });
  } catch (error) {
    console.error("Error fetching wishlist models:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
