import openai from '@/lib/openai'

export async function GET(){
    const models = await openai.models.list();
    return Response.json(models)
}