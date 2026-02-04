import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface MedicalDetailsProps {
  onConditionChange?: (condition: string) => void;
  onDescriptionChange?: (description: string) => void;
  condition?: string;
  description?: string;
}

export const MedicalDetails: React.FC<MedicalDetailsProps> = ({
  onConditionChange,
  onDescriptionChange,
  condition = '',
  description = '',
}) => {
  const { t } = useLanguage();

  return (
    <Card className="dark:bg-slate-800 dark:border-gray-600">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white">{t('medical.details')}</CardTitle>
        <CardDescription>{t('medical.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
            {t('medical.condition')}
          </label>
          <Input
            placeholder="Ex: Diabète de type 2, Hypertension..."
            value={condition}
            onChange={(e) => onConditionChange?.(e.target.value)}
            className="dark:bg-slate-700 dark:text-white dark:border-gray-600"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
            {t('medical.description')}
          </label>
          <Textarea
            placeholder="Décrivez votre état de santé de façon précise, les symptômes, les antécédents médicaux..."
            value={description}
            onChange={(e) => onDescriptionChange?.(e.target.value)}
            rows={5}
            className="dark:bg-slate-700 dark:text-white dark:border-gray-600"
          />
        </div>
      </CardContent>
    </Card>
  );
};
