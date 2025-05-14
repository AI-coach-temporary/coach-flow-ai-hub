
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Instagram, Video } from 'lucide-react';
import ContentAnalysis from './ContentAnalysis';

interface ToneOption {
  id: string;
  label: string;
  description: string;
}

interface ContentFormProps {
  contentType: string;
  setContentType: (type: string) => void;
  link: string;
  setLink: (link: string) => void;
  description: string;
  setDescription: (description: string) => void;
  tone: string;
  setTone: (tone: string) => void;
  isAnalyzing: boolean;
  handleAnalyzeReference: () => void;
  analysisData: {
    toneScore: number;
    contentType: string;
    primaryEmotions: string[];
    dominantColors?: string[];
    topicKeywords: string[];
    engagementLevel?: string;
  } | null;
  isGenerating: boolean;
  handleGenerate: () => void;
}

const ContentForm: React.FC<ContentFormProps> = ({
  contentType,
  setContentType,
  link,
  setLink,
  description,
  setDescription,
  tone,
  setTone,
  isAnalyzing,
  handleAnalyzeReference,
  analysisData,
  isGenerating,
  handleGenerate
}) => {
  const tones: ToneOption[] = [
    { id: 'professional', label: 'Professional & Authoritative', description: 'Polished, expert-oriented content for business coaches and consultants' },
    { id: 'inspiring', label: 'Inspiring & Motivational', description: 'Uplifting, encouraging content to inspire action and positive change' },
    { id: 'playful', label: 'Playful & Casual', description: 'Fun, relaxed content with personality and conversational style' },
  ];

  return (
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
  );
};

export default ContentForm;
