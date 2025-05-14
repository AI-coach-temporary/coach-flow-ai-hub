
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ContentAnalysisProps {
  analysisData: {
    toneScore: number;
    contentType: string;
    primaryEmotions: string[];
    dominantColors?: string[];
    topicKeywords: string[];
    engagementLevel?: string;
  } | null;
  isLoading: boolean;
}

const ContentAnalysis: React.FC<ContentAnalysisProps> = ({ 
  analysisData,
  isLoading 
}) => {
  if (isLoading) {
    return (
      <div className="h-24 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-t-brand-primary rounded-full animate-spin"></div>
        <p className="mt-4 text-sm text-gray-600">Analyzing content...</p>
      </div>
    );
  }

  if (!analysisData) {
    return null;
  }

  const { toneScore, contentType, primaryEmotions, dominantColors, topicKeywords, engagementLevel } = analysisData;

  return (
    <Card className="p-4 mb-4 bg-gray-50/50">
      <h3 className="font-medium text-sm mb-2">Content Analysis</h3>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="text-xs text-gray-500">Content Type</p>
          <p className="text-sm">{contentType}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Tone</p>
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-1.5 mr-2">
              <div 
                className={`h-1.5 rounded-full ${toneScore > 0.7 ? 'bg-green-500' : toneScore > 0.4 ? 'bg-yellow-500' : 'bg-red-500'}`}
                style={{ width: `${toneScore * 100}%` }}
              ></div>
            </div>
            <span className="text-xs">{Math.round(toneScore * 100)}%</span>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <p className="text-xs text-gray-500 mb-1">Primary Emotions</p>
        <div className="flex flex-wrap gap-1">
          {primaryEmotions.map((emotion) => (
            <Badge key={emotion} variant="outline" className="text-xs bg-white">{emotion}</Badge>
          ))}
        </div>
      </div>

      {dominantColors && (
        <div className="mt-3">
          <p className="text-xs text-gray-500 mb-1">Visual Palette</p>
          <div className="flex gap-1">
            {dominantColors.map((color) => (
              <div 
                key={color}
                className="w-6 h-6 rounded-full border border-gray-200" 
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mt-3">
        <p className="text-xs text-gray-500 mb-1">Topic Keywords</p>
        <div className="flex flex-wrap gap-1">
          {topicKeywords.map((keyword) => (
            <Badge key={keyword} variant="secondary" className="text-xs">{keyword}</Badge>
          ))}
        </div>
      </div>

      {engagementLevel && (
        <div className="mt-3">
          <p className="text-xs text-gray-500">Estimated Engagement</p>
          <p className="text-sm font-medium">{engagementLevel}</p>
        </div>
      )}
    </Card>
  );
};

export default ContentAnalysis;
