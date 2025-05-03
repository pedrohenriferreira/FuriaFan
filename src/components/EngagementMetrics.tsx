
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { EngagementMetric } from '@/types';

interface EngagementMetricsProps {
  metrics: EngagementMetric[];
}

const EngagementMetrics: React.FC<EngagementMetricsProps> = ({ metrics }) => {
  // Group metrics by type
  const groupedMetrics: Record<string, EngagementMetric[]> = {};
  
  metrics.forEach(metric => {
    if (!groupedMetrics[metric.type]) {
      groupedMetrics[metric.type] = [];
    }
    groupedMetrics[metric.type].push(metric);
  });

  // Calculate totals for each category
  const categoryTotals: Record<string, number> = {};
  
  Object.keys(groupedMetrics).forEach(type => {
    categoryTotals[type] = groupedMetrics[type].reduce(
      (sum, metric) => sum + metric.value, 0
    );
  });

  // Max value for progress bars
  const maxTotal = Math.max(...Object.values(categoryTotals), 10);

  // Display names for metric types
  const typeDisplayNames: Record<string, string> = {
    event: 'Eventos',
    content: 'Conteúdo',
    purchase: 'Compras',
    social: 'Social'
  };

  return (
    <div className="bg-furia-black min-h-screen py-6">
      <div className="container mx-auto">
        <Card className="bg-furia-gray border-furia-gold/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-furia-white">Engajamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.keys(groupedMetrics).map(type => (
                <div key={type} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-furia-white font-medium">
                      {typeDisplayNames[type] || type}
                    </h4>
                    <span className="text-sm text-furia-gold">
                      {categoryTotals[type]}
                    </span>
                  </div>
                  <Progress 
                    value={(categoryTotals[type] / maxTotal) * 100} 
                    className="h-2 bg-furia-darkgray"
                  />
                  <div className="space-y-1 mt-1">
                    {groupedMetrics[type].map((metric, idx) => (
                      <div 
                        key={idx} 
                        className="text-xs flex justify-between bg-furia-darkgray p-2 rounded-sm"
                      >
                        <div>
                          <span className="text-furia-white">{metric.name}</span>
                          <span className="text-gray-400 ml-2 text-[10px]">
                            {new Date(metric.date).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <span className="text-gray-300">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EngagementMetrics;
