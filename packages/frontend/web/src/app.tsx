import '@affine/component/theme/global.css';
import '@affine/component/theme/theme.css';

import { AffineContext } from '@affine/component/context';
import { GlobalLoading } from '@affine/component/global-loading';
import { AppFallback } from '@affine/core/components/affine/app-container';
import { configureCommonModules } from '@affine/core/modules';
import { configureLocalStorageStateStorageImpls } from '@affine/core/modules/storage';
import { CustomThemeModifier } from '@affine/core/modules/theme-editor';
import { configureBrowserWorkbenchModule } from '@affine/core/modules/workbench';
import {
  configureBrowserWorkspaceFlavours,
  configureIndexedDBWorkspaceEngineStorageProvider,
} from '@affine/core/modules/workspace-engine';
import { router } from '@affine/core/router';
import {
  performanceLogger,
  performanceRenderLogger,
} from '@affine/core/shared';
import { Telemetry } from '@affine/core/telemetry';
import createEmotionCache from '@affine/core/utils/create-emotion-cache';
import { createI18n, setUpLanguage } from '@affine/i18n';
import { CacheProvider } from '@emotion/react';
import {
  Framework,
  FrameworkRoot,
  getCurrentStore,
  LifecycleService,
} from '@toeverything/infra';
import type { PropsWithChildren, ReactElement } from 'react';
import { lazy, Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

if (environment.isElectron && environment.isDebug) {
  document.body.innerHTML = `<h1 style="color:red;font-size:5rem;text-align:center;">Don't run web entry in electron.</h1>`;
  throw new Error('Wrong distribution');
}

const performanceI18nLogger = performanceLogger.namespace('i18n');
const cache = createEmotionCache();

const DevTools = lazy(() =>
  import('jotai-devtools').then(m => ({ default: m.DevTools }))
);

const DebugProvider = ({ children }: PropsWithChildren): ReactElement => {
  return (
    <>
      <Suspense>{process.env.DEBUG_JOTAI === 'true' && <DevTools />}</Suspense>
      {children}
    </>
  );
};

const future = {
  v7_startTransition: true,
} as const;

async function loadLanguage() {
  performanceI18nLogger.info('start');

  const i18n = createI18n();
  document.documentElement.lang = i18n.language;

  performanceI18nLogger.info('set up');
  await setUpLanguage(i18n);
  performanceI18nLogger.info('done');
}

let languageLoadingPromise: Promise<void> | null = null;

const framework = new Framework();
configureCommonModules(framework);
configureBrowserWorkbenchModule(framework);
configureLocalStorageStateStorageImpls(framework);
configureBrowserWorkspaceFlavours(framework);
configureIndexedDBWorkspaceEngineStorageProvider(framework);
const frameworkProvider = framework.provider();

// setup application lifecycle events, and emit application start event
window.addEventListener('focus', () => {
  frameworkProvider.get(LifecycleService).applicationFocus();
});
frameworkProvider.get(LifecycleService).applicationStart();

export function App() {
  performanceRenderLogger.debug('App');

  if (!languageLoadingPromise) {
    languageLoadingPromise = loadLanguage().catch(console.error);
  }

  return (
    <Suspense>
      <FrameworkRoot framework={frameworkProvider}>
        <CacheProvider value={cache}>
          <AffineContext store={getCurrentStore()}>
            <Telemetry />
            <CustomThemeModifier />
            <DebugProvider>
              <GlobalLoading />
              <RouterProvider
                fallbackElement={<AppFallback key="RouterFallback" />}
                router={router}
                future={future}
              />
            </DebugProvider>
          </AffineContext>
        </CacheProvider>
      </FrameworkRoot>
    </Suspense>
  );
}
