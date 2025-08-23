// Ejecutar con: mongosh senasoft ./indexes.js

db.enrollments.createIndex({ 'center.id': 1 });

db.enrollments.createIndex({ 'center.id': 1, 'program.code': 1 });

db.enrollments.createIndex({ department_residence: 1 });

db.enrollments.createIndex({ has_github: 1 });

db.enrollments.createIndex({ english_level: 1, 'center.id': 1 });