import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
import User from './user.model'
import Role from './role.model'
import Employee from './employee.model'



export default { User, Role, Employee }
