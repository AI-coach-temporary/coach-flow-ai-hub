
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt } = await req.json();
    
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Call Anthropic API for image generation
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': Deno.env.get('ANTHROPIC_API_KEY'),
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: "claude-3-opus-20240229",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Generate a detailed image of: ${prompt}. Please respond with valid JSON only containing a direct image URL as an imageUrl key. Do not include any other explanations or instructions.`
              }
            ]
          }
        ],
        system: "You are an AI assistant that specializes in generating image descriptions. Your task is to convert user prompts into detailed image links formatted as valid JSON with an imageUrl key. Your JSON response should only contain the imageUrl key with a URL value. No explanations, just a valid JSON object."
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Anthropic API error:", errorData);
      return new Response(
        JSON.stringify({ error: 'Image generation failed', details: errorData }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: response.status }
      );
    }

    const data = await response.json();
    console.log("Anthropic response:", data);
    
    // Extract the content from Claude's response
    if (data.content && data.content.length > 0) {
      const messageContent = data.content[0].text;
      
      // Try to extract a URL from the response
      try {
        // Parse the JSON content from Claude
        const jsonMatch = messageContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsedJson = JSON.parse(jsonMatch[0]);
          if (parsedJson.imageUrl) {
            return new Response(
              JSON.stringify({ imageUrl: parsedJson.imageUrl }),
              { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }
        }
        
        // If we couldn't parse JSON or find imageUrl, look for a URL in the text
        const urlMatch = messageContent.match(/https?:\/\/[^\s"']+/);
        if (urlMatch) {
          return new Response(
            JSON.stringify({ imageUrl: urlMatch[0] }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      } catch (error) {
        console.error("Error parsing Claude response:", error);
      }
    }
    
    // If we couldn't find a valid image URL, return an error
    return new Response(
      JSON.stringify({ error: 'Could not extract image URL from Anthropic response' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred', details: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
