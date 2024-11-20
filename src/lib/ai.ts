import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyCaXpTW813OO-iJi5xyhflLkQ7pfQIA36Q');

export async function getPlaceRecommendations(
  location: google.maps.LatLngLiteral,
  preferences?: string
) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `Given the location (${location.lat}, ${location.lng}) in Durban, South Africa, 
      suggest 5 interesting places to visit nearby. ${preferences || ''}
      Format the response as JSON with the following structure for each place:
      {
        "name": "Place Name",
        "description": "Brief description",
        "type": "tourist_attraction/restaurant/etc",
        "rating": 4.5 (estimated)
      }
      Return an array of these objects.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return JSON.parse(text);
  } catch (error) {
    console.error('AI Recommendation Error:', error);
    return [];
  }
}