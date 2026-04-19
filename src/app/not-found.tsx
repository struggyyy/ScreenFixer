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
import { useRouter } from 'next/navigation';

// Internal imports
import { AnimatedWindow, WindowContent } from '@/components/common/AnimatedWindow';
import { WindowTitleBar } from '@/components/features/WindowTitleBar';
import { Button } from '@/components/common/Button';

const StyledNotFoundTitle = styled.h1`
  text-align: center;

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const StyledNotFoundDescription = styled.p`
  font-size: 1.2rem;
  margin: 1rem 0;
  color: #666;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

export default function NotFound() {
  const router = useRouter();
  const goHome = () => router.push('/');

  return (
    <main
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}
    >
      <AnimatedWindow
        isHidden={false}
        isMinimized={false}
        isMaximized={false}
        isTrashed={false}
        isRestoring={false}
      >
        <WindowTitleBar title="Error_404.exe" isMaximized={false} onClose={goHome} />
        <WindowContent>
          <StyledNotFoundTitle>System Error</StyledNotFoundTitle>
          <StyledNotFoundDescription>
            The requested module or resource could not be found. The file system may be corrupted or
            the path is invalid.
          </StyledNotFoundDescription>
          <Button variant="primary" onClick={goHome}>
            Return to Desktop
          </Button>
        </WindowContent>
      </AnimatedWindow>
    </main>
  );
}
