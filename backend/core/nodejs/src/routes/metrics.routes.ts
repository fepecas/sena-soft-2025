import { Router } from 'express';
import * as ctrl from '../controllers/metrics.controller';

const r = Router();

r.get('/centers', ctrl.centers);
r.get('/centers/:centerId/instructors', ctrl.instructorsByCenter);
r.get('/centers-programs', ctrl.centersPrograms);
r.get('/departments', ctrl.byDepartment);
r.get('/github', ctrl.githubCount);
r.get('/english', ctrl.englishLevels);

export default r;