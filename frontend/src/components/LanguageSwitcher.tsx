import React from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const handleChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Select
      value={i18n.language}
      onChange={handleChange}
      size="small"
      sx={{
        ml: 2,
        color: 'white',
        backgroundColor: 'warning.main',
        textShadow: '1px 1px 2px black',
      }}
    >
      <MenuItem value="en">English</MenuItem>
      <MenuItem value="es">Español</MenuItem>
      <MenuItem value="pt">Português</MenuItem>
      <MenuItem value="de">Deutsch</MenuItem>
      <MenuItem value="fr">Français</MenuItem>
      <MenuItem value="hi">हिन्दी</MenuItem>
      {/* HINDI */}
      <MenuItem value="ru">Русский</MenuItem>
      {/* RUSSIAN */}
      <MenuItem value="ar">العربية</MenuItem>
      {/* ARABIC */}
      <MenuItem value="ch">中文 (简体)</MenuItem> {/* CHINESE SIMPLIFIED */}
      <MenuItem value="jp">日本語</MenuItem>
      {/* JAPANESE */}
    </Select>
  );
};

export default LanguageSwitcher;
