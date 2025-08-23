import { Request, Response, NextFunction } from 'express';
import * as svc from '../services/metrics.service';
import { parseCSVParam, parseLevels } from '../utils/parse';

const setCache = (res: Response) => {
  res.set('Cache-Control', 'public, max-age=60');
};

export async function centers(_req: Request, res: Response, next: NextFunction) {
  try { setCache(res); res.json(await svc.getCenters()); } catch (e) { next(e); }
}

export async function instructorsByCenter(req: Request, res: Response, next: NextFunction) {
  try {
    const { centerId } = req.params;
    if (!centerId) { const err: any = new Error('centerId requerido'); err.status = 400; throw err; }
    setCache(res); res.json(await svc.getInstructorsByCenter(centerId));
  } catch (e) { next(e); }
}

export async function centersPrograms(req: Request, res: Response, next: NextFunction) {
  try {
    const codes = parseCSVParam(req.query.programCodes, 4, 'programCodes');
    setCache(res); res.json(await svc.getCentersPrograms(codes));
  } catch (e) { next(e); }
}

export async function byDepartment(_req: Request, res: Response, next: NextFunction) {
  try { setCache(res); res.json(await svc.getByDepartment()); } catch (e) { next(e); }
}

export async function githubCount(_req: Request, res: Response, next: NextFunction) {
  try { setCache(res); res.json(await svc.getGithubCount()); } catch (e) { next(e); }
}

export async function englishLevels(req: Request, res: Response, next: NextFunction) {
  try {
    const levels = parseLevels(req.query.levels);
    setCache(res); res.json(await svc.getEnglishLevels(levels));
  } catch (e) { next(e); }
}