'use client';

// React-specific imports
import React from 'react';

// External libraries
import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'fullscreen' | 'intensity';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  $isActive?: boolean;
  children: React.ReactNode;
}

interface StyledButtonProps {
  $variant: ButtonVariant;
  $isActive?: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  font-family: inherit;
  cursor: pointer;
  transition: all ${({ theme }) => theme.anim.durations.short};
  display: flex;
  align-items: center;

  ${({ $variant, $isActive, theme }) => {
    switch ($variant) {
      case 'primary':
        return css`
          background: ${theme.colors.btnBg};
          border: ${theme.borders.btnLarge} solid ${theme.colors.windowBorder};
          box-shadow:
            inset -4px -4px 0px ${theme.colors.btnShadow},
            ${theme.shadows.btnLarge};
          padding: 1rem 2.5rem;
          font-size: 1.7rem;
          gap: ${theme.spacing.lg};
          color: ${theme.colors.windowBorder};

          &:hover {
            background: ${theme.colors.btnHoverBg};
          }

          &:active {
            box-shadow: inset 4px 4px 0px ${theme.colors.btnShadow};
            transform: translate(2px, 2px);
          }
        `;
      case 'fullscreen':
        return css`
          background: ${theme.colors.fullscreenBtnBg};
          border: ${theme.borders.btn} solid ${theme.colors.windowBorder};
          box-shadow:
            inset -3px -3px 0px ${theme.colors.fullscreenBtnShadow},
            ${theme.shadows.btn};
          padding: 0.25rem 0.6rem;
          font-size: 0.9rem;
          color: ${theme.colors.windowBorder};
          font-weight: 700;
          letter-spacing: 0.04em;

          &:hover {
            background: ${theme.colors.fullscreenBtnHoverBg};
            box-shadow:
              inset -3px -3px 0px ${theme.colors.fullscreenBtnShadowHover},
              ${theme.shadows.btn};
          }

          &:active {
            box-shadow: inset 3px 3px 0px ${theme.colors.fullscreenBtnShadow};
            transform: translate(1px, 1px);
          }
        `;
      case 'intensity':
        return css`
          background: ${$isActive ? theme.colors.intensityActiveBg : theme.colors.btnHoverBg};
          border: ${theme.borders.btn} solid ${theme.colors.windowBorder};
          padding: 6px 16px;
          font-size: 1.1rem;
          box-shadow: ${$isActive
            ? `inset 2px 2px 0px ${theme.colors.intensityActiveShadow}`
            : `inset -2px -2px 0px ${theme.colors.fullscreenBtnShadow}, ${theme.shadows.btn}`};
          color: ${$isActive ? theme.colors.intensityActiveText : 'inherit'};

          &:hover {
            background: ${$isActive ? '#bbb' : '#d5d5d5'};
          }
        `;
    }
  }}
`;

export function Button({ variant = 'primary', $isActive, children, ...props }: ButtonProps) {
  return (
    <StyledButton $variant={variant} $isActive={$isActive} {...props}>
      {children}
    </StyledButton>
  );
}
