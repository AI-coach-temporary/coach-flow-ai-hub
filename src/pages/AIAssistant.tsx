
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

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
    setIsGenerating(true);
    
    // Simulate AI generation with a timeout
    setTimeout(() => {
      // Mock generated content based on selected tone
      let caption = '';
      let ideas: string[] = [];
      
      if (tone === 'professional') {
        caption = "Unlock your team's full potential with these proven leadership strategies. In my latest coaching session, we explored how structured feedback loops can increase productivity by 37%. Want to transform your team dynamics? Book a discovery call (link in bio).\n\n#ExecutiveCoaching #LeadershipStrategies #BusinessGrowth";
        ideas = [
          "Create a carousel post showing 5 leadership principles with professional statistics",
          "Record a short reel explaining one key leadership technique with a professional setting",
          "Share a client success story focusing on measurable business outcomes"
        ];
      } else if (tone === 'inspiring') {
        caption = "✨ Your journey to greatness begins with a single brave decision! Today I watched a client take that leap of faith and commit to their dreams. Remember: the universe rewards courage. What bold step will YOU take today? Comment below and let's inspire each other!\n\n#DreamBigger #PersonalGrowth #TransformationCoach";
        ideas = [
          "Create an inspirational quote carousel with vibrant backgrounds and uplifting messages",
          "Film a motivational reel with an energetic delivery and inspiring background music",
          "Share your personal transformation story with before/after context"
        ];
      } else {
        caption = "Okay let's be real... who else's 'productivity system' looks like 27 forgotten sticky notes and a prayer? 🙋‍♀️😂 No judgment here! In today's coaching session we tackled the chaos with some actually-fun organizing hacks that won't make you want to throw your planner out the window!\n\n#KeepingItReal #ProductivityTips #LifeCoachHumor";
        ideas = [
          "Create a humorous reel showing 'expectation vs reality' of productivity systems",
          "Post a casual selfie with your 'organized mess' and a relatable caption",
          "Share a behind-the-scenes blooper from your coaching session with a funny caption"
        ];
      }
      
      setGeneratedContent({ caption, ideas });
      setIsGenerating(false);
    }, 2000);
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
                <Button variant="outline" className="mt-2 text-xs" onClick={() => navigator.clipboard.writeText(generatedContent.caption)}>
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
              
              <Button className="w-full" variant="outline">
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
