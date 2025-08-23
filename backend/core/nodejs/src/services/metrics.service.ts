import { collection } from '../db/mongo';
import { Enrollment } from '../types/enrollment';

const enrollments = () => collection<Enrollment>('enrollments');

export async function getCenters() {
  return enrollments().aggregate([
    { $group: { _id: { id: '$center.id', name: '$center.name' }, enrolled_count: { $sum: 1 } } },
    { $project: { _id: 0, center_id: '$_id.id', center_name: '$_id.name', enrolled_count: 1 } },
    { $sort: { enrolled_count: -1 } }
  ]).toArray();
}

export async function getInstructorsByCenter(centerId: string) {
  return (await enrollments().aggregate([
    { $match: { 'center.id': centerId } },
    { $unwind: '$recommends_instructor_names' },
    { $project: { name: { $toLower: { $trim: { input: '$recommends_instructor_names' } } } } },
    { $group: { _id: '$name', mentions: { $sum: 1 } } },
    { $project: { _id: 0, name: '$_id', mentions: 1 } },
    { $sort: { mentions: -1 } }
  ]).toArray());
}

export async function getCentersPrograms(programCodes: string[]) {
  const matchStage = programCodes.length ? { 'program.code': { $in: programCodes } } : {};
  return enrollments().aggregate([
    { $match: matchStage },
    { $group: {
        _id: { id: '$center.id', name: '$center.name', pcode: '$program.code', pname: '$program.name' },
        enrolled_count: { $sum: 1 }
    }},
    { $project: {
        _id: 0,
        center_id: '$_id.id',
        center_name: '$_id.name',
        program_code: '$_id.pcode',
        program_name: '$_id.pname',
        enrolled_count: 1
    }},
    { $sort: { center_name: 1, program_code: 1 } }
  ]).toArray();
}

export async function getByDepartment() {
  return enrollments().aggregate([
    { $match: { department_residence: { $exists: true, $ne: null, $type: 'string' } } },
    { $project: { dep: { $trim: { input: '$department_residence' } } } },
    { $group: { _id: '$dep', enrolled_count: { $sum: 1 } } },
    { $project: { _id: 0, department: '$_id', enrolled_count: 1 } },
    { $sort: { enrolled_count: -1 } }
  ]).toArray();
}

export async function getGithubCount() {
  const total_with_github = await enrollments().countDocuments({ has_github: true });
  return { total_with_github };
}

export async function getEnglishLevels(levels: string[]) {
  return enrollments().aggregate([
    { $match: { english_level: { $in: levels } } },
    { $group: {
        _id: { id: '$center.id', name: '$center.name', lvl: '$english_level' },
        n: { $sum: 1 }
    }},
    { $group: {
        _id: { id: '$_id.id', name: '$_id.name' },
        counts: { $push: { k: '$_id.lvl', v: '$n' } }
    }},
    { $project: {
        _id: 0,
        center_id: '$_id.id',
        center_name: '$_id.name',
        counts: { $arrayToObject: '$counts' }
    }},
    { $addFields: {
        B1: { $ifNull: ['$counts.B1', 0] },
        B2: { $ifNull: ['$counts.B2', 0] }
    }},
    { $project: { counts: 0 } },
    { $sort: { center_name: 1 } }
  ]).toArray();
}