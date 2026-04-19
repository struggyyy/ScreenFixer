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
import React, { useEffect } from 'react';

// External libraries
import styled from 'styled-components';

// Internal imports
import { AnimatedWindow, WindowContent } from '@/components/common/AnimatedWindow';
import { WindowTitleBar } from '@/components/features/WindowTitleBar';
import { Button } from '@/components/common/Button';

const StyledErrorTitle = styled.h1`
  color: #ff4b4b;
  text-align: center;
  word-break: break-word;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const StyledErrorDescription = styled.p`
  font-size: 1.2rem;
  margin: 1rem 0;
  color: #666;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

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
        <WindowTitleBar title="Fatal_Error.sys" isMaximized={false} onClose={() => reset()} />
        <WindowContent>
          <StyledErrorTitle>CRITICAL_PROCESS_DIED</StyledErrorTitle>
          <StyledErrorDescription>
            A fatal exception has occurred at 0x0028:C0011E36. The current application will be
            terminated.
          </StyledErrorDescription>
          <div
            style={{
              background: '#eee',
              padding: '1rem',
              marginBottom: '1.5rem',
              fontSize: '0.8rem',
              textAlign: 'left',
              width: '100%',
              overflowX: 'auto',
            }}
          >
            <code>{error.message || 'Unknown system error'}</code>
          </div>
          <Button variant="primary" onClick={() => reset()}>
            Restart Application
          </Button>
        </WindowContent>
      </AnimatedWindow>
    </main>
  );
}
