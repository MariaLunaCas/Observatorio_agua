/**
 * Script para crear el primer administrador en la base de datos
 * 
 * Uso:
 * npx ts-node scripts/create-first-admin.ts
 * 
 * Luego ingresa:
 * - Email: ruizzfelipe5@gmail.com
 * - Contraseña: (proporciona una contraseña segura)
 */

import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as readline from 'readline';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/observatorio_agua';

interface User {
  name: string;
  email: string;
  username: string;
  password: string;
  role: string;
  requestedRole: string;
  status: string;
  approvedBy: string;
  approvedAt: Date;
  createdAt: Date;
}

const userSchema = new mongoose.Schema<User>({
  name: String,
  username: { type: String, unique: true, sparse: true },
  email: { type: String, unique: true },
  password: String,
  role: String,
  requestedRole: String,
  status: { type: String, default: 'active' },
  approvedBy: String,
  approvedAt: Date,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  try {
    console.log('📌 Conectando a MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB\n');

    // Verificar si ya existe un admin
    const adminCount = await User.countDocuments({ role: 'admin' });
    if (adminCount > 0) {
      console.log('⚠️  Ya existe al menos un administrador en la base de datos.');
      console.log(`📊 Admins actuales: ${adminCount}`);
      console.log(
        '\nPara crear más admins, usa el endpoint: POST /api/users/admin/promote-first',
      );
      rl.close();
      process.exit(0);
    }

    console.log('🔐 Creando el primer administrador...\n');

    const email = await prompt('📧 Email del admin: ');
    const password = await prompt('🔑 Contraseña: ');

    if (!email || !password) {
      console.log('\n❌ Email y contraseña son requeridos');
      rl.close();
      process.exit(1);
    }

    console.log('\n⏳ Creando usuario...');

    const hash = await bcrypt.hash(password, 10);
    const normalizedEmail = email.trim().toLowerCase();

    const newAdmin = new User({
      name: 'Admin Validator',
      email: normalizedEmail,
      username: normalizedEmail.split('@')[0],
      password: hash,
      role: 'admin',
      requestedRole: 'admin',
      status: 'active',
      approvedBy: 'system',
      approvedAt: new Date(),
    });

    await newAdmin.save();

    console.log('\n✅ Administrador creado exitosamente!\n');
    console.log('📋 Detalles:');
    console.log(`   Email: ${normalizedEmail}`);
    console.log(`   Rol: admin`);
    console.log(`   Estado: active`);
    console.log(
      '\n💡 Tip: Usa este email para loguear y aprobar solicitudes de otros admins',
    );

    rl.close();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error);
    rl.close();
    process.exit(1);
  }
}

main();
