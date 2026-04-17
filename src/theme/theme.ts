/** *************************************************************************
 *                                                                         *
 *                       Copyright (c) 2026, @struggyyy                    *
 *                                                                         *
 *                          Project: ScreenFixer                           *
 *                                                                         *
 *                           All Rights Reserved                           *
 *                                                                         *
 *        This is unpublished proprietary source code of @struggyyy.       *
 *         The copyright notice above does not evidence any actual         *
 *               or intended publication of such source code.              *
 *                                                                         *
 ************************************************************************** */

// Design system tokens and centralized theme configuration.
export const theme = {
  // Core color palette
  colors: {
    bgDesktop: '#3459e5',
    windowBg: '#fdfdfd',
    windowBorder: '#000000',
    titleBarBg: '#001389',
    titleBarText: '#ffffff',
    btnBg: '#ffffff',
    btnHoverBg: '#eeeeee',
    btnActiveBg: '#e0e0e0',
    btnBorder: '#000000',
    btnShadow: '#cccccc',
    fullscreenBtnBg: '#dddddd',
    fullscreenBtnHoverBg: '#c8c8c8',
    fullscreenBtnShadow: '#aaaaaa',
    fullscreenBtnShadowHover: '#999999',
    fullscreenText: '#555555',
    intensityActiveBg: '#aaaaaa',
    intensityActiveShadow: '#888888',
    intensityActiveText: '#ffffff',
    closeBtnBg: '#ff0000',
    closeBtnHoverBg: '#cc0000',
    disclaimerBg: '#fffbe6',
    disclaimerText: '#444444',
    disclaimerBorder: '#000000',
    binLabelBg: 'rgba(0, 0, 0, 0.3)',
    binLabelText: '#ffffff',
  },
  // Component borders
  borders: {
    window: '4px',
    btn: '3px',
    btnLarge: '4px',
  },
  // Layout spacing
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '10px',
    lg: '12px',
    xl: '16px',
    xxl: '20px',
  },
  // Box shadows
  shadows: {
    window: '8px 8px 0px rgba(0, 0, 0, 0.3)',
    btn: '2px 2px 0px rgba(0, 0, 0, 0.1)',
    btnLarge: '4px 4px 0px rgba(0, 0, 0, 0.1)',
  },
  // Animation timings and curves
  anim: {
    durations: {
      short: '0.1s',
      md: '0.2s',
      long: '0.4s',
      slow: '0.5s',
      window: '0.6s',
      crumble: '1.2s',
    },
    easings: {
      standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.18, 0.89, 0.32, 1.28)',
    },
  },
};

export type AppTheme = typeof theme;
