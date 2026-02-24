type EnvironmentFlag = 'development' | 'preview' | 'stage' | 'production' | 'demo';

export const getEnvironmentFlag = (): EnvironmentFlag | undefined => {
  const env = process.env.NEXT_PUBLIC_APP_ENV;
  switch (env) {
    case 'development': return 'development';
    case 'preview': return 'preview';
    case 'stage': return 'stage';
    case 'production': return 'production';
    case 'demo': return 'demo';
    default:
      console.warn(`Missing or invalid environment flag ${env}`);
      return undefined;
  }
};

export const isDemo = () => {
  return getEnvironmentFlag() === 'demo';
};

export const isDev = () => {
  return getEnvironmentFlag() === 'development';
};

export const isPreview = () => {
  return getEnvironmentFlag() === 'preview';
};

export const isStage = () => {
  return getEnvironmentFlag() === 'stage';
};

export const isProduction = () => {
  return getEnvironmentFlag() === 'production';
};

export const isEnvironment = (env: EnvironmentFlag) => {
  return getEnvironmentFlag() === env;
};
