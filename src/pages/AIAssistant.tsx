
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Instagram, Video } from 'lucide-react';

// Import our new components
import ContentAnalysis from '@/components/ai-assistant/ContentAnalysis';
import ContentResult from '@/components/ai-assistant/ContentResult';

const AIAssistant = () => {
  const [contentType, setContentType] = useState('instagram');
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [tone, setTone] = useState('professional');
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
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
  }>(null);
  
  const tones = [
    { id: 'professional', label: 'Professional & Authoritative', description: 'Polished, expert-oriented content for business coaches and consultants' },
    { id: 'inspiring', label: 'Inspiring & Motivational', description: 'Uplifting, encouraging content to inspire action and positive change' },
    { id: 'playful', label: 'Playful & Casual', description: 'Fun, relaxed content with personality and conversational style' },
  ];
  
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
  
  const handleGenerate = () => {
    if (!description.trim()) {
      toast.error('Please enter a content description');
      return;
    }

    setIsGenerating(true);
    
    // Keywords to base content generation on
    const keywords = description.split(' ').filter(word => word.length > 3);
    
    // Simulate AI generation with a timeout - this would be an API call in production
    setTimeout(() => {
      let caption = '';
      let hashtags: string[] = [];
      let image: string | undefined;
      let reelScript: string[] | undefined;
      let ideas: string[] | undefined;
      
      // Generate dynamic content based on description and selected tone
      if (tone === 'professional') {
        caption = generateProfessionalContent(description, keywords);
        hashtags = generateProfessionalHashtags(keywords);
        image = "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=1000"; // Placeholder image
        
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
      } else if (tone === 'inspiring') {
        caption = generateInspiringContent(description, keywords);
        hashtags = generateInspiringHashtags(keywords);
        image = "https://images.unsplash.com/photo-1494178270175-e96de2971df9?q=80&w=1000"; // Placeholder image
        
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
      } else {
        caption = generatePlayfulContent(description, keywords);
        hashtags = generatePlayfulHashtags(keywords);
        image = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000"; // Placeholder image
        
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
      }
      
      setGeneratedContent({ caption, hashtags, image, reelScript, ideas });
      setIsGenerating(false);
      toast.success('Content generated successfully!');
    }, 2000);
  };

  const generateProfessionalContent = (description: string, keywords: string[]) => {
    const industryTerms = ['strategy', 'growth', 'leadership', 'success', 'productivity', 'business', 'coaching'];
    const usedKeyword = keywords.length > 0 ? keywords[Math.floor(Math.random() * keywords.length)] : 'professional';
    const randomTerm = industryTerms[Math.floor(Math.random() * industryTerms.length)];
    
    return `Unlock your full potential with these evidence-based ${usedKeyword} strategies that drive results. In my latest coaching session, we explored how implementing structured approaches can increase ${randomTerm} by 37%.\n\nThe key insight? Success leaves clues. By analyzing the patterns of high-performers in your industry, you can adapt their frameworks to your unique situation.\n\nWant to transform your results? Book a discovery call (link in bio) and let's create your customized ${randomTerm} roadmap.`;
  };
  
  const generateInspiringContent = (description: string, keywords: string[]) => {
    const inspiringTerms = ['journey', 'transformation', 'breakthrough', 'dream', 'vision', 'passion', 'purpose'];
    const usedKeyword = keywords.length > 0 ? keywords[Math.floor(Math.random() * keywords.length)] : 'journey';
    const randomTerm = inspiringTerms[Math.floor(Math.random() * inspiringTerms.length)];
    
    return `✨ Your ${usedKeyword} to greatness begins with a single brave decision! Today I witnessed a client achieve an incredible ${randomTerm} after committing to their vision despite all the doubts.\n\nRemember: the universe rewards courage. The path might not be clear yet, but that first step changes everything.\n\nWhat bold step will YOU take today? Comment below and let's inspire each other!`;
  };
  
  const generatePlayfulContent = (description: string, keywords: string[]) => {
    const playfulTerms = ['chaos', 'adventure', 'laughs', 'reality', 'struggle', 'journey', 'plot twist'];
    const usedKeyword = keywords.length > 0 ? keywords[Math.floor(Math.random() * keywords.length)] : 'adventure';
    const randomTerm = playfulTerms[Math.floor(Math.random() * playfulTerms.length)];
    
    return `Okay let's be real... who else's ${usedKeyword} looks like complete ${randomTerm} with a side of "I'll figure it out tomorrow"? 🙋‍♀️😂\n\nNo judgment here! In today's coaching session we tackled the mess with some actually-fun strategies that won't make you want to throw your planner out the window!\n\nPro tip: Sometimes the most productive thing you can do is take a nap. Seriously. Science backs me up on this one. ✨`;
  };
  
  const generateProfessionalHashtags = (keywords: string[]) => {
    const baseHashtags = ['#ExecutiveCoaching', '#BusinessGrowth', '#LeadershipDevelopment', '#SuccessStrategies'];
    
    if (keywords.length > 0) {
      const additionalTags = keywords
        .slice(0, 3)
        .map(word => `#${word.charAt(0).toUpperCase() + word.slice(1)}`);
      
      return [...baseHashtags, ...additionalTags];
    }
    
    return baseHashtags;
  };
  
  const generateInspiringHashtags = (keywords: string[]) => {
    const baseHashtags = ['#PersonalGrowth', '#TransformationJourney', '#MindsetShift', '#DreamBigger'];
    
    if (keywords.length > 0) {
      const additionalTags = keywords
        .slice(0, 3)
        .map(word => `#${word.charAt(0).toUpperCase() + word.slice(1)}Journey`);
      
      return [...baseHashtags, ...additionalTags];
    }
    
    return baseHashtags;
  };
  
  const generatePlayfulHashtags = (keywords: string[]) => {
    const baseHashtags = ['#KeepingItReal', '#CoachHumor', '#EntrepreneurLife', '#ThatsHowWeRoll'];
    
    if (keywords.length > 0) {
      const additionalTags = keywords
        .slice(0, 3)
        .map(word => `#${word.charAt(0).toUpperCase() + word.slice(1)}Problems`);
      
      return [...baseHashtags, ...additionalTags];
    }
    
    return baseHashtags;
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
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="contentType" className="text-base font-medium">Content Type</Label>
              <div className="flex gap-4 mt-2">
                <Button
                  type="button"
                  onClick={() => setContentType('instagram')}
                  variant={contentType === 'instagram' ? 'default' : 'outline'}
                  className={contentType === 'instagram' ? 'bg-brand-primary hover:bg-brand-secondary' : ''}
                >
                  <Instagram className="mr-2 h-4 w-4" />
                  Instagram Post
                </Button>
                <Button
                  type="button"
                  onClick={() => setContentType('reel')}
                  variant={contentType === 'reel' ? 'default' : 'outline'}
                  className={contentType === 'reel' ? 'bg-brand-primary hover:bg-brand-secondary' : ''}
                >
                  <Video className="mr-2 h-4 w-4" />
                  Reel Script
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="link">Reference Post URL</Label>
              <div className="flex gap-2">
                <Input 
                  id="link" 
                  placeholder="https://www.instagram.com/p/example" 
                  value={link}
                  onChange={e => setLink(e.target.value)}
                  className="flex-grow"
                />
                <Button 
                  onClick={handleAnalyzeReference}
                  disabled={isAnalyzing || !link.trim()} 
                  variant="outline"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze'}
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Paste a link to an Instagram post you'd like to use as reference
              </p>
            </div>
            
            {analysisData && (
              <ContentAnalysis 
                analysisData={analysisData}
                isLoading={isAnalyzing}
              />
            )}
            
            <div className="space-y-2">
              <Label htmlFor="description">Content Description or Keywords</Label>
              <Textarea 
                id="description" 
                placeholder="Briefly describe what you want to post about..." 
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="space-y-3">
              <Label className="text-base font-medium">Voice Style</Label>
              <RadioGroup value={tone} onValueChange={setTone} className="space-y-3">
                {tones.map(toneOption => (
                  <div key={toneOption.id} className="flex items-start space-x-2">
                    <RadioGroupItem value={toneOption.id} id={toneOption.id} />
                    <div className="grid gap-1">
                      <Label htmlFor={toneOption.id} className="font-medium">
                        {toneOption.label}
                      </Label>
                      <p className="text-sm text-gray-500">
                        {toneOption.description}
                      </p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <Button 
              onClick={handleGenerate}
              disabled={isGenerating || !description.trim()} 
              className="w-full bg-brand-primary hover:bg-brand-secondary"
            >
              {isGenerating ? 'Generating...' : 'Generate Content'}
            </Button>
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Generated Content</h2>
          
          <ContentResult 
            generatedContent={generatedContent}
            isLoading={isGenerating}
          />
        </Card>
      </div>
    </div>
  );
};

export default AIAssistant;
