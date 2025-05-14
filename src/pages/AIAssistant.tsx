
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { createClient } from '@supabase/supabase-js';

// Import our components
import ContentAnalysis from '@/components/ai-assistant/ContentAnalysis';
import ContentResult from '@/components/ai-assistant/ContentResult';
import ContentForm from '@/components/ai-assistant/ContentForm';

// Import our utility functions
import { 
  generateProfessionalContent, 
  generateInspiringContent,
  generatePlayfulContent,
  generateProfessionalHashtags,
  generateInspiringHashtags,
  generatePlayfulHashtags,
  generateImagePrompt
} from '@/components/ai-assistant/utils/contentGenerators';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const AIAssistant = () => {
  const [contentType, setContentType] = useState('instagram');
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [tone, setTone] = useState('professional');
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  
  const [analysisData, setAnalysisData] = useState<null | {
    toneScore: number;
    contentType: string;
    primaryEmotions: string[];
    dominantColors?: string[];
    topicKeywords: string[];
    engagementLevel?: string;
  }>(null);
  
  const [generatedContent, setGeneratedContent] = useState<null | {
    caption: string;
    hashtags: string[];
    image?: string;
    reelScript?: string[];
    ideas?: string[];
    imagePrompt?: string;
  }>(null);
  
  // Handle analysis of reference content
  const handleAnalyzeReference = () => {
    if (!link.trim()) {
      toast.error('Please enter a reference URL');
      return;
    }
    
    // Validate if the link is an Instagram URL
    if (!link.includes('instagram.com')) {
      toast.error('Please enter a valid Instagram URL');
      return;
    }
    
    setIsAnalyzing(true);
    
    // This would normally be an API call to analyze the Instagram post
    // For now, we'll simulate it with a timeout and mock data
    setTimeout(() => {
      // Mock analysis data based on content type
      const mockAnalysisData = {
        toneScore: Math.random() * 0.4 + 0.6, // Between 0.6 and 1.0
        contentType: contentType === 'instagram' ? 'Image Post' : 'Video Reel',
        primaryEmotions: ['Confidence', 'Enthusiasm', 'Trust'],
        dominantColors: ['#E1C4D8', '#AEC5EB', '#F9F9F9', '#424242'],
        topicKeywords: ['coaching', 'business', 'success', 'growth'],
        engagementLevel: 'Medium-High'
      };
      
      setAnalysisData(mockAnalysisData);
      setIsAnalyzing(false);
      toast.success('Content analyzed successfully!');
    }, 1500);
  };
  
  const generateImage = async (imagePrompt: string) => {
    setIsGeneratingImage(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { prompt: imagePrompt }
      });
      
      if (error) {
        console.error('Error generating image:', error);
        toast.error('Failed to generate image. Please try again.');
        return null;
      }
      
      return data.imageUrl;
    } catch (error) {
      console.error('Error calling image generation function:', error);
      toast.error('Failed to generate image. Please try again.');
      return null;
    } finally {
      setIsGeneratingImage(false);
    }
  };
  
  const handleGenerate = async () => {
    if (!description.trim()) {
      toast.error('Please enter a content description');
      return;
    }

    setIsGenerating(true);
    
    // Keywords to base content generation on
    const keywords = description.split(' ').filter(word => word.length > 3);
    
    try {
      let caption = '';
      let hashtags: string[] = [];
      let reelScript: string[] | undefined;
      let ideas: string[] | undefined;
      let imagePrompt = '';
      
      // Generate dynamic content based on description and selected tone
      if (tone === 'professional') {
        caption = generateProfessionalContent(description, keywords);
        hashtags = generateProfessionalHashtags(keywords);
        
        if (contentType === 'reel') {
          reelScript = [
            "Open with a confident stance and a direct question: 'Want to double your client conversion rate?'",
            "Share a quick statistic about how structured approaches increase business success",
            "Transition to a brief demonstration of your key framework - show a simple 3-step process",
            "End with a clear call-to-action for your coaching services"
          ];
        }
        
        ideas = [
          "Create a carousel post showing 5 key business principles with professional statistics",
          "Record a short testimonial video from a recent client success story",
          "Share a behind-the-scenes look at your coaching methodology"
        ];
        
        imagePrompt = generateImagePrompt(description, 'professional', keywords);
      } else if (tone === 'inspiring') {
        caption = generateInspiringContent(description, keywords);
        hashtags = generateInspiringHashtags(keywords);
        
        if (contentType === 'reel') {
          reelScript = [
            "Start with an emotional hook: 'The moment everything changed for me was...'",
            "Pan to visual of transformation - perhaps a before/after metaphor",
            "Share the key insight that made the biggest difference in your journey",
            "End with an uplifting message and invitation to join your community"
          ];
        }
        
        ideas = [
          "Create an inspirational quote carousel with vibrant backgrounds from your latest talk",
          "Film a motivational morning routine video showing how you prepare for success",
          "Share a personal transformation story connected to your coaching philosophy"
        ];
        
        imagePrompt = generateImagePrompt(description, 'inspiring', keywords);
      } else {
        caption = generatePlayfulContent(description, keywords);
        hashtags = generatePlayfulHashtags(keywords);
        
        if (contentType === 'reel') {
          reelScript = [
            "Start with a relatable pain point, delivered with humor: 'When your to-do list is longer than your...'",
            "Quick cut to an exaggerated reaction showing overwhelm",
            "Transition to your simple solution with a playful demonstration",
            "End with a light-hearted invitation and authentic smile"
          ];
        }
        
        ideas = [
          "Create a humorous 'expectations vs reality' comparison about business coaching",
          "Share a casual behind-the-scenes blooper from your last workshop",
          "Post a day-in-the-life sequence with funny captions about entrepreneurship challenges"
        ];
        
        imagePrompt = generateImagePrompt(description, 'playful', keywords);
      }
      
      // Store initial content without image
      setGeneratedContent({
        caption,
        hashtags,
        reelScript,
        ideas,
        imagePrompt
      });
      
      // Generate image
      const imageUrl = await generateImage(imagePrompt);
      
      // Update content with image
      setGeneratedContent(prevContent => {
        if (prevContent) {
          return {
            ...prevContent,
            image: imageUrl || undefined
          };
        }
        return null;
      });
      
      toast.success('Content generated successfully!');
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error('Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Content Assistant</h1>
          <p className="text-gray-600">Generate content ideas and captions in your unique voice</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Content Generator</h2>
          <ContentForm 
            contentType={contentType}
            setContentType={setContentType}
            link={link}
            setLink={setLink}
            description={description}
            setDescription={setDescription}
            tone={tone}
            setTone={setTone}
            isAnalyzing={isAnalyzing}
            handleAnalyzeReference={handleAnalyzeReference}
            analysisData={analysisData}
            isGenerating={isGenerating}
            handleGenerate={handleGenerate}
          />
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Generated Content</h2>
          <ContentResult 
            generatedContent={generatedContent}
            isLoading={isGenerating || isGeneratingImage}
          />
        </Card>
      </div>
    </div>
  );
};

export default AIAssistant;
