
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Instagram } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { toast } from 'sonner';

interface ContentResultProps {
  generatedContent: {
    caption: string;
    hashtags: string[];
    image?: string;
    reelScript?: string[];
    ideas?: string[];
  } | null;
  isLoading: boolean;
}

const ContentResult: React.FC<ContentResultProps> = ({ 
  generatedContent, 
  isLoading 
}) => {
  if (isLoading) {
    return (
      <div className="h-64 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-t-brand-primary rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Crafting your content...</p>
      </div>
    );
  }

  if (!generatedContent) {
    return (
      <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-md">
        <p className="text-gray-500">
          Content will appear here after generation
        </p>
      </div>
    );
  }

  const { caption, hashtags, image, reelScript, ideas } = generatedContent;

  const handleCopyCaption = () => {
    const fullCaption = `${caption}\n\n${hashtags.join(' ')}`;
    navigator.clipboard.writeText(fullCaption);
    toast.success('Caption copied to clipboard!');
  };

  const handleCopyReelScript = () => {
    if (reelScript) {
      const script = reelScript.join('\n\n');
      navigator.clipboard.writeText(script);
      toast.success('Reel script copied to clipboard!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Generated Image */}
      {image && (
        <div>
          <h3 className="font-medium mb-2">Generated Visual:</h3>
          <div className="mb-2 border border-gray-200 rounded-md overflow-hidden bg-gray-50">
            <AspectRatio ratio={4/5} className="bg-gray-100">
              <img 
                src={image} 
                alt="AI generated content visual" 
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs"
            onClick={() => {
              // In a real implementation, would create a download link
              toast.success('Image saved to your content library');
            }}
          >
            Save Image
          </Button>
        </div>
      )}
      
      {/* Caption */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Generated Caption:</h3>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 text-xs" 
            onClick={handleCopyCaption}
          >
            <Copy size={14} />
            <span>Copy</span>
          </Button>
        </div>
        <div className="p-4 bg-gray-50 rounded-md mb-2">
          <p className="whitespace-pre-line mb-3">{caption}</p>
          <div className="flex flex-wrap gap-1">
            {hashtags.map((hashtag, index) => (
              <span key={index} className="text-brand-primary text-sm">
                {hashtag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Reel Script */}
      {reelScript && reelScript.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Reel Script:</h3>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1 text-xs"
              onClick={handleCopyReelScript}
            >
              <Copy size={14} />
              <span>Copy</span>
            </Button>
          </div>
          <div className="space-y-2">
            {reelScript.map((step, index) => (
              <div key={index} className="p-3 bg-brand-light rounded-md">
                <span className="font-medium">Scene {index + 1}: </span>
                {step}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Content Ideas */}
      {ideas && ideas.length > 0 && (
        <div>
          <h3 className="font-medium mb-2">Additional Content Ideas:</h3>
          <ul className="space-y-2">
            {ideas.map((idea, index) => (
              <li key={index} className="p-3 bg-gray-50 rounded-md">
                {idea}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <Button 
        className="w-full flex items-center gap-2" 
        variant="outline"
        onClick={() => toast.success('Content saved to your library!')}
      >
        <Instagram size={18} />
        <span>Save to Content Library</span>
      </Button>
    </div>
  );
};

export default ContentResult;
