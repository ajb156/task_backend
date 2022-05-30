import { mongoose } from 'mongoose';
import bcrypt from 'bcrypt';

const usuarioSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      require: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    token: {
      type: String,
    },
    confirmado: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Encriptamos el password, antes de guardarlo en la BD
usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Ocultamos los campos que no utilizaremos en las respuestas
usuarioSchema.method('toJSON', function () {
  const { __v, password, confirmado, token, createdAt, updatedAt, ...object } =
    this.toObject();
  return object;
});

// Comprobar password
usuarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.password);
};

const Usuario = mongoose.model('Usuario', usuarioSchema);
export default Usuario;
