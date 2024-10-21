import { Request, Response, NextFunction } from 'express';
import path from 'node:path';
import { existsSync, statSync } from 'node:fs';
import { envConfig } from '../env.config';

const languages = [ "en", "de" ] as const;
type Language = typeof languages[number];

export function staticFrontend(req: Request, res: Response, next: NextFunction) {
  if (req.path.startsWith("/api")) {
    next();
    return;
  }

  res.sendFile(parseAngularPath(req), (err) => {
    console.error("Couldn't serve response:", err);
    next();
  });
}

/** returns index.html if given filePath doesNot exist, as the request should be by an Angular's SPA route */
function parseAngularPath(req: Request): string {
  const i18nPath = getI18nPath(req);
  const staticFilePath = path.join(envConfig.PATH_TO_FRONTEND, i18nPath);
  if (existsSync(staticFilePath) && statSync(staticFilePath).isFile())
    return staticFilePath;

  const lang = getLanguage(req);
  return path.join(envConfig.PATH_TO_FRONTEND, lang, "index.html");
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
  const languageFromHeader = languages.find(l => acceptedLanguages.includes(l));
  if (languageFromHeader)
    return languageFromHeader;

  return languages[0];
}

function getLanguageFromUrl(req: Request): Language | undefined {
  return languages.find(l => req.path.startsWith("/" + l));
}
