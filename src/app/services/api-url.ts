import { isPlatformServer } from '@angular/common';
import { appEnv } from '../../env';

export function resolveApiUrl(platformId: object): string {
  if (isPlatformServer(platformId)) {
    const env = (globalThis as any).process?.env?.['API_INTERNAL_URL'];
    return env || 'http://lineart-api';
  }
  return appEnv.apiUrl;
}
