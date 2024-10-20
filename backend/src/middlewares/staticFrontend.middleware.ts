import { Request, Response, NextFunction } from 'express';
import { join as joinPath } from 'path';
import { existsSync, statSync } from 'node:fs';
import { envConfig } from '../env.conig';

const languages = [ "en", "de" ] as const;
type Language = typeof languages[number];

export function staticFrontend(req: Request, res: Response, next: NextFunction) {
  if (req.path.startsWith("/api")) {
    next();
    return;
  }

  res.sendFile(parseAngularPath(req), (err) => {
    console.error(err);
    next();
  });
}

/** returns index.html if given filePath doesNot exist, as the request should be by an Angular's SPA route */
function parseAngularPath(req: Request): string {
  const path = getI18nPath(req);
  const staticFilePath = joinPath(envConfig.PATH_TO_FRONTEND, path);
  if (existsSync(staticFilePath) && statSync(staticFilePath).isFile())
    return staticFilePath;

  const lang = getLanguage(req);
  return joinPath(envConfig.PATH_TO_FRONTEND, `${lang}/index.html`);
}

function getI18nPath(req: Request): string {
  const languageFromUrl = getLanguageFromUrl(req)
  if (languageFromUrl)
    return req.path;

  return `/${getLanguageFromHeader(req)}/${req.path}`;
}

function getLanguage(req: Request): Language {
  return getLanguageFromUrl(req) || getLanguageFromHeader(req);
}

function getLanguageFromHeader(req: Request): Language {
  const acceptedLanguages = req.acceptsLanguages();
  const languageFromHeader = languages.filter(l => acceptedLanguages.includes(l))[0];
  if (languageFromHeader)
    return languageFromHeader;

  return languages[0];
}

function getLanguageFromUrl(req: Request): Language | undefined {
  return languages.filter(l => req.path.startsWith("/" + l))[0];
}
