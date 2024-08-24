import { StyledContainer } from '_comp/LanguageDropdown/styled';
import i18n from 'i18next';
import { useState } from 'react';

function LanguageDropdown() {
  return (
    <StyledContainer>
      {/*<select>*/}
      {/*  <option*/}
      {/*    value="ru"*/}
      {/*    selected={i18n.language === 'ru'}*/}
      {/*    onClick={() => {*/}
      {/*      if (target.selected) return;*/}
      {/*      i18n.changeLanguage('ru');*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    Русский*/}
      {/*  </option>*/}
      {/*  <option*/}
      {/*    value="en"*/}
      {/*    selected={i18n.language === 'en'}*/}
      {/*    onClick={({ target }) => {*/}
      {/*      if (target.selected) return;*/}
      {/*      i18n.changeLanguage('en');*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    English*/}
      {/*  </option>*/}
      {/*</select>*/}
    </StyledContainer>
  );
}

export default LanguageDropdown;
