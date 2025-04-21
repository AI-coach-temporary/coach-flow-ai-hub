
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const AIAssistant = () => {
  const [contentType, setContentType] = useState('instagram');
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [tone, setTone] = useState('professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<null | { caption: string, ideas: string[] }>(null);
  
  const tones = [
    { id: 'professional', label: 'Professional & Authoritative', description: 'Polished, expert-oriented content for business coaches and consultants' },
    { id: 'inspiring', label: 'Inspiring & Motivational', description: 'Uplifting, encouraging content to inspire action and positive change' },
    { id: 'playful', label: 'Playful & Casual', description: 'Fun, relaxed content with personality and conversational style' },
  ];
  
  const handleGenerate = () => {
    if (!description.trim()) {
      toast.error('Please enter a content description');
      return;
    }

    setIsGenerating(true);
    
    // Keywords to base content generation on
    const keywords = description.split(' ').filter(word => word.length > 3);
    const linkAnalysis = link ? `based on similar content from ${link}` : '';
    
    // Simulate AI generation with a timeout
    setTimeout(() => {
      let caption = '';
      let ideas: string[] = [];
      
      // Generate dynamic content based on description and selected tone
      if (tone === 'professional') {
        caption = generateProfessionalContent(description, keywords, linkAnalysis);
        ideas = generateProfessionalIdeas(contentType, keywords);
      } else if (tone === 'inspiring') {
        caption = generateInspiringContent(description, keywords, linkAnalysis);
        ideas = generateInspiringIdeas(contentType, keywords);
      } else {
        caption = generatePlayfulContent(description, keywords, linkAnalysis);
        ideas = generatePlayfulIdeas(contentType, keywords);
      }
      
      setGeneratedContent({ caption, ideas });
      setIsGenerating(false);
      toast.success('Content generated successfully!');
    }, 2000);
  };

  const generateProfessionalContent = (description: string, keywords: string[], linkAnalysis: string) => {
    const industryTerms = ['strategy', 'growth', 'leadership', 'success', 'productivity', 'business', 'coaching'];
    const usedKeyword = keywords.length > 0 ? keywords[Math.floor(Math.random() * keywords.length)] : 'professional';
    const randomTerm = industryTerms[Math.floor(Math.random() * industryTerms.length)];
    
    return `Unlock your full potential with these evidence-based ${usedKeyword} strategies ${linkAnalysis}. In my latest coaching session, we explored how implementing structured approaches can increase ${randomTerm} by 37%. Want to transform your results? Book a discovery call (link in bio).\n\n#Executive${randomTerm.charAt(0).toUpperCase() + randomTerm.slice(1)} #${usedKeyword.charAt(0).toUpperCase() + usedKeyword.slice(1)}Strategies #BusinessGrowth`;
  };
  
  const generateInspiringContent = (description: string, keywords: string[], linkAnalysis: string) => {
    const inspiringTerms = ['journey', 'transformation', 'breakthrough', 'dream', 'vision', 'passion', 'purpose'];
    const usedKeyword = keywords.length > 0 ? keywords[Math.floor(Math.random() * keywords.length)] : 'journey';
    const randomTerm = inspiringTerms[Math.floor(Math.random() * inspiringTerms.length)];
    
    return `✨ Your ${usedKeyword} to greatness begins with a single brave decision! ${linkAnalysis} Today I witnessed a client achieve an incredible ${randomTerm} after committing to their vision. Remember: the universe rewards courage. What bold step will YOU take today? Comment below and let's inspire each other!\n\n#Dream${usedKeyword.charAt(0).toUpperCase() + usedKeyword.slice(1)} #PersonalGrowth #TransformationCoach`;
  };
  
  const generatePlayfulContent = (description: string, keywords: string[], linkAnalysis: string) => {
    const playfulTerms = ['chaos', 'adventure', 'laughs', 'reality', 'struggle', 'journey', 'plot twist'];
    const usedKeyword = keywords.length > 0 ? keywords[Math.floor(Math.random() * keywords.length)] : 'adventure';
    const randomTerm = playfulTerms[Math.floor(Math.random() * playfulTerms.length)];
    
    return `Okay let's be real... who else's ${usedKeyword} looks like complete ${randomTerm} with a side of "I'll figure it out tomorrow"? 🙋‍♀️😂 ${linkAnalysis} No judgment here! In today's session we tackled the mess with some actually-fun strategies that won't make you want to throw your planner out the window!\n\n#KeepingItReal #${usedKeyword.charAt(0).toUpperCase() + usedKeyword.slice(1)}Tips #CoachHumor`;
  };
  
  const generateProfessionalIdeas = (contentType: string, keywords: string[]) => {
    const baseIdeas = [
      "Create a carousel post showing 5 key principles with professional statistics",
      "Record a short video explaining one key technique with a professional setting",
      "Share a client success story focusing on measurable outcomes"
    ];
    
    if (keywords.length > 0) {
      return baseIdeas.map(idea => {
        const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
        return idea.replace(/key|professional|success/g, match => randomKeyword);
      });
    }
    
    return baseIdeas;
  };
  
  const generateInspiringIdeas = (contentType: string, keywords: string[]) => {
    const baseIdeas = [
      "Create an inspirational quote carousel with vibrant backgrounds and uplifting messages",
      "Film a motivational video with an energetic delivery and inspiring background music",
      "Share your personal transformation story with before/after context"
    ];
    
    if (keywords.length > 0) {
      return baseIdeas.map(idea => {
        const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
        return idea.replace(/inspirational|motivational|transformation/g, match => randomKeyword);
      });
    }
    
    return baseIdeas;
  };
  
  const generatePlayfulIdeas = (contentType: string, keywords: string[]) => {
    const baseIdeas = [
      "Create a humorous reel showing 'expectation vs reality' scenarios",
      "Post a casual selfie with your 'organized mess' and a relatable caption",
      "Share a behind-the-scenes blooper from your coaching session with a funny caption"
    ];
    
    if (keywords.length > 0) {
      return baseIdeas.map(idea => {
        const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
        return idea.replace(/humorous|organized|coaching/g, match => randomKeyword);
      });
    }
    
    return baseIdeas;
  };

  const handleSaveContent = () => {
    if (generatedContent) {
      toast.success('Content saved to your library!');
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
                  Instagram Post
                </Button>
                <Button
                  type="button"
                  onClick={() => setContentType('reel')}
                  variant={contentType === 'reel' ? 'default' : 'outline'}
                  className={contentType === 'reel' ? 'bg-brand-primary hover:bg-brand-secondary' : ''}
                >
                  Reel Script
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="link">Reference Post URL (Optional)</Label>
              <Input 
                id="link" 
                placeholder="https://www.instagram.com/p/example" 
                value={link}
                onChange={e => setLink(e.target.value)}
              />
            </div>
            
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
              disabled={isGenerating || !description} 
              className="w-full bg-brand-primary hover:bg-brand-secondary"
            >
              {isGenerating ? 'Generating...' : 'Generate Content'}
            </Button>
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Generated Content</h2>
          
          {!generatedContent && !isGenerating && (
            <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-md">
              <p className="text-gray-500">
                Content will appear here after generation
              </p>
            </div>
          )}
          
          {isGenerating && (
            <div className="h-64 flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-t-brand-primary rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Crafting your content...</p>
            </div>
          )}
          
          {generatedContent && !isGenerating && (
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Generated Caption:</h3>
                <div className="p-4 bg-gray-50 rounded-md">
                  <p className="whitespace-pre-line">{generatedContent.caption}</p>
                </div>
                <Button variant="outline" className="mt-2 text-xs" onClick={() => {
                  navigator.clipboard.writeText(generatedContent.caption);
                  toast.success('Caption copied to clipboard!');
                }}>
                  Copy Caption
                </Button>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Content Ideas:</h3>
                <ul className="space-y-2">
                  {generatedContent.ideas.map((idea, index) => (
                    <li key={index} className="p-3 bg-brand-light rounded-md">
                      {idea}
                    </li>
                  ))}
                </ul>
              </div>
              
              <Button className="w-full" variant="outline" onClick={handleSaveContent}>
                Save to Content Library
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AIAssistant;
