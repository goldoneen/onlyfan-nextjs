import { NextResponse } from 'next/server';
import clientPromise from '../../utils/mongodb'; 

// POST: get models that are not free
export async function POST(request) {
  try {
    const { skip = 0, limit = 40 } = await request.json();

    const client = await clientPromise;
    const db = client.db('onlyfans'); 
    const modelsCollection = db.collection('models'); 

    const models = await modelsCollection.aggregate([
      {
        $match: {
          price: {
            $exists: true, 
            $ne: null,     
            $not: /^\s*FREE\s*$/i 
          }
        }
      },
      {
        $addFields: {
          numericPrice: {
            $convert: {
              input: {
                $substrCP: [ "$price", 1, { $strLenCP: "$price" } ]
              },
              to: "double", 
              onError: null, 
              onNull: null   
            }
          }
        }
      },
      {
        $match: {
          numericPrice: { $ne: null }
        }
      },
      { $sort: { numericPrice: -1 } },
      { $skip: Number(skip) },
      { $limit: Number(limit) },
      {
        $project: {
          _id: 0, 
          model_name: 1,
          image_url: 1,
          model_description: 1,
          price: 1,
          text_small: 1, 
          category: 1,
          profile: 1 
        }
      }
    ]).toArray();

    return NextResponse.json({ models });
  } catch (error) {
    console.error("Error fetching paid models:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
