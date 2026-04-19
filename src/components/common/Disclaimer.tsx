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

'use client';

// React-specific imports
import React from 'react';

// External libraries
import styled from 'styled-components';

const StyledDisclaimer = styled.div`
  font-size: 0.85rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.disclaimerText};
  border: ${({ theme }) => theme.borders.btn} solid ${({ theme }) => theme.colors.windowBorder};
  background: ${({ theme }) => theme.colors.disclaimerBg};
  padding: ${({ theme }) => theme.spacing.lg};
  line-height: 1.5;
  box-shadow: ${({ theme }) => theme.shadows.btnLarge};
`;

export function Disclaimer({ children }: { children: React.ReactNode }) {
  return <StyledDisclaimer>{children}</StyledDisclaimer>;
}
